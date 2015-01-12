/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.airtennisfriend;

import android.os.Bundle;
import org.apache.cordova.*;

import com.parse.Parse;
import com.parse.ParseAnalytics;

public class CordovaApp extends CordovaActivity
{
    private static String PARSE_APP_ID = "HVv6n4HRoWZliaTWXkmcs3t8qkCAW1gGCkqg1onI";
    private static String PARSE_CLIENT_KEY = "uNqt68PLNSg0SZZdTyOtzYrSKKzKvA0X8YSvzxGU";

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);

        Parse.initialize(this, PARSE_APP_ID, PARSE_CLIENT_KEY);
        ParseAnalytics.trackAppOpened(getIntent());
    }
}
