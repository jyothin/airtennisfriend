/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var iscroll;
var home_view;

var app = {
    // Application Constructor
    initialize: function() {
        home_view = new HomeView();
        this.bindEvents();
        if(DEBUG) {
            $('body').html(home_view.render().$el);
            app.receivedEvent('deviceready');
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('load', this.onLoad, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // load Event Handler
    onLoad: function() {
        console.log("onLoad"); 
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        $('body').html(home_view.render().$el);
        app.receivedEvent('deviceready');
        //home_view.setStateToReady();
    },
    // offline Event Handler
    onOffline: function() {
        console.log("onOffline"); 
    },
    // online Event Handler
    onLine: function() {
        console.log("onLine"); 
    },

    initializeParsePlugin: function() {
        parsePlugin.initialize(PARSE_APP_ID, PARSE_JS_KEY, function() {
            parsePlugin.subscribe('AirTennisFriend', function() {
                parsePlugin.getInstallationId(function(id) {

                    var install_data = {
                        installation_id: id,
                        channels: ['AirTennisFriend'],
                    }
                    var local_storage = app.getStorage('local');
                    local_storage.setItem('install_data', JSON.stringify(install_data));

                }, function(error) {
                    console.log(error);
                });
            }, function(error) {
                console.log(error);
            });
        }, function(error) {
            console.log(error);
        });
    },

    getGeoLocation: function() {
        var onSuccess = function(position) {
            console.log('Latitude: ' + position.coords.latitude);
            console.log('Longitude: ' + position.coords.longitude);
            console.log('Altitude: ' + position.coords.altitude);
            console.log('Accuracy: ' + position.coords.accuracy);
            console.log('Altitude Accuracy: ' + position.coords.altitudeAccuracy);
            console.log('Heading: ' + position.coords.heading);
            console.log('Speed: ' + position.coords.speed);
            console.log('Timestamp: ' + position.timestamp);

            var local_storage = app.getStorage('local');
            local_storage.setItem('geo_location', JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }));

        };

        var onError = function(error) {
            var location = {};

            //Returned when users do not allow the app to retrieve position information.
            //This is dependent on the platform.
            location[error.PERMISSION_DENIED]  = 'Permission denied';
            //Returned when the device is unable to retrieve a position.
            //In general, this means the device is not connected to a network or can't get a satellite fix.
            location[error.POSITION_UNAVAILABLE] = 'Position unavailable';
            //Returned when the device is unable to retrieve a position within the time specified by the
            //timeout included in geolocationOptions. When used with navigator.geolocation.watchPosition,
            //this error could be repeatedly passed to the geolocationError callback every timeout milliseconds.
            location[error.TIMEOUT] = 'Timeout';

            console.log('Error: ' + location[error.code] + ', ' + error.message);

            if(error.code === error.PERMISSION_DENIED) {
            } else if(error.code === error.POSITION_UNAVAILABLE) {
            } else if(error.code === error.TIMEOUT) {
            }

        };
    
        if(!DEBUG) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    
    },
    
    getPic: function(id) {
        if(!DEBUG) {
            var camera_popover_handle = navigator.camera.getPicture(function(image_data) {
                var image = document.getElementById(id);
                image.src = "data:image/jpeg;base64," + image_data;
                //image.src = image_uri;
                //console.log(image_uri);
            }, function(message) {
                nagivator.navigator.alert(message, function() {
                    console.log(message);
                });
            }, {
                quality: 100,
                destinationType: navigator.camera.DestinationType.DATA_URL, // <=> image_data
                //destinationType: navigator.camera.DestinationType.FILE_URL, // <=> image_uri
                //destinationType: navigator.camera.DestinationType.NATIVE_URL,

                //sourceType: navigator.camera.PictureSourcetype.PHOTOLIBRARY,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                //sourceType: navigator.camera.PictureSourcetype.SAVEDPHOTOALBUM,

                encodingType: navigator.camera.EncodingType.JPEG,
                //encodingType: navigator.camera.EncodingType.PNG,

                targetWidth: 100,
                targetHeight: 100,

                //Only works for PictureSourceType === PHOTOLIBRARY
                mediaType: navigator.camera.MediaType.PICTURE,
                //mediaType: navigator.camera.MediaType.VIDEO,
                //mediaType: navigator.camera.MediaType.ALLMEDIA,
                
                correctOrientation: true,

                saveToPhotoAlbum: false,

                //cameraDirection: navigator.camera.Direction.BACK,
                cameraDirection: navigator.camera.Direction.FRONT,
                
            });

        }
    },
    /* // Not supported in Android
    cleanupPics: function() {
        navigator.camera.cleanup(function() {
            console.log("Camera cleanup success."); 
        }, function(message) {
            console.log("Camera cleanup failed because: " + message);
        });
    },
    */
    getStorage: function(type) {
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            var storage = window[type + 'Storage'];
            if(!storage) {
                return null;
            } else {
                return storage;
            }
        } else {
            console.error("No Web Storage support!");
        }

    },

    checkConnection: function() {
        if(DEBUG) {
            return true;
        } else {
            var network_state = navigator.connection.type;

            var states = {};
            states[navigator.connection.UNKNOWN]  = 'Unknown connection';
            states[navigator.connection.ETHERNET] = 'Ethernet connection';
            states[navigator.connection.WIFI]     = 'WiFi connection';
            states[navigator.connection.CELL_2G]  = 'Cell 2G connection';
            states[navigator.connection.CELL_3G]  = 'Cell 3G connection';
            states[navigator.connection.CELL_4G]  = 'Cell 4G connection';
            states[navigator.connection.CELL]     = 'Cell generic connection';
            states[navigator.connection.NONE]     = 'No network connection';

            //alert('Connection type: ' + states[network_state]);
            /*navigator.notification.alert(states[network_state], function() {
              console.log('Network State Alert Dialog closed');
            }, 'Network State', 'Ok')*/
            console.log('Connection type: ' + network_state + ': '+ states[network_state]);

            if(network_state === navigator.connection.NONE) {
                navigator.notification.alert('Unable to access network, try again later', function() {
                    console.log('Network State Alert Dialog closed');
                });
                return false;
            }
            return true;
        }
    },

    deviceInfo: function() {
        if(!DEBUG) {
            console.log(device.cordova);
            console.log(device.model);
            console.log(device.platform);
            console.log(device.uuid);
            console.log(device.version);
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);

        //navigator.vibrate(500);

        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onLine, false);

        this.deviceInfo();
        this.checkConnection();
        this.getGeoLocation();

        touchScroll('content');

        this.initializeParsePlugin();
    },
};

app.initialize();

