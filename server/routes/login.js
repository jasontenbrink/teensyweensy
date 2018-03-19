const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

router.post('/', 
    passport.authenticate('local'), 
    (req, res) => {
        res.sendFile(path.join(__dirname, "../../dist/app/index.html"));
    }
);

module.exports = router;