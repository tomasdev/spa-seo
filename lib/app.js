var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    path = require('path'),
    staticFolder = path.resolve(__dirname + '/../static');


app.configure(function () {
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.engine('html', require('hbs').__express);
    app.use(express.static(__dirname + '/../public'));
    app.locals.title = 'Spazio';
});

// TODO: Moar complex examples. Perhaps using redis and some data.
app.get('/api/v1/:resource', function (req, res, next) {
    res.send(200, {
        status: 'ok',
        data: []
    });
});

app.get(/^(.*)$/, function (req, res, next) {
    var fragment = req.query['_escaped_fragment_'];
    if (fragment) {
        // TODO: generate with PhantomJS the static content under /static/
        if (fragment === '/') {
            fragment = '/index';
        }
        res.sendfile(staticFolder + fragment + '.html');
    } else {
        res.render('index', {
            url: req.params[0]
        });
    }
});

app.listen(port);
console.info('App running on port ' + 3000);