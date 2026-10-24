# Remove dsh-theme-mbcc-console from the DSH Desktop profile.
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\uninstall.ps1
param(
  [string]$ProfileDir = (Join-Path $env:USERPROFILE '.dsh\profiles\desktop')
)

$ErrorActionPreference = 'Stop'
$dest = Join-Path $ProfileDir 'node_modules\dsh-theme-mbcc-console'
$patch = Join-Path $ProfileDir 'cordis.patch.yml'

if (Test-Path $dest) {
  Remove-Item -Recurse -Force $dest
  Write-Host "package  -> removed $dest"
} else {
  Write-Host "package  -> not installed"
}

if (Test-Path $patch) {
  $content = Get-Content -Raw -Path $patch
  $pattern = "(?ms)^- insert:\s*\r?\n\s*- id: mbcc-console\s*\r?\n\s*name: 'dsh-theme-mbcc-console'\s*\r?\n?"
  $new = [regex]::Replace($content, $pattern, '')
  if ($new -ne $content) {
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($patch, $new.TrimEnd() + "`n", $utf8)
    Write-Host 'patch    -> entry removed'
  } else {
    Write-Host 'patch    -> no matching entry'
  }
}

Write-Host ''
Write-Host 'Done. Restart DSH Desktop to apply.'
