var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

// create the counters schema with an _id field and a seq field
var CounterSchema  = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
});

// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
    id: {
        type: Number,
        index: true
    },
    long_url: String,
    created_at: Date
});

// Before saving an entry in the urls collection,
// increment the global url_count in the counters collection and use that as the _id field of the urls collection

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function (next) { 
    var doc = this;
    // find the url_count and increment it by 1
    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq:1}}, function (err, counter) { 
        if (err)
            return next(error);
        // set the _id of the urls collection to the incremented value of the counter
        doc._id = counter.seq;
        doc.created_at = new Date();
        next();
     });
 });
// Now we have the pre-save functionality in place to automatically increment the counter
// and assign it as the unique identifier of the url entry which we will be encoding and decoding for shortening.

var Url = mongoose.model('Url', urlSchema);
module.exports = Url;