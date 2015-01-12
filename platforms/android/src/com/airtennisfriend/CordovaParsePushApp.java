package com.airtennisfriend;

import android.app.Application;
import android.content.Context;

import com.parse.Parse;
import com.parse.ParseInstallation;
import com.parse.PushService;

import com.airtennisfriend.CordovaApp;

public class CordovaParsePushApp extends Application 
{
    private static String PARSE_APP_ID = "HVv6n4HRoWZliaTWXkmcs3t8qkCAW1gGCkqg1onI";
    private static String PARSE_CLIENT_KEY = "uNqt68PLNSg0SZZdTyOtzYrSKKzKvA0X8YSvzxGU";

    private static CordovaParsePushApp instance = new CordovaParsePushApp();

    public CordovaParsePushApp() 
    {
        instance = this;
    }

    public static Context getContext() 
    {
        return instance;
    }

    @Override
    public void onCreate()
    {
        super.onCreate();
        //super.init();
        // Set by <content src="index.html" /> in config.xml
        //loadUrl(launchUrl);

        Parse.initialize(this, PARSE_APP_ID, PARSE_CLIENT_KEY);
        PushService.setDefaultPushCallback(this, CordovaApp.class);
        ParseInstallation.getCurrentInstallation().saveInBackground();
    }
}
