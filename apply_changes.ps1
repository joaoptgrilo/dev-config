# Script: publish-package.ps1
# Purpose: Commits, pushes, and publishes the @joaoptgrilo/dev-config package to NPM.

# --- 1. Read the version for confirmation ---
$packageJsonPath = ".\package.json"
if (-not (Test-Path $packageJsonPath)) {
    Write-Host "❌ ERROR: package.json not found in the current directory."
    exit 1
}
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
$version = $packageJson.version

Write-Host "The package version is currently set to: $version"
Write-Host "Please ensure this is the correct version you intend to publish."

# --- 2. Safety Gate: User Confirmation ---
$confirmation = Read-Host "Are you sure you want to commit all changes and publish version $version to NPM? (y/n)"

if ($confirmation -ne 'y') {
    Write-Host "Publish cancelled by user."
    exit
}

# --- 3. Git Operations ---
Write-Host "Staging all changes..."
git add .

$commitMessage = "feat(package): add exports field and publish version $version"
Write-Host "Committing with message: `"$commitMessage`""
git commit -m $commitMessage

Write-Host "Pushing changes to remote..."
git push

# --- 4. NPM Publish Operation ---
Write-Host "Publishing version $version to NPM..."
# The --access public flag is necessary for scoped packages (@scope/name)
npm publish --access public

Write-Host "✅ Success! Version $version has been published to NPM."