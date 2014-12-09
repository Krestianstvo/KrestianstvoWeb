var express = require('express'),
morgan = require('morgan'),
h5bp = require('h5bp');


var app = express();
var port = 3001;
app.use(h5bp({ root: __dirname + '/public' }));

// in order to serve files, you should add the two following middlewares
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'));

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

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.redirect('404.html');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


app.listen(port);
console.log('Krestianstvo Web server is started on port: '+ port);


///redirection from old site paths http://www.krestianstvo.org/web/
