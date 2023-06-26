#!/bin/bash

# Setup
set -e
set -o pipefail
set -x

# Get Latest Build Number
echo "$LATEST_BUILD"
INCREMENTED_BUILD_NUMBER=$(($LATEST_BUILD+1))
echo "$INCREMENTED_BUILD_NUMBER"
envman add --key LATEST_BUILD --value "$INCREMENTED_BUILD_NUMBER"

# Define the file path
file=".bitrise.secrets.yml"

# Create a temporary file
temp_file=".bitrise.secrets_temp.yml"

# Read the first line from the original file and write it to the temporary file
head -n 1 "$file" > "$temp_file"

# Write the new line to the temporary file
echo "  - LATEST_BUILD: $INCREMENTED_BUILD_NUMBER" >> "$temp_file"

# Skip the first two lines and append the remaining lines from the original file to the temporary file
tail -n +3 "$file" >> "$temp_file"

# Replace the original file with the temporary file
mv "$temp_file" "$file"