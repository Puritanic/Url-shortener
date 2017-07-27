//  A config file to store our connection information and URL shortener host
//  so we can use it throughout our application without having to hard code it and change it in many different places.
var config = {};

config.db - {};
// the URL shortening host - shortened URLs will be this + base58 ID
// i.e.: http://localhost:3000/3Ys
config.webhost = 'http://localhost:3000/';

// your MongoDB host and database name
config.db.host = 'localhost';
config.db.name = 'url_shortener';

module.exports = config;