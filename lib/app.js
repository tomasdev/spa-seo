var express = require('express'),
    fs = require('fs'),
    app = express(),
    // port = process.env.PORT || 3000,
    port = 3004,
    path = require('path'),
    exec = require('child_process').exec,
    staticFolder = path.resolve(__dirname + '/../static'),
    PJSdir = path.resolve(__dirname + '/../phantomjs');


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
    var fragment = req.query['_escaped_fragment_'],
        htmlPath,
        renderer,
        file;

    if (fragment) {
        file = (fragment === '/' ? 'index' : fragment.substring(1));

        htmlPath = staticFolder + '/' + file + '.html';

        if (!fs.existsSync(htmlPath)) {
            fragment = (fragment === '/' ? '' : fragment);
            renderer = exec(
                PJSdir + '/phantomjs ' +
                PJSdir + '/generate.js ' +
                req.headers.host + ' ' + fragment,
            {
                cwd: __dirname + '/../',
            },
            function (error, stdout, stderr) {
                // console.log('stdout: ' + stdout);
                // console.log('stderr: ' + stderr);
                if (error !== null) {
                    res.send("error logged. " + Math.random());
                } else {
                    res.sendfile(htmlPath);
                }
            });
        } else {
            res.sendfile(htmlPath);
        }
    } else {
        res.render('index', {
            url: req.params[0]
        });
    }
});

app.listen(port);
console.info('App running on port ' + port);
