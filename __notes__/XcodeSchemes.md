scheme
- collection of targets to build
- configuration to use when building
- collection of tests to execute

in this repe, start with:
- development build
- staging build
- production build

Product → Manage Scheme → Create Schemes Now

"Release"
- automatically disable the in-app Developer menu
- bundle the JavaScript locally (for testing real device free from computer)

REMEMBER
e-enable ATS prior to building your app for production by
- removing the localhost entry from the NSExceptionDomains dictionary; and
- setting NSAllowsArbitraryLoads to false in your Info.plist file in the ios/ folder.

TO DO
// ADD THIS TO BUILD PHASE SCRIPT TO SAVE TIME
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi