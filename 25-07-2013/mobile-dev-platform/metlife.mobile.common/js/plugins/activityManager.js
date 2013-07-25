/**
 * This file communicates with ActivityManager.java *  
 */
define(function(){	//
	// -----------------------------------------------------------------------------------
    // Public variables
    // -----------------------------------------------------------------------------------
	return {
		/* Function Name: minimize
		 *  Logic: 	Responsible for pushing current activity in background.
		 * 			Presents Home screen once application is minimised.Call to the function of email plugin when the email contains image attachments.
		 *  Parameters:
		 *  successCallback: Success callback function
		 *  errorCallback: Failure callback function
		 */		
		minimize : function(successCallback, errorCallback) {		
			cordova.exec(null, null, "ActivityManager", "minimize",[]);
		}
	}; 
});