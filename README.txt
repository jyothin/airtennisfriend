Author: Jyothin Madari (madari.jyothin@gmail.com)
For license, distribution and usage: Contact Sisir Jonna (sisirjonna@gmail.com)

Build Instructions:

  Required:
    - Cordova build environment

  Cordova Platforms Required:
    - android 3.6.4

  Cordova Plugins Required:
    - org.apache.cordova.camera
    - org.apache.cordova.device
    - org.apache.cordova.dialogs
    - org.apache.cordova.vibration
    - org.apache.cordova.geolocation
    - com.parse.cordova.core.pushplugin 0.1.0 "phonegap-parse-plugin"

  For debugging in browser:
    - Set DEBUG=true in init.js
    - Comment cordova.js script tag in *.html files
    - Set href="#settings-view" and href="#filter-view"

  For Android:
    - Set DEBUG=false in init.js
    - Uncomment cordova.js script tag in *.html files
    - Set href="" and href=""
    - cordova run android --verbose
    - adb logcat *:S AndroidRuntime:* CordovaApp:* CordovaActivity:* CordovaLog:*

Release Notes:

  Version 0.0.1:
    Change log:
      - Initial release
    Known Issues:

