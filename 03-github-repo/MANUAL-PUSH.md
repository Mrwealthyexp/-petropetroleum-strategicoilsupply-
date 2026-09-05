# Manual Push to GitHub

Use this if Bolt.new push fails.

## Prerequisites
- Git installed: `git --version`
- GitHub account: `Mrwealthyexp`
- Repo created: `petropetroleum-strategicoilsupply`

## Commands

```bash
# 1. Navigate to project
cd /path/to/bolt-project

# 2. Initialize git
git init

# 3. Connect to remote
git remote add origin https://github.com/Mrwealthyexp/petropetroleum-strategicoilsupply.git

# 4. Stage all files
git add .

# 5. Commit
git commit -m "Initial PetroPulse build from Bolt.new"

# 6. Push (force if needed)
git push -u origin main --force
```

## Authentication

If asked for password:
- Use **GitHub Personal Access Token** (not password)
- Create at: github.com/settings/tokens
- Scope: `repo`

## Verify

Go to: `github.com/Mrwealthyexp/petropetroleum-strategicoilsupply`

Refresh page → Should see all files
