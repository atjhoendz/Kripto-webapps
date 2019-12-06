const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rot13Schema = new Schema({
  id_user: ObjectId,
  plaintext: String,
  ciphertext: String,
})

var Rot13 = mongoose.model('Rot13', Rot13Schema);
module.exports = Rot13;
