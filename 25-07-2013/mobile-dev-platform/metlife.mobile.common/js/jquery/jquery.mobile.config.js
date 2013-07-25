define(function(){
    $(document).bind("mobileinit", function()
    {
        $.extend($.mobile, { defaultPageTransition : "none" }); // TODO: Need to verify it's necessity 
		$.mobile.transitionFallbacks.slide = 'none';
        $.mobile.pageLoadErrorMessage = false;
        $.mobile.loadingMessage = false;
    });
});