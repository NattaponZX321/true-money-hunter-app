@echo off
echo Installing Git and pushing code to GitHub...

:: Check if Git is already installed
where git >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Git is already installed, proceeding with upload.
    goto GitInstalled
)

echo Git is not installed. Downloading Git...

:: Create a temporary directory
mkdir %TEMP%\git-install >nul 2>&1

:: Download Git using PowerShell
powershell -Command "& { (New-Object System.Net.WebClient).DownloadFile('https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe', '%TEMP%\git-install\git-installer.exe') }"

if not exist "%TEMP%\git-install\git-installer.exe" (
    echo Failed to download Git installer.
    goto End
)

echo Installing Git... This might take a few minutes.
:: Install Git silently
start /wait "" "%TEMP%\git-install\git-installer.exe" /VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS

echo Setting up PATH for Git...
:: Add Git to PATH for this session
set "PATH=%ProgramFiles%\Git\cmd;%ProgramFiles%\Git\mingw64\bin;%ProgramFiles%\Git\usr\bin;%PATH%"

:GitInstalled
cd /d "c:\Users\TMK\Downloads\true-money-hunter-app-main\true-money-hunter-app-main"

echo Initializing Git repository...
git init

echo Adding files to repository...
git add .

echo Creating initial commit...
git commit -m "Initial commit"

echo Adding remote repository...
git remote add origin https://github.com/NattaponZX321/ffffffffffffeeede.git

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo If you're prompted for credentials, please enter your GitHub username and password/token.
echo If you're having trouble with authentication, you might need to create a Personal Access Token on GitHub.
echo.
echo Process completed. Check the output above for any errors.

:End
pause
