#!/bin/bash
find . -name \*.pyc -delete -print
find . -name \*.*~ -delete -print
find . -name tags -delete -print

find ./www/ -name "cordova.js" -print -exec rm -fi {} \;
find ./www/ -name "cordova_plugins.js" -print -exec rm -fi {} \;
find ./www/ -name "device.js" -print -exec rm -fi {} \;
find ./www/ -name "notification.js" -print -exec rm -fi {} \;
find ./www/ -name "vibration.js" -print -exec rm -fi {} \;
find ./www/ -type d -name "plugins" -print -exec rm -ri {} \;

./platforms/android/cordova/clean

