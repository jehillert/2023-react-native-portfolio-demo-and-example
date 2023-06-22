
README:
Maybe as a separate repository, this file will do all the steps from start to finish (Valid as of June 2023)
Have people install VS Code extension that lets shell commands be run from markdown.  And they can use it to work their way through this.

Privacy Policy
Follow recommendations here:

Privacy Policy Service

## Sign up for Bitrise account

## Sign up for Google Developer Account

## Sign up for Google Cloud Platform

## Set up Automatic Code Signing for google play

## Sign up for Google Merchant Account (if selling apps)

## Upload App bundle to Google Play Store
[instructions](https://reactnative.dev/docs/signed-apk-android)

## Sign up for Apple Developer Account

## Deploy to App Store Connect

## Deploy to Google Play (for the first time)
### [Generate App bundle locally](https://reactnative.dev/docs/signed-apk-android)
Note the difference with the instructions (🔥)
```Gradle
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(project.env.get("MYAPP_UPLOAD_STORE_FILE"))
                storePassword project.env.get("MYAPP_UPLOAD_STORE_PASSWORD")
                keyAlias project.env.get("MYAPP_UPLOAD_KEY_ALIAS")
                keyPassword project.env.get("MYAPP_UPLOAD_KEY_PASSWORD")
            }
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.debug // <== 🔥 signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }

```
To keep these values out of git, React Native website says to create `gradle.properties` in `~/.gradle/gradle.properties`.
🔥 Note, they are referring to your MacOS user folder (home folder), not a folder in the project.
🔥 Also add 'app/' in front of my-upload-key.keystore
🔥 I'm not sure you can get react-native-config to work in this case. Or it will if the npx bundle lease command worked.
MYAPP_UPLOAD_STORE_FILE=app/my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-upload-key
MYAPP_UPLOAD_STORE_PASSWORD=************
MYAPP_UPLOAD_KEY_PASSWORD=************

Upload the first AAB or APK manually to Google Play using the Google Play Console.

Link your Google Play Developer Console to an API project.

Set up API Access Clients using a service account: Please note when you create your service account on the Google Developer Console, you have to choose json as Key Type.

Grant the necessary rights to the service account with your Google Play Console. Go to Settings, then Users & permissions, then Invite new user. Due to the way the Google Play Publisher API works, you have to grant at least the following permissions to the service account:

Access level: View app information.

Release management: Manage production releases, manage testing track releases.

Store presence: Edit store listing, pricing & distribution.

As an optional step, you can add translations to your Store Listing: Translate & localize your app.

Open your app on Bitrise.

Click the Workflows button on the main page.
Go to the Code Signing & Files tab and upload the service account JSON key into the GENERIC FILE STORAGE.


```shell
# go to where java is stored needs to be moved further above for bitrise
cd C:\Program Files\Java\jdkx.x.x_x\bin
# run this command
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

```
#### command:
```shell
# run in project root:
  npx react-native build-android --mode=release
# Actually, that does not seem to work.  Instead try:
  cd android && ./gradlew bundleRelease
```
#### test locally
  npm run android -- --mode="release"

#### location of bundle:
  `android/app/build/outputs/bundle/release/app-release.aab`


https://orangesoft.co/blog/how-to-publish-an-android-app-on-google-play-store