# Capture layout screenshots with headless Edge.
# Usage: & scripts\verify-ui.ps1
#
# ASCII only on purpose: Windows PowerShell 5.1 reads .ps1 files using the
# system ANSI code page, so non-ASCII text in this file breaks parsing.
#
# Two environment notes learned the hard way:
#   1. Headless Edge needs process isolation that the workspace-write file
#      sandbox blocks (mojo platform_channel: access denied 0x5). Run this
#      from a session whose file policy is danger-full-access, otherwise the
#      browser dies before it can render anything.
#   2. Launching the browser and capturing in one script avoids a race where
#      Edge exits (and closes its debug port) between two separate commands.

$ErrorActionPreference = 'Continue'

$edgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$port = 3000
$outDir = Join-Path (Split-Path -Parent $PSScriptRoot) 'tmp-verify'

$shots = @(
  @{ Name = '1-services'; Width = 1280; Height = 1400; Url = 'http://127.0.0.1:3000/services' },
  @{ Name = '2-home';     Width = 1280; Height = 1200; Url = 'http://127.0.0.1:3000/' },
  @{ Name = '3-gallery';  Width = 1280; Height = 1200; Url = 'http://127.0.0.1:3000/gallery' }
)

if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

Write-Host '[-] closing leftover Edge processes'
Get-Process msedge -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

foreach ($shot in $shots) {
  $profile = Join-Path $env:TEMP ("edge-shot-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
  $target = Join-Path $outDir ($shot.Name + '.png')

  & $edgePath @(
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    "--window-size=$($shot.Width),$($shot.Height)",
    "--user-data-dir=$profile",
    "--screenshot=$target",
    $shot.Url
  ) 2>$null | Out-Null

  Start-Sleep -Seconds 2

  if (Test-Path $target) {
    $size = (Get-Item $target).Length
    Write-Host "[-] $($shot.Name): $size bytes"
  } else {
    Write-Host "[x] $($shot.Name): failed"
  }
}

Write-Host '[-] cleanup'
Get-Process msedge -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "[-] screenshots in $outDir"
