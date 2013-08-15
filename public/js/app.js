var App = Ember.Application.create({
    templatePath: '/js/views/',
    resolver: Ember.DefaultResolver.extend({
        resolveTemplate: function (parsedName) {
            var template = this._super(parsedName),
                templateName = parsedName.fullNameWithoutType.replace(/\./g, '/');

            if (!template) {
                $.ajax({
                    url: App.templatePath + templateName + '.html', // + '?boom=' + (new Date).getTime(),
                    async: false,
                    success: function (response) {
                        template = Ember.Handlebars.compile(response);
                    }
                });
            }

            return template;
        }
    })
});

App.Router.reopen({
    location: 'history'
});

App.Router.map(function() {
    this.route('about', { path: '/about' });
});

App.IndexRoute = Ember.Route.extend({
    model: function () {
        return [{
            route: '/about',
            caption: 'About'
        }];
    }
});
