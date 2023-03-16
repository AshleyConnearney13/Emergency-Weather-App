# whelter-app
Repository for Whelter, an emergency shelter oriented Android application developed for SE300.

# Required installations
Note: Make sure to run these commands in the empty folder initially created in step 1 of "Creating your Local Git repository...".

Note 2: To run the program, run `npx expo start` in the Command Prompt within this folder.
```
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-dropdown-picker
```

# Creating your local Git repository and linking it to our remote repository
1. Create an empty folder, and open up Command Prompt. Change the directory to be inside of this empty folder.
2. Run `git init` to initialize your local Git repository.
3. Run `git remote add origin https://github.com/AshleyConnearney13/Emergency-Weather-App.git`. Verify that its connected using `git remote -v`. From now on, the remote repository on GitHub will be called as "origin".
4. Run `git pull` to pull all the latest information from the remote repository. As of the time this was wwritten, you should see main, master, and dev pop up.
5. Since we will mostly be working on the dev branch unless another branch is required, run `git checkout -b XXXXX` as many times as there are branches in the remote repository. XXXXX should be the name of each branch.
6. Now, to confirm you've set up everything correctly so far, run `git branch -a`. A complete list of every local and remote branch should appear.
7. If necessary, run `git checkout XXXXX` to switch to an existing local branch, where XXXXX is the name of the branch.

# Merging your local branches with the remote branches
1. For the sake of simplicity, this assumes you are currently on the local dev branch. If you are not, run `git checkout dev`.
2. Now, run `git branch --set-upstream-to=origin/dev`. This makes it so your local dev branch is tracking the remote dev branch.
3. Once this is set up, run `git status`. This command should let you know of any differences between the local and remote branches, how many commits each branch has, and so on.
4. Once you have confirmed that the corresponding remote branch is being tracked, run `git pull` to download all the files from the remote dev branch to your local dev branch.

# Committing to your local repository and our remote repository
1. For the sake of simplicity, this assumes you are currently on the local dev branch. If you are not, run `git checkout dev`. Then, run `git add .` to queue files for a local commit.
2. Run `git commit -m "XXXXX"` to commit the files to your local repository. XXXXX stands for the title of the commit to show. This displays to the right of the file name(s) on GitHub, so write something that describes what changed in the file(s) that makes them relate to eachother.
3. Once done, run `git status` to compare your local branch and its corresponding remote branch being tracked.
4. If no issues are shown with the above command, and it says `use "git push" to publish your local commits`, run `git pull` once again just to be safe. This will make sure that your local branch is up to date with the remote branch.
5. Finally, run `git push` to push your local commit to the remote repository.
