// instantiate variables
var express = require('express'),
    path    = require('path'), // path module to correctly concatenate our paths
    app     = express();


    // tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) { 
    // route to serve up the homepage (index.html)
  res.sendFile(path.join(__dirname, 'views/index.html'));
 });

app.post('/api/shorten', function (req, res) { 
    // route to create and return a shortened URL given a long URL
 });

app.get('/:encoded_id', function (req, res) { 
    // route to redirect the visitor to their original URL given the short URL
 });

var server = app.listen(3000, function () { 
    console.log('Server up and running on port 3000');
 });