define(['../views/pages/home', '../views/pages/navigation', '../views/pages/content'], function(home, navigation, content) {
	return {
		views: {
			home: null,
			navigation: null,
			content: null
		},
		initHome: function(page) {
			var self = this;
			this.views.home = Object.create(home);
			this.views.home.init(page);
		},
		destroyHome: function(){
			this.views.home.destroy();
		},
		initNavigation: function(page) {
			var self = this;
			this.views.navigation = Object.create(navigation);
			this.views.navigation.init(page);
		},
		destroyNavigation: function(){
			this.views.navigation.destroy();
		},
		initContent: function(page) {
			var self = this;
			this.views.content = Object.create(content);
			this.views.content.init(page);
		},
		destroyContent: function(){
			this.views.content.destroy();
		}
	};
});
