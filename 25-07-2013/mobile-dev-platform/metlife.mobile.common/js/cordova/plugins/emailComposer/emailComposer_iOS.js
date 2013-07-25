/**
 * ComposeResultType javascript object to identify the type of response sent by
 * the email plugin callback
 */
var composeResultType = {
	Cancelled : 0,
	Saved : 1,
	Sent : 2,
	Failed : 3,
	NotSent : 4
};
define(function() {
       var emailComposer = {
       /**
        * Description: Function call to the iPhone email plugin.
        * Contains a set of attributes which are parameters that have to be sent in the
        * mail. Multiple values can be given in a comma separated format. Last argument
        * is for images to be attached. It will contain comma separated string with the
        * fullpath of the temporary location where the images have been stored within
        * the applications sandbox.
        */
       showEmailComposer : function(subject, body,
	                                    toRecipients, ccRecipients, bccRecipients, bIsHTML, imageAttachments,imageNames,successForEmail,failForEmail) {
	              
	       /**
	        * Logic: Callback function which tells the result of the execution of email plugin.
	        * This function is assigned to be a callback function from the
	        * implementation (.m) of the email plugin
	        */
	       if(!successForEmail){
	    	   successForEmail = function(res) {
	    		   console.log("Plugin Result: "+res);
	       };
	       }
	       //This is the failure callback function
	       if(!failForEmail){
	    	   failForEmail = function(error) {
	    		   console.log("Plugin error: "+error);
	       };
	       }
        console.log(imageAttachments);
	       // invoking the showEmailComposer of the plugin
       cordova.exec(successForEmail, failForEmail,"Emailcomposer","showEmailComposer", [subject, body,
                                toRecipients, ccRecipients, bccRecipients, bIsHTML, imageAttachments,imageNames]);
	      }
     };
     return emailComposer;
   });
