# Features & Integrations
- Universal links (to open the app, test here [text](https://))
- Push notifications
- redux state management (local storage, mmkv, with redux-persist)
- react-native-pell-rich-editor
- react navigation
- CSS-in-JS styling
- Bitrise
  - CI/CD Pipeline
  - integration tests
  - end-to-end tests
  - Apple App Store & Google Play Store deployment
- light/dark mode
- testing
  - mock dependencies where needed.
- TODO: Sentry crash reporting
- TODO:mixpanel analytics
- TODO: developoment, testing, production environments

# Codebase Reminders

## [REACT-NATIVE-VECTOR-ICONS](https://github.com/oblador/react-native-vector-icons#upgrading)
> Upgrading this package often requires the font files linked to your projects to be updated as well. If the automatic linking works for you, running this again should update the fonts. Otherwise you need to follow the steps outlined in the installation section.

## [JEST MOCKS](https://jestjs.io/docs/manual-mocks)

### Mocking Node Modules
- Mocks of node modules should be placed in the __mocks__ directory adjacent to node_modules
- Automatically mocked. There's no need to explicitly call jest.mock('module_name')
  - FOR THIS TO WORK, THE EXACT NAME OF THE DEPENDENCY IN NODE_MODULES HAS TO BE USED.
  - For nested dependencies, recreate the folder structure leading to the module.
  - Otherwise, the mock needs to be referenced in `setupFiles[]` or `setupFilesAfterEnv[]` in `jest.config.js`.

### Mocking Built-in Node Modules
- explicitly call (e.g. `jest.mock('path')`, `jest.mock('fs')`) is required, because build-in modules are not mocked by default.

###  Manual Mocks
- Manual mocks are defined by writing a module in a __mocks__/ subdirectory immediately adjacent to the module

# § Setting Up
Untracked files to add locally:

## Add appcenter-config.json file
```shell
# Create appcenter-config.json at `android/app/src/main/assets/appcenter-config.json`
{
  "app_secret": "APPCENTER_APP_SECRET_ANDROID"
}


```

## Enabling Reactotron
```shell
  # 0 - set REACTOTRON_ENABLED in src/AppConfig to true
  # 1 - Open Reactotron
  # 2 - start metro server (if not already)
  # 3 - run android or ios device
  # 4 - run the following ADB command:
  adb reverse tcp:9090 tcp:9090
  # 5 - Force close and repoen the app.
```

# § Bitrise
```shell
jnotes
cd android && ./gradlew bundleRelease && cd ..
```

# § CodePush

```shell
# IOS - Release an update using the "release-react" command:
appcenter codepush release-react -a jehillert/jnoter -d Staging

```
```shell
# ANDROID - Release an update using the "release-react" command:
appcenter codepush release-react -a jehillert/jnotes -d Staging
```
```shell
# Set the app to deploy
appcenter apps set-current jehillert/__app-name__
```

```shell
# View CodePush Deployment Keys
appcenter codepush deployment list --app -k
```

## iOS Code Signing Key Generation
```shell
# generate private RSA key and write it to private.pem file
cd path/to/save/location
openssl genrsa -out private.pem
```

```shell
# export public key from private.pem into public.pem
cd path/to/save/location
openssl rsa -pubout -in private.pem -out public.pem
```
