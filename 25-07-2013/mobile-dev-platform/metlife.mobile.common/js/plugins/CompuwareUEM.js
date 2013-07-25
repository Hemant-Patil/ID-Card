//
//  CompuwareUEM.js
//
//
// These materials contain confidential information and
// trade secrets of Compuware Corporation. You shall
// maintain the materials as confidential and shall not
// disclose its contents to any third party except as may
// be required by law or regulation. Use, disclosure,
// or reproduction is prohibited without the prior express
// written permission of Compuware Corporation.
//
// All Compuware products listed within the materials are
// trademarks of Compuware Corporation. All other company
// or product names are trademarks of their respective owners.
//
// Copyright (c) 2011-2012 Compuware Corporation. All rights reserved.
//
//

/*global Cordova */
var CompuwareUEM= function() {
}

CompuwareUEM.prototype.setLogging = function(setting, onSuccess, onFail) {
	// Catch all exceptions to make sure that we don't crash the app
	try {
		cordova.exec(onSuccess, onFail, 'CompuwareUEMCommand', 'setLogging', [ setting ]);
	} catch (e) {
		// Don't log in case we inadvertently trigger another exception
	}

	return;
};

CompuwareUEM.prototype.startUp = function(accountName, applicationId, groupId, wrate, num, onSuccess, onFail)
{
    try {
        var args = {};
        args.accountName = accountName;
        args.applicationId = applicationId;
        args.groupId = groupId;
        args.wrate = wrate;
        args.num = num;
        
        return cordova.exec(onSuccess, onFail, "CompuwareUEMCommand", "startUp", [args]);
    }
    
    catch(e) {
    	// Don't log in case we inadvertently trigger another exception
    }
}

CompuwareUEM.prototype.nameEvent = function(eventName, onSuccess, onFail)
{
    try {
        var args = {};
        args.eventName = eventName;
        return cordova.exec(onSuccess, onFail, "CompuwareUEMCommand", "nameEvent", [args]);
    }
    
    catch(e) {
    	// Don't log in case we inadvertently trigger another exception
    }
}

CompuwareUEM.prototype.startInterval = function(eventName, onSuccess, onFail)
{
    try {
        var args = {};
        args.eventName = eventName;
        return cordova.exec(onSuccess, onFail, "CompuwareUEMCommand", "startInterval", [args]);
    }
    
    catch(e) {
    	//alert(e);
    	// Don't log in case we inadvertently trigger another exception
    }
}

CompuwareUEM.prototype.endInterval = function(eventName, onSuccess, onFail)
{
    try {
        var args = {};
        args.eventName = eventName;
        
        return cordova.exec(onSuccess, onFail, "CompuwareUEMCommand", "endInterval", [args]);
    }
    
    catch(e) {
    	// Don't log in case we inadvertently trigger another exception
    }
}

CompuwareUEM.prototype.customValue = function(eventName, eventValue, onSuccess, onFail)
{
    try {
        var args = {};
        args.eventName = eventName;
        args.eventValue = eventValue;
        
        return cordova.exec(onSuccess, onFail, "CompuwareUEMCommand", "customValue", [args]);
    }
    
    catch(e) {
    	// Don't log in case we inadvertently trigger another exception
    }
}

window.CompuwareUEM = new CompuwareUEM();


