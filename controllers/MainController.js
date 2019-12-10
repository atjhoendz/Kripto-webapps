const User = require('../models/user');
const Vigenere = require('./Vigenere.js');

module.exports = {
  register: (req, res) => {
    User.find({
      username: req.body.username
    }).then((hasil) => {
      if(hasil && hasil.length){
        res.status(200).json({
          success: false,
          message: 'Register gagal, data sudah tersedia'
        });
      } else {
        var encPwd = Vigenere.encrypt(req.body.password, req.body.username);
        User.create({
          username: req.body.username,
          password: encPwd
        }).then((user) => {
          res.status(201).json({
            success: true,
            user
          });
        }).catch((err) => {
          res.status(500).json({
            success: false,
            message: err.message
          });
        });
      }
    });
  },

  login: (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var sess;
    if(username == 'admin' && password == '123'){
      res.status(200).json({
        success: true,
        role: 'admin'
      });
    }else{
      User.findOne({
        username: username
      }).orFail().then((hasil) => {
        var decPwd = Vigenere.decrypt(hasil.password, req.body.username);
        if(req.body.password == decPwd){
          res.status(200).json({
            success: true,
            hasil
          })
        }else{
          res.status(200).json({
            success: false,
            message: 'Login Failed, Username atau Password Salah!'
          })
        }
      }).catch((err) => {
        res.status(200).json({
          success: false,
          message: err.message
        })
      })
    }
  },

  getAll: (req, res) => {
    User.find().then((hasil) => {
      res.render('admin', {users: hasil})
    }).catch((err) => {
      res.status(500).json({
        message: err.message
      })
    })
  },

  deleteId: (req, res, next) => {
    var id = req.params.id;
    User.deleteOne({ _id: id}).orFail().then((hasil) => {
      next();
    }).catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message
      });
    })
  },

  indexAdmin: (req, res) => {
    res.redirect('/admin');
  },

  decrypt: (req, res, next) => {
    var id = req.params.id;
    User.findOne({
      _id: id
    }).orFail().then((hasil) => {
      var decPwd = Vigenere.decrypt(hasil.password, hasil.username);
      User.update({_id:id} , {
        username: hasil.username,
        password: decPwd,
        status: 0
      }).orFail().then((hasil) => {
        next()
      }).catch((err) => {
        res.status(404).json({
          success: false,
          message: err.message
        })
      })
    }).catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message
      })
    })
  },

  encrypt: (req, res, next) => {
    var id = req.params.id;
    User.findOne({
      _id:id
    }).orFail().then((hasil) => {
      var encPwd = Vigenere.encrypt(hasil.password, hasil.username);
      User.update({_id:id} , {
        username: hasil.username,
        password: encPwd,
        status: 1
      }).orFail().then((hasil) => {
        next()
      }).catch((err) => {
        res.status(404).json({
          success: false,
          message: err.message
        })
      })
    }).catch((err) => {
      res.status(404).jsno({
        success: false,
        message: err.message
      })
    })
  }
}
