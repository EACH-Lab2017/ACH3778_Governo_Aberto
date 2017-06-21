var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var licitation = new Schema({
    title: String,
    description: String,
    deliveryDate: Date,
    publishDate: Date
});

licitation.plugin(passportLocalMongoose);

module.exports = mongoose.model('Licitation', licitation);
