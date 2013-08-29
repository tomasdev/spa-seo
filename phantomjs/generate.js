console.log('Loading a web page');
var page = require('webpage').create(),
    fs = require('fs'),
    system = require('system'),
    url = system.args[1],
    route = system.args[2] || '';

page.open('http://' + url + '/' + route, function (status) {
    if (status !== 'success') {
        console.error('Unable to access network');
    } else {
        fs.write(fs.workingDirectory + '/static/' + (route || 'index') + '.html', page.content, 'w');
        console.log('Done @ ' + fs.workingDirectory + '/static/' + (route||'index') + '.html');
    }
    phantom.exit();
});
