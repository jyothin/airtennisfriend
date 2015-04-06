Author: Jyothin Madari (jyothin.madari.nabla@gmail.com)
For license, distribution, usage, and everything else: Contact Sisir Jonna (sisirjonna@gmail.com)

Build Instructions:

  Required:
    - Cordova build environment
      $> npm install cordova

  Cordova Platforms Required:
    - android 3.6.4
      $> cd airtennisfriend
      $> cordova platform add android
      $> cordova platform update android

  Cordova Plugins Required:
    - org.apache.cordova.device
    - org.apache.cordova.camera
    - org.apache.cordova.dialogs
    - org.apache.cordova.vibration
    - org.apache.cordova.geolocation
      $> cordova plugin add <plugin>
    - com.parse.cordova.core.pushplugin
      $> cordova plugin add https://github.com/benjie/phonegap-parse-plugin

  Cordova Build:
    $> cordova build

  Cordova clean
    $> ./cleanup

  For debugging in browser:
    - Set DEBUG=true in init.js
    - Comment cordova.js script tag in *.html files
    - Set href="#settings-view" and href="#filter-view" in index.html icon pull right
    - Comment out initializeParsePlugin in index.js
    - Open index.html in browser

  For Android:
    - Set DEBUG=false in init.js
    - Uncomment cordova.js script tag in *.html files
    - Set href="" and href="" in index.html icon pull right
    - Uncomment out initializeParsePlugin in index.js
    - Attach device (or run on emulator)
    - cordova run android --verbose
      OR
      adb install -r platforms/android/ant-build/Cordova-debug.apk
    - adb logcat *:S AndroidRuntime:* CordovaApp:* CordovaActivity:* CordovaLog:*

Release Notes:

  Version 0.0.1:
    Change log:
      - Initial release
    Known Issues:

  Version 0.0.2:
    Change log:
      - Upgraded to parse-1.4.0 JS SDK
      - Upgraded to 3.0.0 handlebars.js
      - Upgraded to ratchet 2.0.2
      - Using local version of jquery.mobile.min.js
      - Using local version of jquery.mobile.min.css
      - Using new ajax_loader.gif image file
      - Showing 'username' instead of 'name' in list of players and details profile view
      - Removed separate 'Profile' object and storing all user data in the Parse.User object itself

