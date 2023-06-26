#!/bin/bash
PROJECT=./ios/jnotes.xcodeproj/project.pbxproj
sed -i '' -e 's/CURRENT_PROJECT_VERSION \= [^\;]*\;/CURRENT_PROJECT_VERSION = '$LATEST_BUILD';/' $PROJECT
build_number=`sed -n '/CURRENT_PROJECT_VERSION/{s/CURRENT_PROJECT_VERSION = //;s/;//;s/^[[:space:]]*//;p;q;}' $PROJECT`