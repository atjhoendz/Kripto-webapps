var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  status: {
    type: Boolean,
    default: 1
  }
});

var User = mongoose.model('users', UserSchema, 'users');
module.exports = User;
