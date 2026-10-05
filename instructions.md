# Safely Push This Project to GitHub

This is a Windows/PowerShell guide for this Next.js portfolio project.

The safest default is to push the application source and the images in
public/assets, while keeping local videos, dependencies, build output, and
private notes out of ordinary Git history. The current local MP4 files are
approximately 9.82 MB and 2.93 MB, so they are below GitHub's 100 MB regular
Git file limit, but videos still make clones and repository history larger.

## 1. Decide what belongs in Git

### Push these files

- app/**
- public/assets/*.png and other assets intentionally used by the app
- package.json
- package-lock.json
- tsconfig.json
- next-env.d.ts
- .gitignore
- .gitattributes
- instructions.md
- A public README.md, if you create one

The application references the copies under public/assets, so do not add the
duplicate media files from the project root unless the code intentionally uses
them.

### Do not push these files

- node_modules/ — dependencies are recreated with npm install
- .next/ — generated Next.js build output
- out/ or dist/ — generated export/build output, if created later
- .env, .env.local, .env.* — may contain secrets or private settings
- *.tsbuildinfo — local TypeScript cache
- *.mp4 in the normal workflow — the current .gitignore intentionally excludes videos
- The duplicate root-level .png files when the same files exist in public/assets
- agent*.md or other private working notes, unless you deliberately want them public
- API keys, passwords, tokens, private client data, credentials, or large source files
  that are not needed to build the site
- The .git/ directory itself

Never use git add . until the ignore rules and git status have been reviewed.
Selective staging is safer for this project.

## 2. Check the tools and project before initializing Git

Open PowerShell in the project folder and run:

~~~powershell
Set-Location "C:\Users\youha\Downloads\port_assets2"

git --version
node --version
npm --version

Get-ChildItem -Force
Get-Content .gitignore
Get-Content .gitattributes
~~~

Install dependencies and make sure the project builds locally:

~~~powershell
npm install
npm run build
~~~

If npm run build fails, fix that first. Do not use a failed build as the first
commit unless you intentionally want to publish an unfinished state.

Check for files that are large enough to investigate:

~~~powershell
Get-ChildItem -File -Recurse -Force |
  Where-Object {
    $_.FullName -notlike '*\node_modules\*' -and
    $_.FullName -notlike '*\.next\*' -and
    $_.FullName -notlike '*\.git\*' -and
    $_.Length -gt 50MB
  } |
  Sort-Object Length -Descending |
  Select-Object @{Name='MB';Expression={[math]::Round($_.Length / 1MB, 2)}}, FullName
~~~

Check whether a particular file is being ignored and why:

~~~powershell
git check-ignore -v -- "Greeting video.mp4"
git check-ignore -v -- "public\assets\Greeting video.mp4"
~~~

If a file is unexpectedly ignored, do not immediately force-add it. First
decide whether it is actually needed in the repository.

## 3. Create the GitHub repository

On GitHub, create a new repository under your account or organization.

For the simplest first push:

1. Choose the repository name.
2. Choose public or private deliberately.
3. Leave Add a README, .gitignore, and license unchecked.
4. Create the empty repository.

Copy the HTTPS or SSH URL. It will look like one of these:

~~~text
https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.git
~~~

Using an empty GitHub repository avoids an unnecessary unrelated-history
merge on the first push.

## 4. Improve the ignore rules before the first commit

The project currently ignores *.mp4 and node_modules, but it should also ignore
Next.js output, TypeScript cache files, environment files, and common local
files. Open .gitignore and make sure it contains at least:

~~~gitignore
node_modules/
.next/
out/
dist/
*.tsbuildinfo

.env
.env.*
!.env.example

*.mp4

.DS_Store
Thumbs.db
.vscode/
~~~

If the root-level media are only duplicate working copies, add these lines as
well. The leading slash applies only to files at the project root, not the
required copies in public/assets:

~~~gitignore
/*.png
/*.mp4
~~~

Do not put public/assets/ in .gitignore, because those are the image assets
used by the app.

The current .gitattributes line appears to be a typo:

~~~text
*,mp4 filter=lfs diff=lfs merge=lfs -text
~~~

For the recommended no-video workflow, .gitattributes can be empty or can
contain only other deliberate rules. Do not leave a misleading LFS rule in it.
If you choose the LFS workflow in section 8, let git lfs track "*.mp4" create
the correct rule instead of typing it manually.

## 5. Initialize the local repository

Run these commands from the project root:

~~~powershell
git init -b main
git config user.name "Your Name"
git config user.email "YOUR_EMAIL@example.com"
git status --short --branch
~~~

The user.name and user.email values are recorded in commits. Use the email you
want associated with your GitHub account, or GitHub's no-reply email if you do
not want your personal email in public commit metadata.

## 6. Stage only the intended files

For the recommended workflow, stage source, configuration, documentation, and
the image assets explicitly:

~~~powershell
git add .gitignore .gitattributes instructions.md
git add app public\assets package.json package-lock.json tsconfig.json next-env.d.ts
~~~

If a public README exists, add it explicitly:

~~~powershell
git add README.md
~~~

Review everything before committing:

~~~powershell
git status --short
git diff --cached --stat
git diff --cached --name-only
~~~

The staged list should not contain node_modules, .next, .env*, *.tsbuildinfo,
root duplicate images, or MP4 files in the recommended workflow. If an
unwanted file is staged, unstage it without deleting it:

~~~powershell
git restore --staged -- "path\to\unwanted-file"
~~~

If a file was ignored and you need to understand why:

~~~powershell
git check-ignore -v -- "path\to\file"
~~~

Do not use git add -f unless you have intentionally chosen the LFS workflow
and have confirmed the file should be public.

## 7. Commit and push the normal workflow

Create the first commit only after the staged review is clean:

~~~powershell
git commit -m "Initial portfolio site"
git branch --show-current
git log --oneline -1
~~~

Add the GitHub remote. Replace the placeholder with your real URL:

~~~powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git remote -v
~~~

Push the main branch:

~~~powershell
git push -u origin main
~~~

After the push, verify the result locally and on GitHub:

~~~powershell
git status --short --branch
git ls-files
git log --oneline --decorate -5
~~~

A clean status should show that the local main branch is up to date with
origin/main. Visit the repository page and confirm that source files and
public/assets are present, while generated folders and private files are not.

## 8. Optional: include the MP4 files with Git LFS

Use this option only when the videos must be available from the repository.
Git LFS stores pointer files in normal Git and stores the binary content in
LFS storage. LFS still consumes storage and bandwidth quota, so it is not a
way to get unlimited free media hosting.

Install Git LFS from https://git-lfs.com/ if git lfs version does not work,
then open a new PowerShell window and run:

~~~powershell
git lfs version
git lfs install
~~~

Before staging any MP4 file, remove the *.mp4 line from .gitignore. Then,
from the project root:

~~~powershell
git lfs track "*.mp4"
git add .gitattributes .gitignore
git add public\assets\*.mp4
git add app public\assets package.json package-lock.json tsconfig.json next-env.d.ts instructions.md
~~~

Check that Git LFS, rather than ordinary Git, owns the videos:

~~~powershell
git lfs ls-files
git status --short
git diff --cached --stat
~~~

The MP4 files should appear in git lfs ls-files. Commit and push:

~~~powershell
git commit -m "Initial portfolio site with video assets"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
git lfs push --all origin main
~~~

For a new repository, git lfs track must happen before the videos are
committed. Simply putting an LFS-looking line in .gitattributes after a file
has already been committed does not convert the old Git object into LFS.

## 9. If the GitHub repository already has a README or first commit

If you did not create an empty repository and GitHub already has a commit,
do not overwrite it. Fetch and merge it first:

~~~powershell
git fetch origin
git pull --rebase origin main --allow-unrelated-histories
~~~

Resolve any conflicts, then inspect the result:

~~~powershell
git status
git add "path\to\resolved-file"
git rebase --continue
~~~

If the command reports that a merge is in progress instead of a rebase, finish
the merge with:

~~~powershell
git add "path\to\resolved-file"
git commit
~~~

Then push:

~~~powershell
git push -u origin main
~~~

Do not use git push --force to solve an ordinary first-push conflict.

## 10. Fix common size and storage errors

### GH001: Large files detected or a file exceeds 100 MB

GitHub enforces a 100 MB maximum for a single normal Git object. Find the
offending file in the error message, then choose one of these paths.

If the file is not needed, remove it from the next commit:

~~~powershell
git restore --staged -- "path\to\large-file"
git rm --cached -- "path\to\large-file"
~~~

Add an appropriate .gitignore rule, amend the commit, and check again:

~~~powershell
git add .gitignore
git commit --amend --no-edit
git status --short
git push -u origin main
~~~

If the file is needed, use Git LFS from the beginning as described in section
8. If the large file is already present in one or more local commits, tracking
it now is not enough; its old Git history must be rewritten. Make a backup,
ensure nobody else depends on the remote history, then use:

~~~powershell
git lfs install
git lfs track "*.mp4"
git add .gitattributes
git lfs migrate import --include="*.mp4" --everything
git lfs ls-files
git push --force-with-lease origin main
git lfs push --all origin main
~~~

History rewriting changes commit IDs. Never run the force push against a shared
branch without coordinating with everyone who has cloned it.

### batch response: This repository is over its data quota

This is an LFS storage or bandwidth quota problem, not normally a local disk
problem. Check the repository owner's GitHub billing/settings page, reduce old
LFS versions if appropriate, or move large media to a dedicated asset host.
Do not repeatedly retry the same push; it will not increase the quota.

Useful checks are:

~~~powershell
git lfs env
git lfs ls-files
git count-objects -vH
~~~

### remote: error: GH001 after you already deleted the file

Deleting a file in the newest commit does not remove it from earlier commits.
Use git lfs migrate import for files that should remain in the repository, or
a history-rewriting tool such as git filter-repo for files that must be removed
entirely. Then force-push only after backing up and confirming that rewriting
the remote history is safe.

### src refspec main does not match any

There is no local commit or the branch is not called main:

~~~powershell
git status
git branch --show-current
git log --oneline -1
~~~

If there is no commit, stage and commit the intended files. If the branch has a
different name and you want main:

~~~powershell
git branch -M main
git push -u origin main
~~~

### Authentication failed

For HTTPS, use GitHub authentication through Git Credential Manager or a
personal access token when prompted; do not put a token directly in the remote
URL. For SSH, add an SSH key to GitHub and use the
git@github.com:... remote. Check the remote without exposing credentials:

~~~powershell
git remote -v
~~~

## 11. Normal workflow after the first push

For future changes:

~~~powershell
git pull --rebase origin main
npm install
npm run build

git status --short
git add app public\assets package.json package-lock.json tsconfig.json next-env.d.ts
git add instructions.md README.md 2>$null
git diff --cached --stat
git commit -m "Describe the change"
git push
~~~

If the change includes a new file, stage it explicitly and verify it with
git diff --cached --name-only. Keep the repository focused on source and
deliberate public assets; do not commit generated output or secrets.

## Official GitHub references

- [GitHub repository limits](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits)
- [Managing large files](https://docs.github.com/en/repositories/working-with-files/managing-large-files)
- [About Git Large File Storage](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage)
- [Configuring Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage?platform=windows)
- [GitHub LFS storage and bandwidth billing](https://docs.github.com/en/billing/concepts/product-billing/git-lfs)

