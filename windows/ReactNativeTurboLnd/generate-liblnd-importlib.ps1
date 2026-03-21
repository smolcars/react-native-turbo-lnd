param(
  [Parameter(Mandatory = $true)]
  [string]$DllPath,

  [Parameter(Mandatory = $true)]
  [string]$OutDefPath,

  [Parameter(Mandatory = $true)]
  [string]$OutLibPath,

  [Parameter()]
  [string]$VCToolsInstallDir,

  [Parameter(Mandatory = $true)]
  [string]$ToolArch,

  [Parameter(Mandatory = $true)]
  [string]$Machine
)

$ErrorActionPreference = "Stop"

if (!(Test-Path -LiteralPath $DllPath)) {
  throw "liblnd.dll was not found at '$DllPath'."
}

if ([string]::IsNullOrWhiteSpace($VCToolsInstallDir)) {
  $dumpbinCommand = Get-Command dumpbin.exe -ErrorAction SilentlyContinue
  $libCommand = Get-Command lib.exe -ErrorAction SilentlyContinue

  if ($dumpbinCommand -and $libCommand) {
    $dumpbinPath = $dumpbinCommand.Source
    $libExePath = $libCommand.Source
  } else {
    $vswherePath = Join-Path ${env:ProgramFiles(x86)} "Microsoft Visual Studio\\Installer\\vswhere.exe"
    if (Test-Path -LiteralPath $vswherePath) {
      $installationPath = & $vswherePath -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath | Select-Object -First 1
      if ($installationPath) {
        $msvcRoot = Join-Path $installationPath "VC\\Tools\\MSVC"
        $latestToolsDir = Get-ChildItem -Path $msvcRoot -Directory | Sort-Object Name -Descending | Select-Object -First 1
        if ($latestToolsDir) {
          $VCToolsInstallDir = $latestToolsDir.FullName
        }
      }
    }
  }
}

if ([string]::IsNullOrWhiteSpace($dumpbinPath) -or [string]::IsNullOrWhiteSpace($libExePath)) {
  if ([string]::IsNullOrWhiteSpace($VCToolsInstallDir)) {
    throw "Could not locate Visual C++ tools. Set LndImportLibPath explicitly or install the MSVC build tools."
  }

  $toolBinDir = Join-Path $VCToolsInstallDir "bin\\Hostx64\\$ToolArch"
  $dumpbinPath = Join-Path $toolBinDir "dumpbin.exe"
  $libExePath = Join-Path $toolBinDir "lib.exe"
}

if (!(Test-Path -LiteralPath $dumpbinPath)) {
  throw "dumpbin.exe was not found at '$dumpbinPath'."
}

if (!(Test-Path -LiteralPath $libExePath)) {
  throw "lib.exe was not found at '$libExePath'."
}

$outDir = Split-Path -Parent $OutLibPath
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$exports = & $dumpbinPath /EXPORTS $DllPath
if ($LASTEXITCODE -ne 0) {
  throw "dumpbin.exe failed while inspecting '$DllPath'."
}

$exportNames =
  $exports |
  ForEach-Object {
    if ($_ -match "^\s+\d+\s+[0-9A-F]+\s+[0-9A-F]+\s+(\S+)$") {
      $matches[1]
    }
  } |
  Where-Object { $_ -and $_ -ne "[NONAME]" } |
  Sort-Object -Unique

if (!$exportNames -or $exportNames.Count -eq 0) {
  throw "No exports were found in '$DllPath'."
}

$defContent = @("LIBRARY liblnd", "EXPORTS") + ($exportNames | ForEach-Object { "  $_" })
Set-Content -Path $OutDefPath -Value $defContent

& $libExePath "/def:$OutDefPath" "/machine:$Machine" "/out:$OutLibPath"
if ($LASTEXITCODE -ne 0) {
  throw "lib.exe failed while generating '$OutLibPath'."
}
