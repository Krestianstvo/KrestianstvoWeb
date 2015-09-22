var express = require('express'),
    compression = require('compression'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index'),
    morgan = require('morgan'),
    h5bp = require('h5bp');

var jsDAV = require("jsDAV/lib/DAV/server");
jsDAV.debugMode = true;
var jsDAV_Locks_Backend_FS  = require("jsDAV/lib/DAV/plugins/locks/fs");
var jsDAV_Auth_Backend_File = require("jsDAV/lib/DAV/plugins/auth/file");

var app = express();
var port = 3001;

app.use(h5bp({ root: __dirname + '/public' }));
app.use(compression());
app.use(serveStatic(__dirname + '/public'));
app.use(morgan('combined'));
app.use('/data', serveIndex('public/data', {'icons': true}))

/*=====Site specific paths=====*/

app.use(function (req, res, next) {
        if (req.url.search(/^\/webdav/) >= 0) {
          jsDAV.mount({
              node: __dirname + "/public",
              locksBackend: jsDAV_Locks_Backend_FS.new(__dirname + "/public"),
              authBackend:  jsDAV_Auth_Backend_File.new(__dirname + "/htdigest"),
              realm: "jsdavtest",
              mount: "/webdav",
              server: req.app,
              standalone: false
            }
          ).exec(req, res);
        }
        else {
          next();
        }
      }
    )

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

app.get('/%D0%B4%D0%B0%D0%BB%D0%B5%D0%B5/krestianstvo', function(req, res) {
  res.redirect('/');
});


app.get('/web/nikolaysuslov', function(req, res) {
  res.sendfile(__dirname + '/books/krestianstvo/ru/authors/suslovnv/INDEX.html');
});


app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.sendfile(__dirname + '/public/404.html');
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

//=========end of specific===========

app.listen(port);
console.log('Web server is started on port: '+ port);
