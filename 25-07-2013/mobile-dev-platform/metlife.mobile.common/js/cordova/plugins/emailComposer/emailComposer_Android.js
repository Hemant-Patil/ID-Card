define(function() {
	var EmailComposer = {

		// Action defined to be used in all of the plugin calls.
		ACTION_SEND : "android.intent.action.SEND",

		/** Function Name: sendEmail
		 *  Logic: Call to the function of email plugin when the email contains image attachments.
		 *  The arguments are:
		 *  params: Javascript object which contains all headers like Subject, To, Text, etc. 
		 *  Will also have 'path' object containing locations of saved image which are to be attached.
		 *  success: Success callback function
		 *  fail: Failure callback function
		 *  The exec function called belongs to cordova. 
		 *  Third last argument in exec function: Name of plugin to be called.
		 *  Second last argument in exec function: Name of action to identify the function that should be called.
		 */
		sendEmail : function(params, success, fail) {
			return cordova.exec(function(args) {
				success(args);
			}, function(args) {
				fail(args);
			}, 'EmailComposer', 'sendEmailWithAttachments', [ params ]);
		},

		/** Function Name: sendNonEnglishEmail
		 *  Logic: Call to the function of email plugin when the text content contains language other than English.
		 *  The arguments are:
		 *  params: Javascript object which contains all headers like Subject, To, Text, etc. 
		 *  success: Success callback function
		 *  fail: Failure callback function
		 *  The exec function called belongs to cordova. 
		 *  Third last argument in exec function: Name of plugin to be called.
		 *  Second last argument in exec function: Name of action to identify the function that should be called.
		 */
		sendNonEnglishEmail : function(params, success, fail) {
			return cordova.exec(function(args) {
				success(args);
			}, function(args) {
				fail(args);
			}, 'EmailComposer', 'sendNonEnglishEmail', [ params ]);
		}

	};
	return EmailComposer;
});
