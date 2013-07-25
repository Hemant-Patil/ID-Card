define(['mustache', 'text!../../../../../metlife.mobile.common/templates/page/navigation.mustache'], function(mustache, masterTemplate) {
	return {
		page: null,

		init: function(page) {
			this.page = page;
			this.page.html(mustache.to_html(masterTemplate, {
				header: {
                    title: 'Settings',
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
					},
					{
						id: 'signOut',
						title: 'Sign Out',
						class: 'button right'
					}]
				},

                subHeader: {
                    title: 'Change Language'
                },
                navigation: [{
                    title: 'English',
                    href: '#',
                    language : 'en'
                }, {
                    title: 'Spanish',
                    href: '#',
                    language : 'es'
                }, {
                    title: 'Koren',
                    href: '#',
                    language : 'kr'
                }]
            }));

            /**
            @description
                Attches click event to elements having class named "lacales".
                Each of these elements represents unique language i.e. es(spanish), en(english) etc.
                The value (i.e. locale code) of selected element is stored in local storage with the key as "metlife.locale".
            */
            $('.locales', this.page).live('click', function(e){
                e.preventDefault();
                var locale = $(this).attr('data-lang');
                metlife.utils.store("metlife.locale", locale, false);
                $.mobile.changePage("index.html", {
                     transition: "slide"
                });
            });
        },

        render: function() {
            /* TODO */
        },

        destroy: function() {
                this.page.empty().remove();
                this.page = null;
        }
    };
});
