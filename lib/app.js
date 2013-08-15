var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;


app.configure(function () {
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.engine('html', require('hbs').__express);
    app.use(express.static(__dirname + '/../public'));
});

app.get('/:url?', function (req, res, next) {
    res.render('index', {
        title: 'something'
    });
});

app.listen(port);
console.info('App running on port ' + 3000);