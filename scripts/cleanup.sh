#!/bin/bash
set -e
set -o pipefail
set -x

file="android/app/src/main/assets/appcenter-config.json"

temp_file="appcenter-config-temp.json"

# Copy original line 1 to temp file
head -n 1 "$file" > "$temp_file"

# Write new line 2 to temp file
echo '  "app_secret": "APPCENTER_APP_SECRET_ANDROID"' >> "$temp_file"

# Skip lines 1-2 and append rest of original file
tail -n +3 "$file" >> "$temp_file"

mv "$temp_file" "$file"