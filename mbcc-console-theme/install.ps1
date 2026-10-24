# Install dsh-theme-mbcc-console into the DSH Desktop profile (local dev channel).
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\install.ps1
#   powershell -ExecutionPolicy Bypass -File .\install.ps1 -ProfileDir "D:\other\profile"
param(
  [string]$ProfileDir = (Join-Path $env:USERPROFILE '.dsh\profiles\desktop')
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dest = Join-Path $ProfileDir 'node_modules\dsh-theme-mbcc-console'
$patch = Join-Path $ProfileDir 'cordis.patch.yml'

if (-not (Test-Path $ProfileDir)) {
  throw "DSH profile not found: $ProfileDir"
}

# 1) copy the package
New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
Copy-Item -Recurse -Force $root $dest
Write-Host "package  -> $dest"

# 2) add the patch row once
if (-not (Test-Path $patch)) { New-Item -ItemType File -Path $patch | Out-Null }
$content = Get-Content -Raw -Path $patch -ErrorAction SilentlyContinue
if ($null -eq $content) { $content = '' }

if ($content -match 'dsh-theme-mbcc-console') {
  Write-Host 'patch    -> entry already present'
} else {
  if ($content.Length -gt 0 -and -not $content.EndsWith("`n")) {
    Add-Content -Path $patch -Value ''
  }
  Add-Content -Path $patch -Value '- insert:'
  Add-Content -Path $patch -Value '    - id: mbcc-console'
  Add-Content -Path $patch -Value "      name: 'dsh-theme-mbcc-console'"
  Write-Host 'patch    -> entry added'
}

# 3) warn about other themes (two themes are not additive: later layer wins per token)
$all = Get-Content -Raw -Path $patch
if ($all -match 'theme-endfield' -or $all -match 'dsh-theme-') {
  Write-Host ''
  Write-Warning 'Another theme row exists in this profile (e.g. theme-endfield).'
  Write-Host 'Two themes override the same tokens; the later layer wins per token and'
  Write-Host 'the other theme still injects its own CSS. Disable the other theme first:'
  Write-Host '  - id: theme-endfield'
  Write-Host '    disabled: true'
}

Write-Host ''
Write-Host 'Done. Restart DSH Desktop to apply.'
Write-Host 'Toggle Settings -> General -> Appearance (dark / light) to check both palettes.'
Write-Host ''
Write-Host 'Note: this is the dev channel. A later install/uninstall through the plugin'
Write-Host 'manager runs pnpm and may prune this package from node_modules.'
