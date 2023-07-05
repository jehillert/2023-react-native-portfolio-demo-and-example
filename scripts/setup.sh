#!/bin/zsh
set -e
set -o pipefail
set -x

source utils/zsh-utils.sh

say "Setting up..."

if [[ $BITRISE_IO == "true" ]]; then
  say "Workflow is being run from bitrise.io.  Exiting script..."
  exit 0
fi

say "Setting environment file for staging."
if [ $BITRISE_TRIGGERED_WORKFLOW_TITLE == "StagingRelease" ]; then
  cp .env.staging .env
fi

say "Updating build number."
echo "$LATEST_BUILD"
INCREMENTED_BUILD_NUMBER=$(($LATEST_BUILD+1))
echo "$INCREMENTED_BUILD_NUMBER"
envman add --key LATEST_BUILD --value "$INCREMENTED_BUILD_NUMBER"

file=".bitrise.secrets.yml"
temp_file=".bitrise.secrets_temp.yml"

# Copy original line 1 to temp file
head -n 1 "$file" > "$temp_file"

# Write new line 2 to temp file
echo "  - LATEST_BUILD: $INCREMENTED_BUILD_NUMBER" >> "$temp_file"

# Skip lines 1-2 and append rest of original file
tail -n +3 "$file" >> "$temp_file"

# Replace the original file with the temporary file
mv "$temp_file" "$file"

# Update xcode project build number
PROJECT=./ios/jnotes.xcodeproj/project.pbxproj
sed -i '' -e 's/CURRENT_PROJECT_VERSION \= [^\;]*\;/CURRENT_PROJECT_VERSION = '$LATEST_BUILD';/' $PROJECT
build_number=`sed -n '/CURRENT_PROJECT_VERSION/{s/CURRENT_PROJECT_VERSION = //;s/;//;s/^[[:space:]]*//;p;q;}' $PROJECT`

announceBig "Setup script done"
