define(['mustache', 'i18n!../../../../../metlife.mobile.common/nls/home', 'text!../../../../../metlife.mobile.common/templates/page/home.mustache'], function(mustache, language, masterContentTemplate) {
    return {
        page: null,        
        model : null,
        /**
        @Description: function returns updated language model. It covers following scenarios:
            Scenario 1: Application running very first time and local storage is empty.
            > this function returns default language model returned by i18n library
            Scenario 2: default locale is changed.
            > function reads local storage to get updated language model based on user selection.
        @return {JSON Object} i.e. language model.
        */
        getModel : function()
        {            
            var locale = metlife.utils.getStoreItemByKey("metlife.locale.model", true);
            if (locale == null)
                return language.model;
            else
                return locale;
        },
        init: function(page) {
            this.page = page;            
            this.model = this.getModel();            
            this.page.html(mustache.to_html(masterContentTemplate, this.model));
        },
        render: function() {
            /*TODO*/
        },
        destroy: function() {
                this.page.empty().remove();
                this.page = null;
        }
    };
});
