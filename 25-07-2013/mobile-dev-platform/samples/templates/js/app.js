var config = {
    paths: {
        text: '../../../metlife.mobile.common/js/require/plugins/text',
        i18n: '../../../metlife.mobile.common/js/require/plugins/i18n',
        jquerymobile: '../../../metlife.mobile.common/js/jquery.mobile.custom.min',
        mustache: '../../../metlife.mobile.common/js/mustache',
        router: 'controllers/router',
        langLoader: '../../../metlife.mobile.common/js/plugins/langLoader',
        enloader: '../../../metlife.mobile.common/js/plugins/langLoader',
        esloader: '../../../metlife.mobile.common/js/plugins/langLoader',
        utils : '../../../metlife.mobile.common/js/plugins/utils'
    }
};
require.config(config);

require(['utils', 'router'], function(utils, router) {
    $(function() {
        var app = {
            router: null,
            init: function() {

                /**
                @Description: gloabl namespace
                */
                window.metlife = window.metlife || {
                    //referece of utils object. Helps to avoid explicit declaration of the utils across
                    //the application.
                    utils: utils
                };

                this.router = Object.create(router);
                this.router.init(this);
            }
        };
        app.init();
        require(['jquerymobile']);
    });
});
