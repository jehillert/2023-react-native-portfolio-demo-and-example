#!/bin/zsh
##############################################
# What this script does:
#   • DELETE watchmen
#   • CLEAN temp files
#   • DELETE cached native android deps
#   • CLEAN android files
#   • DELETE node_modules
#   • DELETE yarn-lock.json
#   • DELETE package-lock.json
#   • INSTALL node_modules
#   • RUN gradlew tasks
#   • RUN gradlew tasks
##############################################

# OPTIONS
BUILD_AFTER_CLEANING=false

# CONFIGURATION
PACKAGE_MANAGER="yarn"
ANDROID_BUILD_COMMAND="run:android:dev"
CACHE_TO_DELETE=("haste-*" "metro-*" "yarn-*" "react-*")
# PROJECT_ROOT=$HOME/dev/Arches.DMG-Pro.Mobile-App

BOLD_BLACK="\033[1;90m"      # Black
BOLD_RED="\033[1;91m"        # Red
BOLD_GREEN="\033[1;92m"      # Green
BOLD_YELLOW="\033[1;93m"     # Yellow
BOLD_BLUE="\033[1;94m"       # Blue
BOLD_PURPLE="\033[1;95m"     # Purple
BOLD_CYAN="\033[1;96m"       # Cyan
BOLD_WHITE="\033[1;97m"      # White
COLOR_OFF="\033[0m"

say()
{
  echo "$BOLD_YELLOW\n🔸 $1$COLOR_OFF"
}

printDivider()
{
  printf %"$COLUMNS"s |tr " " "•"
}

sayDone()
{
  echo "$BOLD_BLUE🔹 done$COLOR_OFF"
}

announceBig()
{
  echo "$BOLD_RED"
  printDivider
  echo "$BOLD_WHITE🔸🔸🔸 $1 🔸🔸🔸$BOLD_RED"
  printDivider
  echo "$COLOR_OFF"
}

# EXECUTION
announceBig "RUNNING CLEANING SCRIPT"
# cd "${PROJECT_ROOT}"

say "Deleting watchmen..."
watchman watch-del-all
sayDone

say "Cleaning temporary files..."
for i in $CACHE_TO_DELETE; do
    echo "   Deleting $BOLD_PURPLE\$TMPDIR/$i$COLOR_OFF"
    rm -rf $TMPDIR/$i
done
sayDone

say "Removing node_modules folder..."
rm -rf node_modules
sayDone

if [[ $PACKAGE_MANAGER == "yarn" ]]; then
  say "Deleting yarn-lock file..."
  rm -f yarn-lock.json
fi

if [[ $PACKAGE_MANAGER == "npm" ]]; then
  say "Deleting package-lock file..."
  rm -f package-lock.json
fi
sayDone

say "Installing node modules..."
$PACKAGE_MANAGER install
sayDone

say "Deleting gradle caches..."
cd android && rm -rf ~/.gradle/caches && cd ..
sayDone

say "Cleaning Android files..."
cd android && ./gradlew clean && cd ..
sayDone

say "Running gradle tasks..."
cd android && \
   ./gradlew tasks && \
   cd ..
sayDone

if [ $BUILD_AFTER_CLEANING = true ] ; then
  say "Building android app"
  $PACKAGE_MANAGER $ANDROID_BUILD_COMMAND
fi

announceBig "ALL DONE!!!"
