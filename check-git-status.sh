#!/bin/bash
echo "Git Status Check - $(date)" > git-status-check.txt
echo "=========================" >> git-status-check.txt
echo "" >> git-status-check.txt
echo "Current branch:" >> git-status-check.txt
git branch >> git-status-check.txt
echo "" >> git-status-check.txt
echo "Git status:" >> git-status-check.txt
git status >> git-status-check.txt
echo "" >> git-status-check.txt
echo "Last 3 commits:" >> git-status-check.txt
git log --oneline -3 >> git-status-check.txt
echo "" >> git-status-check.txt
echo "Remote repositories:" >> git-status-check.txt
git remote -v >> git-status-check.txt
