const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

router.get('/sign-on', (req, res) => {
  console.log('dirname in index', __dirname)
  res.sendFile(path.join(__dirname, "../../dist/login/sign-on.html"));
})
router.get('/*', checkIfSignedOn,  (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/app/index.html"));
});

module.exports = router;

//////////////////////////////

function checkIfSignedOn(req, res, next){
  if(req.isAuthenticated()) next();
  else{
    res.sendFile(path.join(__dirname, "../../dist/login/sign-on.html"));
  }
}