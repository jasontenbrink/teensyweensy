pgQuery = require('pg-query')
const bcrypt = require('bcrypt')

module.exports = function(req, username, password, done) {
  pgQuery("select password, pin from users where username = $1", [req.body.username],
    function (err, rows) {
      if (err) return err;
      if (rows === undefined || rows[0] == undefined){
        return done(null, false, {message: 'no email found'});
      }
      const dbPassword = rows[0].password;
      bcrypt.compare(req.body.password, dbPassword, function (err, isMatch) {
          if (err) return err;

          const objectSentToSerializer = {
              username: req.body.username,
              randomFunMessage: 'chickenButt',
              pin: rows[0].pin
          };

          if (isMatch) {
              return done(null, objectSentToSerializer);
          }
          else {
              console.log('authentication failed');
              return done(null, false, { message: 'failed' });
          }
      });
        });
}