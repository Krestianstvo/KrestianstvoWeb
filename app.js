var h5bp = require('h5bp');
var port = 3001;
var app = h5bp.createServer({ root: __dirname + '/public' });
app.listen(port);
console.log('Krestianstvo Web server is started on port: '+ port);
