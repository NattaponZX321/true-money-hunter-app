# Script to upload code to GitHub
# Make sure Git is installed before running this script

# Initialize a new Git repository
git init

# Add all files to the repository
git add .

# Commit the files
git commit -m "Initial commit"

# Add the remote repository
git remote add origin https://github.com/NattaponZX321/ffffffffffffeeede.git

# Set the main branch
git branch -M main

# Push to GitHub
git push -u origin main

Write-Host "If you're prompted for credentials, please enter your GitHub username and password/token."
Write-Host "Process completed. Check the output above for any errors."
