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

    // grab the long URL submitted by the user from our POST body
    var longUrl = req.body.url;
    var shortUrl = ''; // the shortened URL we will return

    // check if url already exists in database
    Url.findOne({long_url: longUrl}, function (err, doc) { 
        if(doc){
            // URL has already been shortened

            // base58 encode the unique _id of that document and construct the short URL
            shortUrl = config.webhost + base58.encode(doc._id);
            // since the document exists, we return it without creating a new entry
            res.send({'shortUrl': shortUrl});
        } else {
            // The long URL was not found in the long_url field in our urls
            // collection, so we need to create a new entry

            // When the long URL is not found, we will have to create a new Url object and use the save method to save it to our urls collection.
            // Incrementing the counters collection and assigning it to the _id of the urls_collection is already taken care of for us in the pre
            // save middleware within url.js model we defined.
            var newUrl = Url({
                long_url: longUrl
            });
            // save the new link
            newUrl.save(function (err) { 
                if (err) {
                    console.log(err);
                }
                // construct the short URL
                shortUrl = config.webhost + base58.encode(newUrl._id);

                res.send({'shortUrl': shortUrl});
             });
        }
     });
 });

app.get('/:encoded_id', function (req, res) { 
    // route to redirect the visitor to their original URL given the short URL

    // Express will take the base58 encoded ID at the end of our URL and assign it to a variable called encoded_id for us to use in our callback.
    // For example, if a user visits shortr.io/3Ys, the variable encoded_id will hold the value 3Ys.

    // We will decode the base58 ID to get it's base10 equivalent and look it up in the database using the findOne method.
    // If we manage to find that _id in the database,
    // we will then redirect the visitor to their actual destination with Express's res.redirect method with a 301 redirect status.
    // However, if we don't find anything in the database with that _id we can simply redirect them to the homepages (or potentially a 404 page).

    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);

    // check if url already exists in database
    Url.findOne({_id: id}, function (err, doc) { 
        if(doc){
            // found an entry in the DB, redirect the user to their destination
            res.redirect(doc.long_url);
        } else {
            // nothing found, take 'em home
            res.redirect(config.webhost);
        }
     });
 });

var server = app.listen(3000, function () { 
    console.log('Server up and running on port 3000');
 });