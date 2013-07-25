define(function(){
    var utils = {
        /**
           @description stores content into local storage.
           @param Key {String} Key is the reference point to recognize items from local storage.
           @param Val {String or Object} val any data either object or string to be stored into local storage
           @param isObject {Boolean} true or false indicating type of val to be stored. Val of type object will
                    be stored in string format with the help of JSON.stringify(val).
        */
        store : function(key, val, isObject)
        {
            if (isObject) {
                localStorage.setItem(key, JSON.stringify(val));
            } else {
                localStorage.setItem(key, val);
            }
        },
        /**
           @description read item/content from store i.e. local storage based on unique key
           @param Key {String} Key is the reference point to recognize items from local storage.
           @param isObject {Object} true or flase indicating type of data to be retrieved. data with type "object", will be
                                    converted from JSON string to JSON Object.
           @return {String/Object}
        */
        getStoreItemByKey : function(key, isObject)
        {
            if(isObject){
            	if(localStorage.getItem(key))
                	return JSON.parse(localStorage.getItem(key));
                else 
                	return null;
			}
            else
                return localStorage.getItem(key);
        },
        /**
        	@description remove content into local storage.
        	@param Key {String} Key is the reference point to recognize items from local storage.
         */
        removeStoreItemByKey : function(key, isObject)
        {
        	if(isObject)
        	{
        		var count=0;
        		for (count=0; count<key.length; count++){
        			localStorage.removeItem(key[count]);
        		}
        	}
        	else
        	{
        		localStorage.removeItem(key);
        	}
        },
        /**
	        Function Name : isNetworkDown
         	@description  use Cordova "Connection" API to to determine if network is down.
         	@description  If API is not available, assume network is up.
         	@return {boolean}
         */
        isNetworkDown : function () {
            // assume network is up unless proven otherwise
            var isNetworkDown = false;
            if (navigator.network) {
                var networkState = navigator.network.connection.type;
                if (metlife.platform.name=="android") {
                    // Note: Android Connection.UNKNOWN in Cordova 1.7 can result in false-alarms
                    if (networkState == Connection.NONE) {
                        isNetworkDown = true;
                    }
                } else {
                    if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
                        isNetworkDown = true;
                    }
                }
            }
            return isNetworkDown;
        },
        
        /**
        Function Name : confirmDialog
     	@description  This function is used to display the confirm box on the screen.
     	@param : message : Message that needs to be displayed.
     	@param : header : Header of the alert box.
     	@param : buttonNames: buttons that need to displayed on the screen as string.
         */
        confirmDialog: function(message,header,buttonNames,callback){
        	if("android"!=metlife.platform.name){
        		var buttons=buttonNames.split(",");
        		buttonNames=buttons[1]+","+buttons[0];
        	}
        	navigator.notification.confirm(message, callback , header, buttonNames);
        },
        /**
        Function Name : alertDialog
     	@description  This function is used to display the alert box on the screen.
     	@param : message : Message that needs to be displayed.
     	@param : header : Header of the alert box.
     	@param : buttonNames: button that need to displayed on the screen.
         */
        alertDialog :function(message,header,buttonNames){
        	if(! metlife.platform.isDesktop)
        		navigator.notification.alert(message, null, header, buttonNames);
        	else
        		alert(message, null, header, buttonNames);
        },
        
		
		/**
		Function Name: swapButtons
    	 * @description : Method replaces the order of buttons appearing in the cordova alert as per OS type.
		 * @return {string}
    	 */
        swapButtons: function(button){
        	if("android"!=metlife.platform.name) return button;
        	if('2'==button) 
        		return '1';
        	else
        		return '2';
        },
        /**
        Function Name : checkForSpecialCharacters
        @description This function is used to validate if the given string contains 
        special characters which are not allowed. 
        @param: value: is the string which we need to test for special characters.
        @return true/false
         */
        checkForSpecialCharacters : function(value) {
            var regExAlphaNumericWithoutSpecialChar = /^[a-zA-Z\d\.\_ ]+$/;
            return (regExAlphaNumericWithoutSpecialChar.test(value));
        }, 
        
        /**
        Function Name : showSpinner
        @description This function is used to display the spinner on the page util 
        the backend process is in progress.  
        @param: div: it takes the div into which the spinner needs to be displayed.
         */
        showSpinner: function(div){
        	div.append('<div id="loading" class="block"><div class="loader"></div></div>');
        	div.trigger('create');
        },
        
        /**
        Function Name : removeSpinner
        @description This function is used to remove the spinner on the page once the 
        backend process is completed and the application is read with the data.
         */
        removeSpinner: function(){
        	 $('#loading').remove();
        },
        
        /**
        Function Name: kmtomiles
        @description: This function is used to convert km into miles.
        @param: array: value in km.
        */
        kmtomiles: function(km){
        	var CONVERSION_CONSTANT = 1.60934;
        	var miles = km/CONVERSION_CONSTANT;
        	return miles;
        },
        
        /**  
        Function Name: milestokm
        @description: This function is used to convert miles into km.
        @param: array: value in miles.
        */
        milestokm: function(miles){
        	var CONVERSION_CONSTANT = 1.60934;
            var km = CONVERSION_CONSTANT * miles;
            return km;
        },
		
		 /**
         Function name : adjustHeader
         @description This function is used to align back sign Out buttons
         when header size increase for Muliline header
         */
        
        adjustHeader: function(page){
          	var headerHeight = $('header',page)[0].clientHeight;
            var buttonHeight = $('a.back').height();
            var difference = (headerHeight - buttonHeight)/2;
            $('a.button').css('margin-top',difference + 'px');
       }
    };
    return utils;
});