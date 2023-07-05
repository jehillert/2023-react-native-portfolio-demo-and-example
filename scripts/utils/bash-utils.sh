#!/bin/bash

BLACK="\e[30m"
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
MAGENTA="\e[35m"
CYAN="\e[36m"
LIGHT_Gray="\e[37m"
GRAY="\e[90m"
LIGHT_Red="\e[91m"
LIGHT_Green="\e[92m"
LIGHT_Yellow="\e[93m"
LIGHT_Blue="\e[94m"
LIGHT_Magenta="\e[95m"
LIGHT_Cyan="\e[96m"
WHITE="\e[97m"
COLOR_OFF="\e[0m"

BOLD_BLACK="\e[1;${BLACK}m"
BOLD_RED="\e[1;${RED}m"
BOLD_GREEN="\e[1;${GREEN}m"
BOLD_YELLOW="\e[1;${YELLOW}m"
BOLD_BLUE="\e[1;${BLUE}m"
BOLD_MAGENTA="\e[1;${MAGENTA}m"
BOLD_CYAN="\e[1;${CYAN}m"
BOLD_LIGHT_Gray="\e[1;${LIGHT_Gray}m"
BOLD_GRAY="\e[1;${GRAY}m"

say()
{
  echo "${BOLD_YELLOW}\n🔸 $1${COLOR_OFF}"
}

printDivider()
{
  printf %"$COLUMNS"s |tr " " "•"
}

sayDone()
{
  echo "${BOLD_BLUE}🔹 done${COLOR_OFF}"
}

announceBig()
{
  echo "${BOLD_RED}"
  printDivider
  echo "${BOLD_WHITE}🔸🔸🔸 $1 🔸🔸🔸${BOLD_RED}"
  printDivider
  echo "${COLOR_OFF}"
}