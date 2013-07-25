define('sessionManager', function(){
    // -----------------------------------------------------------------------------------
    // Private variables
    // -----------------------------------------------------------------------------------

    var isIdle = false, // flag to indicate if user is idle        
        sessionID = -1, // Session ID        
        enabled   = false, // timer status. enabled or not
        handlers  = {},   // timeout event handlers
        duration  = 10000; // the amount of time (ms) before the user is considered idle


    // -----------------------------------------------------------------------------------
    // private methods/interface
    // -----------------------------------------------------------------------------------
    function handleUserEvent()
    {
        //reset existing timeout
        clearTimeout(sessionID);

        if(enabled)
        {
            if(isIdle){
                console.log('Expired Session ID: ' + sessionID);
                toggleIdleState();
            }

            //set new timeout
            sessionID = setTimeout(toggleIdleState, duration);
            //console.log('Renewed Session ID : ' + sessionID);
        }
    }

    function toggleIdleState()
    {
        console.log("toggle state");
    	//toggles idle state
        isIdle = !isIdle;
        if(isIdle)
        {
            destroy();
            // invoke event
            fire(isIdle ? "idle" : "active");
            unsubscribe(isIdle ? "idle" : "active");
        }
    }

    /*
     * Fires an event with the given name, calling all of its subscribers.
     * @param {String} eventType The type of event to fire.
     */
    function fire(event)
    {   
        var subscribers = handlers[event];
        console.log('Call back fired. ' + subscribers.length );
        if(subscribers)
        {
            for (var i=0, len = subscribers.length; i < len; i++){
                subscribers[i].method.call(subscribers[i].scope);
            }
        }
    }

     /**
     * Stops the idle timer. This removes appropriate event handlers
     * and cancels any pending timeouts.
     * @return {void}
     * @method stop
     */
    function destroy()
    {
         //set to disabled
            enabled  = false;

            // status false to begin with
            clearTimeout(sessionID);

            // detach the event handlers
            var body = document.body;
            if (body.removeEventListener){
                body.removeEventListener("mousemove", handleUserEvent, false);
                body.removeEventListener("keydown", handleUserEvent, false);
            } else {
                body.detachEvent("onmousemove", handleUserEvent);
                body.detachEvent("onkeydown", handleUserEvent);
            }
    }

    /**
      * Removes an event handler for the given event.
      * @param {String} eventType The type of event to unsubscribe from.
      * @param {Function} method The function that was registered to the event.
      * @return {void}
      * @method subscribe
      */
    function unsubscribe(event, method)
    {
        // ignores, if the event has no subscribers
        if(!handlers[event])
            return;

        // if method or event handler not present remove all
        if(!method)
        {
            delete handlers[event];
            return;
        }

        // find the method
        var i = 0;
        subscribers = handlers[event],
        length = subscribers.length,
        found = false;

        while(i < length & !found)
        {
            if(subscribers[i].method === method)
                found = true;
            else
                i++;
        }

        // if it present, remove it
        if(found)
            subscribers.splice(i, 1);
    }

    // -----------------------------------------------------------------------------------
    // Public methods/interface
    // -----------------------------------------------------------------------------------

    /**
    *	Common interface that detects whether session is timed out
    **/
    return {
        // -----------------------------------------------------------------------------------
        // Basic interface
        // -----------------------------------------------------------------------------------
        
        /**
             *	check status of timer. its running or not
             * 	@return Boolean true if timer is running, false if not.
             *  @function isRunning
             */
        isRunning : function (){
            return enabled;
        },

        /**
             *	Indicates if user is idle or not
             * 	@return Boolean true if user is idle, false if not.
             *  @function isSessionExpired
             */
        isSessionExpired : function (){
            return isIdle;
        },
        
        /**
             *
             * 	@return {Boolean} true if timer is running, false if not.
             *  @function create
             */
        create : function (options){            
            console.log("************in create");
        	//set to enabled
            enabled  = true;

            // status false to begin with
            isIdle = false;

            //assign application specific timeout duration
            if("number" === typeof options)
            {
               // timeout = duration;
            }

            // assign event handlers
            var body = document.body;
            if (body.addEventListener){
                body.addEventListener("mousemove", handleUserEvent, false);
                body.addEventListener("keydown", handleUserEvent, false);
            } else {
                body.attachEvent("onmousemove", handleUserEvent);
                body.attachEvent("onkeydown", handleUserEvent);
            }

            if(options){
            	duration = options.timeOut;
            }
            // set a timeout to toggle state
            sessionID = setTimeout(toggleIdleState, duration);
            console.log('Initial Session ID :' + sessionID);
        },

       
        destroy : function()
        {
        	isIdle = false;
            toggleIdleState();
        },

        /*
         * Call back on destroy
         */
        onDestroy : null,
        
        /**
        * Assigns an event handler for the given event.
        * @param {String} eventType The type of event to subscribe to.
        * @param {Function} method The function to call when the event occurs.
        * @param {Object} scope (Optional) The scope in which to execute the function.
        * @return {void}
        * @method subscribe
        */
        subscribe : function(event, method, scope)
        {
            // create if handlers array if not present;
            if(!handlers[event])
                handlers[event] = [];

            //register handler
            handlers[event].push({
                method: method,
                scope: scope || window
            });
        },

        unsubscribe : function(event, method)
        {
            this.unsubscribe(event, method);
        }
    }   
});