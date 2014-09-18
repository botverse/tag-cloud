var express = require('express');

require('colors');

var argv = require('yargs').argv;

var app = express();
var port = argv.port || 3000;
var dir = __dirname + '/public';

var db = require('./topics.json');

app.get(['/', '/topics', '/topics/:id'], function(req, res) {
  res.sendFile('index.html', {
    root: './public/'
  });
});

app.use('/', express.static(__dirname + '/public'));

app.get('/api/topics', function(req, res){
  res.json(db);
});

app.get('/api/topics/:id', function(req, res){
  var topic = db.topics.filter(function(topic) {
    return topic.id === req.params.id;
  }).pop();
  res.json(topic);
});

app.listen(port, function() {
  console.log(
    'Serving:',
    dir.blue,
    'on port',
    port.toString().green
  );
});
