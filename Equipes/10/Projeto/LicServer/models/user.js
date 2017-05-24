var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var tagSchema = new Schema({
    tag:
    {
      type: String,
      required: true,
      unique: true
    }
});

var user = new Schema({
    username: String,
    password: String,
    email:
    {
      type: String,
      required: true
    },
    documentNumber: Number,
    admin:
    {
        type: Boolean,
        default: false
    },
    tags: [tagSchema]
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', user);
