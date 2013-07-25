package com.metlife.apps;

import org.apache.cordova.DroidGap;
import android.os.Bundle;
import com.metlifeapps.geb.R;

public class MainActivity extends DroidGap{
    /** Called when the activity is first created. */
	
	@Override
    public void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);
    	super.setIntegerProperty("loadUrlTimeoutValue", 90000);
		super.setIntegerProperty("splashscreen", R.drawable.sp_screen);
        super.loadUrl("file:///android_asset/www/index.html",  7000);
    }
    @Override
    public void onPause() {    	
		super.removeSplashScreen();
        super.onPause();
    }    
        
    @Override
    public void init(){
    	super.init();    	
    	/* Fix: cordova for Android does not accept the 9 key on some devices 2.x.x
    	 * For some reason cordova is calling setNavDump on the web view's WebSettings. 
    	 * setNavDump is an obsolete method according to the android docs so we can disable it.
    	 */
    	this.appView.getSettings().setNavDump(false);
    }    
	@Override
	public void onStop() {
		super.onStop();
	}
}