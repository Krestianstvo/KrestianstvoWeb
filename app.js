var express = require('express'),
    h5bp = require('h5bp');

var app = express();
app.use(h5bp({ root: __dirname + '/public' }));

// in order to serve files, you should add the two following middlewares
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.listen(3000);
