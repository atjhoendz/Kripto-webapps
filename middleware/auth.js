module.exports = {
  isAuth: (req, res, next) => {
    var loggedin = false;
    if(loggedin){
      next();
    }else{
      res.redirect('/login');
    }
  }
}
