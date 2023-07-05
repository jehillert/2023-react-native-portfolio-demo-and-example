#!/bin/zsh

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
