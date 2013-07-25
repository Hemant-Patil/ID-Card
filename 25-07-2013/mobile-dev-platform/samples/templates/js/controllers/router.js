define(function() {
    return {
        controllers: {
                pages: null
        },
        init: function() {
            var self = this;

            /* --------------------------------------------------------------------------------------
             * pagebeforechange event validates the locale and updating the same based on the
             * user selected locale and at the same time storing the locale model/resource bundle in
             * localstorage which further can be used by respective views in order to render mustache.
             *
             * --- TODO -----------------------------------------------------------------------------
             *
             * Issue #1: Handle requirejs cache issues.
             * Description : functionality is inconsistent at this moment due to caching issue.
             * Swithcing of language works fine till both "enloader" and "esloader" plugins are not cached. once these plugins
             * are cached, requirejs returns last used language model everytime.
             * Also, sometimes "es" language model gets returned when on selection of "en" locale.
             * --------------------------------------------------------------------------------------
             * Note: we are working on it.
             * */
            $(document).bind("pagebeforechange", function(event, data) {
                if (typeof data.toPage === 'string')
                {
                    var locale = metlife.utils.getStoreItemByKey("metlife.locale", false);
                    if(null !== locale)
                    {
                        config.locale = locale;
                        require.config(config);
                        require([locale + 'loader'], function(lang){

                           console.log("Storing '"+ locale +"' Model :" + lang.footer.action);
                           // Storing language model object to localstorage in string format.
                           metlife.utils.store("metlife.locale.model", lang, true);
                        });
                    }
                 }
            });

            $("#home-page").live('pagecreate', function(event, ui) {
                var page = $(this);
                require(['./controllers/pages'], function(pages){
                    if (!self.controllers.pages) {
                            self.controllers.pages = Object.create(pages);
                    }
                    self.controllers.pages.initHome(page);
                });
            });

            $("#home-page").live('pagehide', function() {
                self.controllers.pages.destroyHome();
            });

            $("#navigation-page").live('pagecreate', function(event, ui) {
                var page = $(this);
                require(['./controllers/pages'], function(pages){
                    if (!self.controllers.pages) {
                            self.controllers.pages = Object.create(pages);
                    }
                    self.controllers.pages.initNavigation(page);
                });
            });

	      $('#navigation-page').live('pageshow', function(event, ui) { /* TODO */ });


            $("#navigation-page").live('pagehide', function() {
                    self.controllers.pages.destroyNavigation();
            });

            $("#content-page").live('pagecreate', function(event, ui) {
                var page = $(this);
                require(['./controllers/pages'], function(pages){
                    if (!self.controllers.pages) {
                            self.controllers.pages = Object.create(pages);
                    }
                    self.controllers.pages.initContent(page);
                });
            });

$('#content-page').live('pageshow', function(event, ui) { /* TODO */ });


            $("#content-page").live('pagehide', function() {
                 self.controllers.pages.destroyContent();
            });
        }
    };
});
