param(
    [Parameter(Mandatory = $true)]
    [string]$PdfPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputDirectory,

    [int]$Density = 180
)

$ErrorActionPreference = "Stop"

$pdf = (Resolve-Path -LiteralPath $PdfPath).Path
$output = [System.IO.Path]::GetFullPath($OutputDirectory)
$images = Join-Path $output "imagens-formatadas"
$temp = Join-Path $output "temporarios"
$manifest = Join-Path $output "manifesto-formatadas.csv"

New-Item -ItemType Directory -Force -Path $output, $images, $temp | Out-Null

$env:Path = [Environment]::GetEnvironmentVariable("Path", "User") + ";" +
    [Environment]::GetEnvironmentVariable("Path", "Machine")

foreach ($command in @("pdfinfo", "pdftocairo", "magick")) {
    if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
        throw "Comando obrigatorio nao encontrado: $command"
    }
}

$pageCountLine = & pdfinfo $pdf | Where-Object { $_ -match "^Pages:" }
$pageCount = [int](($pageCountLine -split ":")[1].Trim())
$manifestRows = [System.Collections.Generic.List[object]]::new()

function Get-HrefId {
    param([System.Xml.XmlElement]$Node)

    $href = $Node.GetAttribute("href", "http://www.w3.org/1999/xlink")
    if (-not $href) {
        $href = $Node.GetAttribute("href")
    }
    if ($href.StartsWith("#")) {
        return $href.Substring(1)
    }
    return $null
}

function Test-ContainsRaster {
    param(
        [System.Xml.XmlNode]$Node,
        [hashtable]$Ids,
        [System.Collections.Generic.HashSet[string]]$Visited
    )

    if ($Node.LocalName -eq "image") {
        return $true
    }

    if ($Node.LocalName -eq "use") {
        $id = Get-HrefId $Node
        if ($id -and $Ids.ContainsKey($id) -and $Visited.Add($id)) {
            if (Test-ContainsRaster $Ids[$id] $Ids $Visited) {
                return $true
            }
        }
    }

    foreach ($child in $Node.ChildNodes) {
        if ($child.NodeType -eq [System.Xml.XmlNodeType]::Element) {
            if (Test-ContainsRaster $child $Ids $Visited) {
                return $true
            }
        }
    }

    return $false
}

for ($page = 1; $page -le $pageCount; $page++) {
    Write-Host ("Pagina {0}/{1}" -f $page, $pageCount)

    $pageSvg = Join-Path $temp ("pagina-{0:D3}.svg" -f $page)
    $isolatedSvg = Join-Path $temp "isolada.svg"

    Remove-Item -LiteralPath $pageSvg, $isolatedSvg -Force -ErrorAction SilentlyContinue
    & pdftocairo -f $page -l $page -svg $pdf $pageSvg
    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao converter a pagina $page em SVG."
    }

    [xml]$document = Get-Content -LiteralPath $pageSvg -Raw
    $ids = @{}
    foreach ($node in $document.SelectNodes("//*[@id]")) {
        $ids[$node.id] = $node
    }

    $rootUse = $document.svg.g.SelectSingleNode('.//*[local-name()="use"]')
    $pageSourceId = Get-HrefId $rootUse
    $pageSource = $ids[$pageSourceId]
    if (-not $pageSource) {
        throw "Grupo principal nao encontrado na pagina $page."
    }

    $candidateIndexes = [System.Collections.Generic.List[int]]::new()
    for ($index = 0; $index -lt $pageSource.ChildNodes.Count; $index++) {
        $candidate = $pageSource.ChildNodes[$index]
        if ($candidate.NodeType -ne [System.Xml.XmlNodeType]::Element) {
            continue
        }

        $visited = [System.Collections.Generic.HashSet[string]]::new()
        if (Test-ContainsRaster $candidate $ids $visited) {
            $candidateIndexes.Add($index)
        }
    }

    $sequence = 0
    foreach ($candidateIndex in $candidateIndexes) {
        $sequence++
        $filename = "pagina-{0:D3}-imagem-{1:D2}.png" -f $page, $sequence
        $destination = Join-Path $images $filename

        [xml]$isolated = $document.Clone()
        $isolatedPageSource = $isolated.SelectSingleNode("//*[@id='$pageSourceId']")
        for ($index = $isolatedPageSource.ChildNodes.Count - 1; $index -ge 0; $index--) {
            if ($index -ne $candidateIndex) {
                [void]$isolatedPageSource.RemoveChild($isolatedPageSource.ChildNodes[$index])
            }
        }
        $isolated.Save($isolatedSvg)

        & magick -background white -density $Density $isolatedSvg `
            -alpha set -channel RGBA -fuzz "8%" -fill none -draw "color 0,0 floodfill" `
            -trim +repage $destination
        if ($LASTEXITCODE -ne 0) {
            throw "Falha ao renderizar $filename."
        }

        $geometry = (& magick identify -format "%wx%h" $destination).Trim()
        if ($geometry -eq "1x1") {
            Remove-Item -LiteralPath $destination -Force
            continue
        }

        $manifestRows.Add([pscustomobject]@{
            arquivo = $filename
            pagina = $page
            imagem_na_pagina = $sequence
            grupo_svg = $candidateIndex
            densidade = $Density
        })
    }

    Remove-Item -LiteralPath $pageSvg -Force
}

$manifestRows | Export-Csv -LiteralPath $manifest -NoTypeInformation -Encoding utf8
Remove-Item -LiteralPath $temp -Recurse -Force

Write-Host "Concluido: $($manifestRows.Count) imagens formatadas em $images"
