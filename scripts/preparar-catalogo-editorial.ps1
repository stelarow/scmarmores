param(
    [string]$SourceDirectory = "catalogo-imagens-extraidas\imagens-formatadas\formatadas\imagens-formatadas",
    [string]$ManifestPath = "catalogo-imagens-extraidas\imagens-formatadas\formatadas\manifesto-formatadas.csv",
    [string]$OutputDirectory = "public\catalogo\editorial",
    [string]$DataPath = "app\catalogo\catalog-assets.json"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root $SourceDirectory
$manifest = Join-Path $root $ManifestPath
$output = Join-Path $root $OutputDirectory
$dataFile = Join-Path $root $DataPath

$categories = @(
    @{ slug = "silestones"; from = 3; to = 11 },
    @{ slug = "dekton"; from = 12; to = 23 },
    @{ slug = "granitos"; from = 24; to = 32 },
    @{ slug = "quartzitos"; from = 33; to = 44 },
    @{ slug = "compacstones"; from = 45; to = 47 },
    @{ slug = "onix"; from = 48; to = 51 },
    @{ slug = "marmores"; from = 52; to = 62 },
    @{ slug = "limestones"; from = 63; to = 64 },
    @{ slug = "infinity"; from = 65; to = 69 },
    @{ slug = "crystal"; from = 70; to = 71 }
)

$coverPages = @(3, 12, 24, 33, 45, 48, 52, 63, 65, 70)
$rows = Import-Csv -LiteralPath $manifest
$result = [ordered]@{}

New-Item -ItemType Directory -Force -Path $output | Out-Null

foreach ($category in $categories) {
    $categoryOutput = Join-Path $output $category.slug
    New-Item -ItemType Directory -Force -Path $categoryOutput | Out-Null
    $assets = [System.Collections.Generic.List[object]]::new()

    foreach ($row in $rows) {
        $page = [int]$row.pagina
        if ($page -lt $category.from -or $page -gt $category.to) {
            continue
        }

        $inputFile = Join-Path $source $row.arquivo
        if (-not (Test-Path -LiteralPath $inputFile)) {
            continue
        }

        $geometry = (& magick identify -format "%w %h" $inputFile).Trim() -split " "
        $width = [int]$geometry[0]
        $height = [int]$geometry[1]
        $fileSize = (Get-Item -LiteralPath $inputFile).Length

        # Exclude tiny marks, logos and decorative fragments. Keep material
        # samples and application photography, including transparent crops.
        if ($width -lt 120 -or $height -lt 65 -or $fileSize -lt 12000) {
            continue
        }

        $stem = [IO.Path]::GetFileNameWithoutExtension($row.arquivo)
        $outputFile = Join-Path $categoryOutput "$stem.webp"
        & magick $inputFile -strip -quality 82 -define webp:method=6 $outputFile
        if ($LASTEXITCODE -ne 0) {
            throw "Falha ao otimizar $($row.arquivo)"
        }

        $ratio = [math]::Round($width / $height, 2)
        $role = if ($coverPages -contains $page -or $width -ge 900 -or $ratio -ge 1.7) {
            "feature"
        }
        else {
            "sample"
        }

        $assets.Add([ordered]@{
            src = "/catalogo/editorial/$($category.slug)/$stem.webp"
            page = $page
            sequence = [int]$row.imagem_na_pagina
            role = $role
            width = $width
            height = $height
        })
    }

    $result[$category.slug] = @($assets)
}

$json = $result | ConvertTo-Json -Depth 6
[IO.File]::WriteAllText($dataFile, $json, [Text.UTF8Encoding]::new($false))
Write-Host "Catálogo editorial preparado: $($result.Keys.Count) categorias."
