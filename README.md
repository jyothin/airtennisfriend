#AirTennisFriend
Find local tennis players to pair up with and play a game of tennis.

AirTennisFriend is an Android app that lets you find tennis
players local to your area with who you can pair up and schedule
a game.

##Contact:
* Author: Jyothin Madari (jyothin.madari@nabla-consulting.com)
* For license, distribution, usage, and everything else: Sisir Jonna (sisirjonna@gmail.com)

##Build Instructions
###Build Environment
`$> npm install cordova`

###Platforms Required
Android 3.6.4 OR Create a new app

* `$> cordova create airtennsifriend com.airtennisfriend.airtennisfriend "AirTennisFriend"`
* `$> cd airtennisfriend`
* `$> cordova platform add android`
* `$> cordova platform update android`

###Plugins Required
* org.apache.cordova.device
* org.apache.cordova.camera
* org.apache.cordova.dialogs
* org.apache.cordova.vibration
* org.apache.cordova.geolocation
  `$> cordova plugin add <plugin>`
* com.parse.cordova.core.pushpl ugin
  `$> cordova plugin add https://github.com/benjie/phonegap-parse-plugin`

###Build
`$> cordova build`

###Clean
`$> ./cleanup`

##For Debugging in Browser:
* Set DEBUG=true in `init.js`
* Comment `cordova.js` script tag in \*.html files
* Set `href="#settings-view"` and `href="#filter-view"` in `index.html` icon pull right
* Comment out `initializeParsePlugin` in `index.js`
* Open `index.html` in browser

##For Android:
* Set `DEBUG=false` in `init.js`
* Uncomment `cordova.js` script tag in \*.html files
* Set `href=""` and `href=""` in `index.html` icon pull right
* Uncomment out `initializeParsePlugin` in `index.js`
* Attach device (or run on emulator)
* `$> cordova run android --verbose` OR

  `adb install -r platforms/android/ant-build/Cordova-debug.apk`
* `adb logcat *:S AndroidRuntime:* CordovaApp:* CordovaActivity:* CordovaLog:*`

##Release Notes:

##Version 0.0.1:
* Change log:
  * Initial release
* Known Issues:

##Version 0.0.2:
* Change log:
  * Upgraded to parse-1.4.0 JS SDK
  * Upgraded to 3.0.0 handlebars.js
  * Upgraded to ratchet 2.0.2
  * Using local version of jquery.mobile.min.js
  * Using local version of jquery.mobile.min.css
  * Using new ajax\_loader.gif image file
  * Showing 'username' instead of 'name' in list of players and details profile view
  * Removed separate 'Profile' object and storing all user data in the Parse.User object itself
* Known Issues:

