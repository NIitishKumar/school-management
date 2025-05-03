# Android Build Guide for BDS App

## Prerequisites

- Node.js and npm installed
- Expo CLI installed
- EAS CLI installed (version 16.3.3 detected)
- Expo account (logged in)

## Build Configuration

The app has been configured with:

1. Tab navigation for all user roles (Admin, Teacher, Parent, Student)
2. Android package name: `com.nitish7010.bds`
3. EAS build profile for APK generation

## Building an Android APK

Follow these steps to build an Android APK:

### 1. Make sure you're logged in to your Expo account

```bash
npx eas-cli login
```

### 2. Build the APK

Run the following command to build an Android APK:

```bash
npx eas-cli build --platform android --profile apk
```

This will:
- Use the "apk" build profile defined in your eas.json
- Generate an APK file (not an AAB)
- Upload the build to EAS Build servers

### 3. Download the APK

Once the build is complete:
- You'll receive a URL to download the APK
- You can also find it in your Expo dashboard

### 4. Install on Android Device

To install the APK on your Android device:
1. Transfer the APK to your device
2. Enable "Install from Unknown Sources" in your device settings
3. Open the APK file on your device to install

## Troubleshooting

If you encounter any issues:

1. Check your eas.json configuration
2. Ensure all dependencies are installed (`npm install`)
3. Verify your Expo account has access to build services
4. Check the EAS CLI version with `npx eas-cli --version`
5. Upgrade EAS CLI if needed with `npm install -g eas-cli`

> Note: The current guide was created with EAS CLI version 16.3.3. The latest version (16.4.0) may have additional features and fixes.

### Gradle Version Compatibility Issues

If you encounter the following error:

```
Failed to apply plugin class 'org.gradle.toolchains.foojay.FoojayToolchainsPlugin'.
> FoojayToolchainsPlugin needs Gradle version 7.6 or higher
```

This indicates a Gradle version compatibility issue. The project is using Gradle 7.5.1, but the FoojayToolchainsPlugin requires Gradle 7.6 or higher. To resolve this:

#### Option 1: Update Gradle Version

1. Locate the `gradle-wrapper.properties` file in your project (typically in `android/gradle/wrapper/`)
2. Update the `distributionUrl` property to use Gradle 7.6 or higher:
   ```
   distributionUrl=https\://services.gradle.org/distributions/gradle-7.6-all.zip
   ```
3. Run the build command again

#### Option 2: Disable the Foojay Plugin

If you cannot update Gradle for compatibility reasons:

1. Locate the settings file mentioned in the error (in this case, `node_modules/@react-native/gradle-plugin/settings.gradle.kts`)
2. Comment out or remove the line that applies the Foojay plugin
3. Run the build command again

## Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Android App Signing](https://docs.expo.dev/app-signing/app-credentials/)
- [EAS CLI Reference](https://docs.expo.dev/eas-cli/commands/)