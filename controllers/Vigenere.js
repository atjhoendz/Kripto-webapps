module.exports.encrypt = function(word, keyword) {
  var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!?,:;'/ ";
  var encryptWord = "";
  for (var i = 0;i < word.length;i++) {
    encryptWord += alphabet.charAt((alphabet.indexOf(word.charAt(i)) + alphabet.indexOf(keyword.charAt(i % keyword.length))) % alphabet.length);
  }
  return encryptWord;
}

module.exports.decrypt = function(word, keyword) {
  var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!?,:;'/ ";
  var decryptWord = "";
  for (var i = 0;i < word.length;i++) {
    decryptWord += alphabet.charAt(((alphabet.indexOf(word.charAt(i)) + alphabet.length) - alphabet.indexOf(keyword.charAt(i % keyword.length))) % alphabet.length);
  }
  return decryptWord;
}
