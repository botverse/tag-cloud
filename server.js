var express = require('express')
  , colors = require('colors');

var argv = require('yargs').argv;

var app = express();
var port = argv.port || 3000;
var dir = __dirname + '/public';

app.use('/', express.static(dir));

app.listen(port, function() {
  console.log(
    'Serving:',
    dir.blue,
    'on port',
    port.toString().green
  );
});
