const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const pgQuery = require('pg-query');
const dbQueries = require('./dbQueries');
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

router.post('/', function(req,res,next){
    bcrypt.hash(req.body.password, SALT_WORK_FACTOR,
      (err, hash) => {
        if (err) res.json(err)
        else {
            dbQueries.addUser(req.body.username, hash)
            .then(response => res.status(200).json(response))
            .catch(err => {
                console.log(err);
                return res.status(424).json(err);
            })
        }
      }  
    )
});

module.exports = router;


// .then(function(salt){
//   return bcrypt.hashAsync(user.password, salt);
// })
// .then(function(hash){
//    user.password = hash;
//       pgQuery('insert into people (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)',
//             [user.username, user.password, user.firstName, user.lastName],
//             function (err, rows) {
//               if (err) console.log(err);
//               res.redirect('/');  //this redirect should probably go away
//               // probably just send a 200 status or something
//       });
//   });