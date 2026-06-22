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
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null

  Write-Host "Building HLS: $($item.Key)"

  & $ffmpegPath `
    -hide_banner `
    -y `
    -i $item.Source `
    -c:v copy `
    -an `
    -hls_time 6 `
    -hls_playlist_type vod `
    -hls_flags independent_segments `
    -hls_segment_filename "$outDir\segment_%03d.ts" `
    "$outDir\master.m3u8" 2>&1 | Out-Null

  if ($LASTEXITCODE -ne 0) {
    throw "HLS build failed: $($item.Key)"
  }
}

Write-Host "Done. Upload cdn-video\hls to your video CDN."
