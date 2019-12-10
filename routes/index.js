var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var { login, register, getAll, deleteId, indexAdmin, decrypt, encrypt } = require('../controllers/MainController');

router.get('/', function(req, res, next){
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', login);

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', register);

router.get('/admin', getAll);
router.get('/admin/delete/:id', [deleteId, indexAdmin]);
router.get('/admin/decrypt/:id', [decrypt, indexAdmin]);
router.get('/admin/encrypt/:id', [encrypt, indexAdmin]);

module.exports = router;
