@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
pushd "%SCRIPT_DIR%" >nul
node --no-warnings --experimental-strip-types "%SCRIPT_DIR%protoc-gen-cpp-functions.ts" %*
set "EXIT_CODE=%ERRORLEVEL%"
popd >nul
exit /b %EXIT_CODE%
