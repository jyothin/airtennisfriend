#!/usr/bin/bash
cp -v platforms/android/assets/www/cordova.js www/
cp -v platforms/android/assets/www/cordova_plugins.js www/
mkdir -p www/plugins/org.apache.cordova.device/www/
cp -v platforms/android/assets/www/plugins/org.apache.cordova.device/www/device.js www/plugins/org.apache.cordova.device/www
mkdir -p www/plugins/org.apache.cordova.dialogs/www/
cp -v platforms/android/assets/www/plugins/org.apache.cordova.dialogs/www/notification.js www/plugins/org.apache.cordova.dialogs/www
mkdir -p www/plugins/org.apache.cordova.dialogs/www/android/
cp -v platforms/android/assets/www/plugins/org.apache.cordova.dialogs/www/android/notification.js www/plugins/org.apache.cordova.dialogs/www/android
mkdir -p www/plugins/org.apache.cordova.vibration/www
cp -v platforms/android/assets/www/plugins/org.apache.cordova.vibration/www/vibration.js www/plugins/org.apache.cordova.vibration/www/
