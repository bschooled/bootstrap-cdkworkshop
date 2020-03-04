$npmpackagelist = @(
    'cdk'
)

$msilist = @{
    "npm"='https://nodejs.org/dist/v13.9.0/node-v13.9.0-x64.msi';
    "code --version"='https://az764295.vo.msecnd.net/stable/c47d83b293181d9be64f27ff093689e8e7aed054/VSCodeSetup-x64-1.42.1.exe';
    "dotnet --list-sdks"="https://download.visualstudio.microsoft.com/download/pr/5aad9c2c-7bb6-45b1-97e7-98f12cb5b63b/6f6d7944c81b043bdb9a7241529a5504/dotnet-sdk-3.1.102-win-x64.exe"
}

$msilookuplist = @{
    "code --version"='VSCode';
    "dotnet --list-sdks"=".Net Core SDK";
    "npm"='NodeJS';
}

function Invoke-DownloadFile(){
    param(
        [string]$URI,
        [string]$Directory
    )
    [regex]$match = '[^\/]+$'


    $output = $match.Match($uri).Value
    if($Directory -and !(Test-Path $Directory)){
        New-Item -ItemType Directory -Name $Directory
        $path = (Get-Item $Directory).FullName + "\$output"
    }
    elseif($Directory -and (Test-Path $Directory)){
        $path = (Get-Item $Directory).FullName + "\$output"
    }
    else{
        $path = "$($pwd.Path)\$output"
    }

    if(!(Get-ChildItem $path -ErrorAction SilentlyContinue)){
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($uri, $path)
    }

    return $output
}

function Check-AdminPrivileges(){
    if(([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")){
        Write-Host "`tUser has Admin privileges, continuing ..." -ForegroundColor Yellow
        return $true
    }
    else{
        Write-Error "`tUser does not have Admin privileges, exiting ..."
        break;
    }
}

Write-Host "Starting downloads ..." -ForegroundColor Yellow
foreach($msi in $msilist.Keys){
    $realname = $msilookuplist.$msi
    try{
        $ErrorActionPreference = "SilentlyContinue"

        if($msi -like "dotnet*"){
            $dotnet = Invoke-Expression $msi
            if($dotnet){
                $Results = "`t$realname already Installed"
            }
            else{
                throw "Not installed" | Out-Null
            }
        }
        else{
            Invoke-Expression $msi | Out-Null
            $Results = "`t$realname already Installed"
            if($msi -eq "npm"){
                $npm = $true
            }
        }
        
    }
    catch{
        $ErrorActionPreference = "Continue"
        Write-Warning "$msi command failed, downloading $($msilist.$msi)"
        
        Check-AdminPrivileges

        $filename = invoke-downloadfile -URI $msilist.$msi -Directory "Installers"
        #Invoke-Expression $($msioptions.$msi)
        $Results = "`tDownloaded $filename, you need to install $realname"

    }
   finally{
        $ErrorActionPreference = "Continue"
       Write-Host $Results -ForegroundColor Green
   }
}

if($npm){
    Write-Host "NPM is installed, installing packages to correct projects ..." -ForegroundColor Yellow
    foreach($package in $npmpackagelist){
        [array]$match = (npm list "$package" -g) -match " $package"
        if($match.Count -eq 0){
            npm install -g $package
        }
        else{
            Write-Host "`t$package is already installed" -ForegroundColor Green
        }
    }
}
else{
    Write-Host "`nNPM is not installed and therefore there will be missing dependencies. Re-run this script after installing NodeJS to install dependencies" -ForegroundColor Yellow
}