param(
    [Parameter(Mandatory = $true)]
    [string]$PdfPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputDirectory
)

$ErrorActionPreference = "Stop"

$pdf = (Resolve-Path -LiteralPath $PdfPath).Path
$output = [System.IO.Path]::GetFullPath($OutputDirectory)
$raw = Join-Path $output "brutas"
$final = Join-Path $output "imagens"
$inventory = Join-Path $output "inventario-pdfimages.txt"
$manifest = Join-Path $output "manifesto.csv"

New-Item -ItemType Directory -Force -Path $output, $raw, $final | Out-Null

$env:Path = [Environment]::GetEnvironmentVariable("Path", "User") + ";" +
    [Environment]::GetEnvironmentVariable("Path", "Machine")

foreach ($command in @("pdfimages", "magick")) {
    if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
        throw "Comando obrigatorio nao encontrado: $command"
    }
}

Write-Host "Inventariando objetos do PDF..."
& pdfimages -list $pdf | Set-Content -Encoding utf8 $inventory
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao inventariar o PDF."
}

$rows = foreach ($line in Get-Content -LiteralPath $inventory | Select-Object -Skip 2) {
    if ($line -match "^\s*(\d+)\s+(\d+)\s+(image|smask)\s+(\d+)\s+(\d+)\s+\S+\s+\d+\s+\d+\s+\S+\s+\S+\s+(\d+)\s+(\d+)") {
        [pscustomobject]@{
            Page = [int]$matches[1]
            Num = [int]$matches[2]
            Type = $matches[3]
            Width = [int]$matches[4]
            Height = [int]$matches[5]
            ObjectId = "$($matches[6]) $($matches[7])"
        }
    }
}

Write-Host "Extraindo $(@($rows | Where-Object Type -eq 'image').Count) imagens..."
& pdfimages -png $pdf (Join-Path $raw "obj")
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao extrair as imagens do PDF."
}

$manifestRows = [System.Collections.Generic.List[object]]::new()
$pageSequence = @{}

foreach ($row in $rows) {
    if ($row.Type -ne "image") {
        continue
    }

    if (-not $pageSequence.ContainsKey($row.Page)) {
        $pageSequence[$row.Page] = 0
    }
    $pageSequence[$row.Page]++

    $source = Join-Path $raw ("obj-{0:D3}.png" -f $row.Num)
    $next = $rows | Where-Object Num -eq ($row.Num + 1) | Select-Object -First 1
    $hasMask = $next -and $next.Type -eq "smask" -and $next.ObjectId -eq $row.ObjectId
    $filename = "pagina-{0:D3}-imagem-{1:D2}.png" -f $row.Page, $pageSequence[$row.Page]
    $destination = Join-Path $final $filename

    if ($hasMask) {
        $mask = Join-Path $raw ("obj-{0:D3}.png" -f $next.Num)
        & magick $source $mask -alpha off -compose CopyOpacity -composite $destination
        if ($LASTEXITCODE -ne 0) {
            throw "Falha ao aplicar mascara em $filename."
        }
    }
    else {
        Copy-Item -LiteralPath $source -Destination $destination -Force
    }

    $manifestRows.Add([pscustomobject]@{
        arquivo = $filename
        pagina = $row.Page
        imagem_na_pagina = $pageSequence[$row.Page]
        largura = $row.Width
        altura = $row.Height
        transparencia_recomposta = $hasMask
        objeto_pdf = $row.ObjectId
    })
}

$manifestRows | Export-Csv -LiteralPath $manifest -NoTypeInformation -Encoding utf8

Write-Host "Concluido: $($manifestRows.Count) imagens em $final"
