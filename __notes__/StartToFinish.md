
README:
Maybe as a separate repository, this file will do all the steps from start to finish (Valid as of June 2023)
Have people install VS Code extension that lets shell commands be run from markdown.  And they can use it to work their way through this.

Privacy Policy
Follow recommendations here:

Privacy Policy Service

## Sign up for Bitrise account

## Sign up for Google Developer Account

## Sign up for Google Cloud Platform

## Sign up for Google Merchant Account (if selling apps)

## Upload App bundle to Google Play Store
[instructions](https://reactnative.dev/docs/signed-apk-android)

## Sign up for Apple Developer Account

## Deploy to App Store Connect

## Deploy to Google Play
### [Generate App bundle locally](https://reactnative.dev/docs/signed-apk-android)
```shell
# go to where java is stored needs to be moved further above for bitrise
cd C:\Program Files\Java\jdkx.x.x_x\bin
# run this command
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

```
#### command:
  `npx react-native build-android --mode=release`
#### test locally
  npm run android -- --mode="release"

#### location of bundle:
  `android/app/build/outputs/bundle/release/app-release.aab`


https://orangesoft.co/blog/how-to-publish-an-android-app-on-google-play-store