var express = require('express');
var router = express.Router();
var path = process.cwd() + '/views/';
var auth = require('../middleware/auth');
var { login, register } = require('../controllers/AuthController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', auth.isAuth, function(req, res, next){
  res.sendFile(path + 'index.html');
});

router.get('/login', (req, res, next) => {
  res.sendFile(path + 'login.html');
});

module.exports = router;
