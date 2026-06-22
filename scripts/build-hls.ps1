$ErrorActionPreference = "Continue"

$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpeg) {
  $ffmpeg = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe" -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue | Select-Object -First 1
}

if (-not $ffmpeg) {
  throw "ffmpeg.exe was not found. Install FFmpeg first."
}

$ffmpegPath = $ffmpeg.Source

if (-not $ffmpegPath) {
  $ffmpegPath = $ffmpeg.FullName
}

$items = @(
  @{ Key = "hero"; Source = "cdn-video\full\hero-hd.mp4" },
  @{ Key = "project-ai"; Source = "cdn-video\full\project-ai-hd.mp4" },
  @{ Key = "project-brand"; Source = "cdn-video\full\project-brand-hd.mp4" },
  @{ Key = "project-particle"; Source = "cdn-video\full\project-particle-hd.mp4" },
  @{ Key = "project-tech"; Source = "cdn-video\full\project-tech-hd.mp4" },
  @{ Key = "project-other"; Source = "cdn-video\full\project-other-hd.mp4" }
)

foreach ($item in $items) {
  if (-not (Test-Path $item.Source)) {
    throw "Missing source video: $($item.Source)"
  }

  $outDir = "cdn-video\hls\$($item.Key)"
  if (Test-Path $outDir) {
    Remove-Item -LiteralPath $outDir -Recurse -Force
  }
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null

  Write-Host "Building adaptive HLS: $($item.Key)"

  & $ffmpegPath `
    -hide_banner `
    -y `
    -i $item.Source `
    -filter_complex "[0:v]split=3[v480src][v720src][v1080src];[v480src]scale=w=854:h=-2[v480];[v720src]scale=w=1280:h=-2[v720];[v1080src]scale=w=1920:h=-2[v1080]" `
    -map "[v480]" `
    -map "[v720]" `
    -map "[v1080]" `
    -c:v:0 libx264 `
    -c:v:1 libx264 `
    -c:v:2 libx264 `
    -preset medium `
    -crf 25 `
    -b:v:0 900k `
    -maxrate:v:0 1100k `
    -bufsize:v:0 1800k `
    -b:v:1 2200k `
    -maxrate:v:1 2600k `
    -bufsize:v:1 4400k `
    -b:v:2 4500k `
    -maxrate:v:2 5400k `
    -bufsize:v:2 9000k `
    -g 48 `
    -keyint_min 48 `
    -sc_threshold 0 `
    -an `
    -hls_time 6 `
    -hls_playlist_type vod `
    -hls_flags independent_segments `
    -hls_segment_filename "$outDir\v%v\segment_%03d.ts" `
    -master_pl_name "master.m3u8" `
    -var_stream_map "v:0,name:480p v:1,name:720p v:2,name:1080p" `
    "$outDir\v%v\index.m3u8" 2>&1 | Out-Null

  if ($LASTEXITCODE -ne 0) {
    throw "HLS build failed: $($item.Key)"
  }

  Get-ChildItem $outDir -Recurse -Filter "*.m3u8" | ForEach-Object {
    $content = Get-Content -LiteralPath $_.FullName -Raw
    $content = $content.Replace("\", "/")
    Set-Content -LiteralPath $_.FullName -Value $content -NoNewline
  }
}

Write-Host "Done. Upload cdn-video\hls to your video CDN."
