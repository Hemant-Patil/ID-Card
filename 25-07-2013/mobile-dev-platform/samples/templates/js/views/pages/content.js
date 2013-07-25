define(['mustache', 'text!../../../../../metlife.mobile.common/templates/page/content.mustache'], function(mustache, masterTemplate) {
	return {
		page: null,

		init: function(page) {
			this.page = page;
			this.page.html(mustache.to_html(masterTemplate, {
				header: {
					title: 'Content Page',
					buttons: [{
						id: 'back',
						title: 'Back',
						href: 'index.html',
						class: 'button back',
						data: {
							transition: 'slide',
							direction: 'reverse',
							rel: 'back',
							ajax: true
						}
					}]
				},
				subHeader: {
					title: 'Content Title'
				}
			}));
		},

		render: function() {},

		destroy: function() {
			this.page.empty().remove();
			this.page = null;
		}
	};
});
