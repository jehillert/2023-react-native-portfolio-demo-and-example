## README
React-native-config instructions are misleading. This "extra step" must be added immediately after line 1 of `android/app/build.gradle`:
```
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```
## IOS
| LANGUAGE        | INVOCATION                                                                                           |
|-----------------|------------------------------------------------------------------------------------------------------|
| objective-c (1) | `// import header`<br>`#import "RNCConfig.h"`<br>...<br>`// then read individual keys like:`<br>`NSString *apiUrl = [RNCConfig envFor:@"API_URL"];` |
| objective-c (2) | `// or just fetch the whole config`<br>`NSDictionary *config = [RNCConfig env];`|
| Info.plist      | `$(MY_ENV_VARIABLE)`|
<br>

## ANDROID
| LANGUAGE            | INVOCATION                         |
|---------------------|------------------------------------|
| Java                | `BuildConfig.MY_ENV_VARIABLE`        |
| Gradle              | `project.env.get("MY_ENV_VARIABLE")` |
| AndroidManifest.xml | `"@string/GOOGLE_MAPS_API_KEY"`      |

❗Be sure to correctly type the environment varialbes, e.g.: <br>
`versionCode project.env.get("VERSION_CODE").toInteger()`

---

### Java Example
```java
    public HttpURLConnection getApiClient() {
        URL url = new URL(BuildConfig.API_URL);
        // ...
    }
```
### Gradle Example
```gradle
    defaultConfig {
        applicationId project.env.get("APP_ID")
    }
```
### AndroidManifest.xml Example
```xml
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="@string/GOOGLE_MAPS_API_KEY" />
```
