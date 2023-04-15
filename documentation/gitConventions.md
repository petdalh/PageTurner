# GitLab conventions to follow:

## 1. *Never* work in master branch

- To check which branch you are in:
**git branch -list**

- If you are in wrong branch and want to switch to a branch that already exists:
**git checkout <name_of_branch>**

- To create *new* branch and switch to it: 
 **git checkout -b <name_of_branch>**

*IF YOU BY ACCIDENT BEGIN TO WRITE IN THE MASTER BRANCH:*
1. **git stash**
2. **git checkout -b <name_of_branch>** to make new branch or **git checkout <name_of_existing_branch>**
3. **git branch -list** to check you are in correct branch
4. **git stash pop**

<br />

## 2.  When you are ready to commit your changes and create a merge request:

1. Add all your changes: **git add .** or **git add -A** if you've also created new files

2. Check that your changes have been added: **git status**

3. Commit your changes: **git commit**

    Press 'i' on keyboard to insert and write:
    - Header: commit-message-navn 
    - Body: what and why
    - Footer: issue #issueNumber
    - Press "esc" and write ":wq" and enter.
    - Finally you push to branch by writing: **git push origin name_of_current_branch**
    - Next, go to gitlab and select "create new merge request"
    - Two others (not you) are to read through your changes and approve the merge request BEFORE merging
