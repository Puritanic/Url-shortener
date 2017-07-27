// instantiate variables
var bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    base58      = require('./base58'), // base58 for encoding and decoding functions
    config      = require('./config'),
    path        = require('path'), // path module to correctly concatenate our paths
    url         = require('./models/url'),
    app         = express();

    // create a connection to MongoDB
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);


    // handles JSON bodies
app.use(bodyParser.json());
    // handles URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
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