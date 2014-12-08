var express = require('express'),
h5bp = require('h5bp');

var app = express();
var port = 3001;
app.use(h5bp({ root: __dirname + '/public' }));

// in order to serve files, you should add the two following middlewares
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

app.get('/en', function(req, res) {
  res.sendfile(__dirname + '/public/index-en.html');
});

/* app.get('/vwf-ometa', function(req, res) {
  res.sendfile(__dirname + '/public/vwf-ometa.html');
});
*/
app.get('/vwf-ometa', function(req, res) {
  res.redirect('projects/en/vwf-ometa');
});

app.listen(port);
console.log('Krestianstvo Web server is started on port: '+ port);


///redirection from old site paths http://www.krestianstvo.org/web/
