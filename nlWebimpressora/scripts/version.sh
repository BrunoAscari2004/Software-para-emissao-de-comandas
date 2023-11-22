#!/bin/sh
BRANCH_NAME=${CI_COMMIT_BRANCH:-$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)}
CURRENT_DATE=$(date +"%Y-%m-%dT%H:%M:%S%z")
LAST_COMMIT_HASH=$(git rev-parse --short HEAD)

printf '{\n\t"date": "%s",\n\t"branch": "%s", \n\t"lastCommit": "%s"\n}' "$CURRENT_DATE" "$BRANCH_NAME" "$LAST_COMMIT_HASH" > version.json
