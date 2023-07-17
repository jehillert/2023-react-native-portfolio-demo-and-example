# Welcome
Chances are you have come to this repository by way of my resume.  That's great.  What you should know is this project represents my skills as a mobile developer in July of 2023. By reviewing these files, you should get a sense of at least the following:
- my proficiency with React Native, typescript, redux state management and the react ecosystem;
- my coding style and adoption of best practices;
- my aptitude for making native configurations and integrating 3rd party services;
- a working knowledge of mobile devops and deployment.

Please note, I have left the git history intact only to show that this project is 100% my original work. However, it is not repreresentative of how I approach version control in a team environment.  Which is to say, my commits here are a mess, but my habit is to leave short concise commit messages and follow the procedures and practices for merging code set forth by the team.

Please also note, I have not included a license with this repository.  Neither my making this material publically available, nor using it as an employment demo, constitutes or should be construed as a waiver of my intellectual property rights with respect to same. Prospective employers have my permission to clone and review this material solely for the purpose of evaluating my qualifications as a candidate for positions of employment in the area of software development.

# Highlights
The following is a non-exhaustive list of features, technologies and 3rd party integrations used in this project:
- Redux and redux-toolkit: thunk-slice-selector architecture with normalized data types (via redux-toolkit's createEntityAdapter);
- State persistance using MMKV (prod) and asyncStorage (for dev), redux and redux-persist;
- CodePush integration for over-the-air updates;
- Sentry crashalytics integration;
- Use of react-native-config for managing environment variables across the project;
- Bitrise CI/CD deployment chain (bitrise.yaml). Pipeline currently builds, tests and deploys to both Google Play and Apple App Store platforms (currently just the internal testing stage);
- Firebase Cloud Messaging for push notifications;
- Use of webviews (react-native-webview) for viewing the Privacy Policy and Terms of Service; for implementating a rich text notes editor; and for globally highlighting text in rich text and html documents;
- App navigation via React Navigation's native stack navigator component;
- The app is configured for debugging using React-native-debugger and Reactotron;
- Svg icon support via react-native-svg;
- Custom svg icons via react-native-svg-transformer;
- Configured for testing using Jest and react-native-testing-library.  All major integrations have been successfully mocked (testing not blocked).  However, please note so far there is only one test, and an issue mocking sentry, which wraps the whole app.
- Deep linking and ability to receive urls, text and files from other apps using the share sheet (react-native-receive-sharing-intent);
