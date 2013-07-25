define(function(){
    var validators = {
		/**
		 * Function Name: isStringNullOrBlank
		 * @description : Function returns true is string is null or blank
		 * @param : string which needs to be checked for null value
		 * @return : Boolean value
		 */
		isStringNullOrBlank : function(str){
			if(str && str!=undefined && str!=''){
				return false;
			}
			return true;
		},

		/**
		* Function Name: isDecimal
		* @description : This function will validate if the passed argument contains decimal values
		* @param : Input number which is to be checked
		* @return : Boolean value
		 **/
		isDecimal : function(value) {
			var regExDecimal = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
			return (regExDecimal.test(value));
		},

		/**
		* Function Name: isNumeric
		* @description : This function will validate if the passed argument contains numeric values
		* @param : Input number which is to be checked
		* @return : Boolean value
		**/
		isNumeric : function(value) {
			var regExNumber = /^\d+$/;
			return (regExNumber.test(value));
		},

		/**
		 * Function Name: isString
		 * @description :  This function will validate if the passed argument contains valid string and return false if string contains any special characters or digits.
		 * @param : String which needs to be checked 
		 * @return : Boolean value
		 **/
		isString : function(value) {
			var regExValidName = /^[a-zA-Z.'\s]*$/;
			return (regExValidName.test(value));
		},

		/**
		* Function Name: isAlphaNumericWithoutSpecialChar
		* @description : This function will validate if the passed argument contains valid alpha numeric value without special characters
		* @param : String which needs to be checked 
		* @return : Boolean value
    	**/
		isAlphaNumericWithoutSpecialChar : function(value) {
			var regExAlphaNumericWithoutSpecialChar = /^[a-zA-Z\d ]+$/;
			return (regExAlphaNumericWithoutSpecialChar.test(value));
		},

		/**
		* Function Name: validateEmail
		* @description :  Function to validate string as valid email address
		* @param : String containing email address
		* @return : Boolean value
		*/
		validateEmail : function(value) {
			var regExValidEmailAddress = /^[a-zA-Z0-9._^&*()\\+><]+([a-zA-Z0-9])@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,10})$/;
			return regExValidEmailAddress.test(value);
		},

		/**
		 * Function name: isStringWithMultipleSpace
		 * @description : This function takes the string value as the paramter and returns false if the string contains any special characters or digits or spaces in the beginning or end. It allows string with multiple spaces.
		 * @param : String which needs to be checked 
		 * @return : Boolean value
		 */
		 isStringWithMultipleSpace : function(value) {
			var regExCharWithSpace = /^[a-zA-z ]*(\[a-zA-z \]+)?$/;
			if (!regExCharWithSpace.test(value) || this.isStringNullOrBlank(value)) {
				return false;
			}
			return !(" " === value.charAt(0) || " " === value.charAt(value.length - 1));
		},

		/**
		 * 
		 * Function name: isPositiveNumber
		 * @description :  This function will validate if the passed argument contains positive numbers only.
		 * @param : String which needs to be checked 
		 * @return : Boolean value
		 */
		isPositiveNumber : function(sValue) {
			return (!isNaN(sValue) && sValue > 0);
		},

		/**
		 * Function name: isValidZipCode
		 * @description : This function is used to validate the zipcode.
		 * @param : zipcode: Parameter to be validated
		 * @param : minLen: minimum length of the parameter
		 * @param : maxLen: maximum length of the parameter
		 * @return : Boolean value
		 */
		isValidZipCode : function(zipCode, minLen, maxLen) {
			var zipCodeLen, regExValidZipCode;
			zipCodeLen = zipCode.length;
			regExValidZipCode = /^[0-9]+$/;
			if (!regExValidZipCode.test(zipCode) || !(zipCodeLen<=maxLen && zipCodeLen>=minLen)) {
				return false;
			}
			return true;
		},

		/**
		 * Function name: validateCreditCardNumber
		 * @description : This function takes the type of account,creditcard number as the paramter and returns true or false based on the validity of the card.
		 * @param : Account type can be one of the following values "001" : VISA, "002" : Master , "003" : Amex, "004" : Discover
		 * @param : 16 digit credit card number to check
		 * @return : Boolean value
		 */
		validateCardNumber : function(acctyp, creditCardNumber) {
		
				var regExIsVisaCard = /^4[0-9]{12}(?:[0-9]{3})?$/;
				var regExIsMasterCard = /^5[1-5][0-9]{14}$/;
				var regExIsAmex = /^3[47][0-9]{13}$/;
				var regExDiscover = /(^6(?:011|5[0-9]{2})[0-9]{12})|(^64[4-9][0-9]{13})|(((^62212[6-9])|(^6221[3-9][0-9])|(^622[2-8][0-9]{2})|(^6229[0-1][0-9])|(^62292[0-5]))[0-9]{10})$/;
				creditCardNumber = creditCardNumber.replace(/\s/g,'');
				if (acctyp == "001") {
					return regExIsVisaCard.test(creditCardNumber);
				}
				if (acctyp == "002") {
					return regExIsMasterCard.test(creditCardNumber);
				}
				if (acctyp == "003") {
					return regExIsAmex.test(creditCardNumber);
				}
				if (acctyp == "004") {
					return regExDiscover.test(creditCardNumber);
				}
				else {
					return false;
				}
		},

		/**
		* Function name: validatePhoneNumber
		* @description : This function takes the phone number as the paramter and returns boolean value of true or false based on is the phone number is a valid phone number.
		* @param : Phone number to be checked
		* @param : Length that can be considered for a valid Phone number
		* @return : Boolean value
		 */
		validatePhoneNumber : function(phoneNumber, phoneNumberLength) {
			var regExValidPhone, i;
			regExValidPhone = /^[0-9]+$/;
			if (this.isStringNullOrBlank(phoneNumber)) {
				return false;
			}
			if (phoneNumber.indexOf("+") === 0) {
					phoneNumber = phoneNumber.replace(/\+/g, "");
			}
			for (i = 0; i < phoneNumber.length; i += 1) {
				if (phoneNumber.indexOf(".") !== -1) {
					phoneNumber = phoneNumber.replace(/\./g, "");
				}
				if (phoneNumber.indexOf("-") !== -1) {
					phoneNumber = phoneNumber.replace(/\-/g, "");
				}
				if (phoneNumber.indexOf(" ") !== -1) {
					phoneNumber = phoneNumber.replace("/\ /g", "");
				}
				if (phoneNumber.indexOf("(") !== -1) {
					phoneNumber = phoneNumber.replace(/\(/g, "");
				}
				if (phoneNumber.indexOf(")") !== -1) {
					phoneNumber = phoneNumber.replace(/\)/g, "");
				}
				if (phoneNumber.indexOf("%20") !== -1) {
					phoneNumber = phoneNumber.replace(/\%20/g, "");
				}
			}
			if (!regExValidPhone.test(phoneNumber)) {
				return false;
			}
			return phoneNumber.length === phoneNumberLength;
		},

		/**
		 * Function name: validateYear
		 * @description : This function takes the year as the paramter and returns boolean value of true or false based on if the year is valid 
		 * @param : Year that is to be checked 
		 * @return : Boolean value
		 */
		validateYear : function(year) {
			if (this.isStringNullOrBlank(year) || !this.isNumeric(year) || year.length !== 4) {
				return false;
			}
			return true;
		},

		/**
		 * Function name: validateAlphanumeric
		 * @description : This function takes the value as the paramter and returns boolean value of true or false based on is the value valid
		 * @param : String which needs to be checked 
		 * @return : Boolean value
		 */
		validateAlphanumeric : function(value) {
			if (!this.isAlphaNumericWithoutSpecialChar(value)) {
				return false;
			}
			return !(" " === value.charAt(0) || " " === value.charAt(value.length - 1));
		},

		/**
		 * Function name: validateLicencePlate
		 * @description : This function takes the licence plate number as the paramter and returns boolean value of true or false based on is the  number is a valid licence plate number 
		 * @param : String which needs to be checked 
		 * @return : Boolean value
		 */
		validateLicencePlate : function(licencePlateNumber) {
			var regExValidLicencePlate = /^[\w\.(\)\[\]{}\-]+( [\w\.(\)\[\]{}\-]+)*$/;
			return regExValidLicencePlate.test(licencePlateNumber);
		},

		/**
	   	 * Function name: isValidPolicy
		 * @description : This function validates policy number.
		 * @param : String which needs to be checked 
		 * @param : Minimum length for a valid policy
		 * @param : Maximum length for a valid policy
		 * @returns : Boolean value
		 */
		isValidPolicy : function(policyNum, minLen, maxLen) {
			var regExValidPolicyNo, policyNumLen;
			regExValidPolicyNo = /^[A-Za-z0-9]$/;
			policyNumLen = policyNum.length;
			console.log(regExValidPolicyNo.test(policyNum));
			console.log(policyNumLen);
			if(!regExValidPolicyNo.test(policyNum) || !(policyNumLen<=maxLen && policyNumLen>=minLen)){
				return false;
			}
			return true;
		},

		/**
		 * Function name: removeCharHavingAsciiGreaterThan127 
		 * @description : This function has to be called on keyUp event. This function takes the field id as the paramter. If ascii value of char is greater than 127 will be replaced by "".
		 * @param : String input field ID which is to be validated.
		 * @returns : String without ascii characters greater than 127
		 */
		removeCharHavingAsciiGreaterThan127 : function(fieldIDStr) {
			var str, i, finalStr, tempArr, n, asciiVal;
			str = $("#" + fieldIDStr).val();
			tempArr = new Array();
			for (i = 0; i < str.length; i += 1) {
				n = str.charAt(i);
				asciiVal = n.charCodeAt(0);
				if (asciiVal < 127) {
					tempArr.push(n);
				}
			}
			finalStr = tempArr.join("");
			($("#" + fieldIDStr)).val(finalStr);
			return finalStr;
		},

		/**
		 * Function name: compareString.
		 * @description : This function takes two input string to be compared. 
		 * @param : String inputs which is to be compared. 
		 * @returns : Result indicating which string is greater than which string.
		 */
		compareString : function(str1, str2) {
			if (!this.isStringNullOrBlank(str1) && !this.isStringNullOrBlank(str2)) {
				str1 = str1.toUpperCase();
				str2 = str2.toUpperCase();
				if (str1 > str2) {
					return "String 1 is greater than String 2";
				} 
				else if (str2 > str1) {
					return "String 2 is greater than String 1";
				} 
				else
				{
					return "String 1 is equal to String 2";
				}
			}
			return "Input string is Invalid";
		},

		/**Function Name:isFutureDate
		 * @description : This function accespts date,month and year selected by the user as accident date (in integer format i.e if you get the string then parse that string to int and then pass to this function). This function returns false if  the user selected  date using a date picker is greater than the current date.
		 * @params : Year, Month, Day, Hour, Minutes, AM/PM as inputs for the function separately
		 * @returns : Boolean value
		 */
		isFutureDate : function(year, month, day, hour, min, amPm) {
			var todaysDate;
			todaysDate = new Date();
			if ("PM" === amPm) 
				hour = parseInt(hour) + 12;
			if(month > 12 || day > 31 || hour >24 || min > 60)
			{	
				console.log(year+":"+month+":"+day+":"+hour+":"+min+":" );
				alert("Invalid Input parameters of Date for Future date comparison");
				return false;
			}
			else
			{
				inputDate = new Date(year, month-1, day, hour, min);
				console.log(inputDate);
				if(inputDate>todaysDate)
					return true;
				else
					return false;
			}	
		},
		
		/**Function Name:calculateAge
		 * @description : This function calculates & returns the current age from given DOB.
		 * @param DOB - date. Birthdate should be in MM/DD/YYYY Format 
		 * @returns age - number or String incase of invalid date
		 */
		calculateAge : function(strDateOfBirth) {
			var age, m, today, birthDate;
			today = new Date();
			if (strDateOfBirth.indexOf("-") !== -1) {
				strDateOfBirth = strDateOfBirth.replace(/\-/g, "/");
			}
			if(!this.isValidDate(strDateOfBirth)){
				return "Invalid Date";
			}
			birthDate = new Date(strDateOfBirth);
			var milliDifference = today.getTime() - birthDate.getTime();
			age = (Math.floor(milliDifference/31557600000));
			return age;
		},

		/**Function Name:isFutureYear
		 * @description : This function takes date value and validate that year should not be greater than current year
		 * @param date - object
		 * @returns boolean
		 */
		isFutureYear : function(strDate) {
			var completeDate, objDate, currDate;
			completeDate = strDate;
				if (strDate.indexOf("-") !== -1) {
					completeDate = strDate.replace(/\-/g, "/");
				}
				if(!this.isValidDate(completeDate)){
					return false;
				}
				objDate = new Date(completeDate);
				currDate = new Date();
				var futureBool = (objDate.getTime() > currDate.getTime());
				if (futureBool) {
					return true;
				}
				return false;
			
		},

		/**Function Name:compareDates
		 * @description :  This function takes two dates and compare if one is grater than other. Response says whether first date is lesser than second date. Note that past & future dates naming are arbitrary and do not logically apply in the code snippet below
		 * @param1 date - string
		 * @param2 date - string
		 * @return : String indicating which date is greater than which string
		 */
		compareDates : function(strPastDate, strFutureDate) {
			var objPastDate, objFutureDate;
			try {
				if (strPastDate.indexOf("-") !== -1) {
					strPastDate = strPastDate.replace(/\-/g, "/");
				}
				if (strFutureDate.indexOf("-") !== -1) {
					strFutureDate = strFutureDate.replace(/\-/g, "/");
				}
				if(!this.isValidDate(strPastDate) || !this.isValidDate(strFutureDate)){
					return "Invalid Date";
				}
				pastDateObj = new Date(strPastDate); 
				futureDateObj = new Date(strFutureDate);
				objPastTime = pastDateObj.getTime();
				objFutureTime = futureDateObj.getTime();

				if (objPastTime < objFutureTime) {
					return "Date1 is greater than Date2";
				}
				else if (objPastTime > objFutureTime) {
					return "Date2 is greater than Date1";
				}
				else 
				{
					return "Date1 is equal to Date2";
				}
			} catch (e) {
				return e;
			}
		},

		/**Function Name:isValidDate
		 * @description : This function checks if the date input is of valid format. Expected input date is of mm/dd/yyyy format
		 * @param date - string
		 * @return : Boolean Value
		 */
		isValidDate : function(strDate) {
		  var datePart = strDate.split('/');
		  var d = new Date(datePart[2], datePart[0] - 1, datePart[1]);
		  return d && (d.getMonth() + 1) == datePart[0] 
			&& d.getDate() == Number(datePart[1]) 
			&& d.getFullYear() == Number(datePart[2]);
		}
	};
	return validators;
});
