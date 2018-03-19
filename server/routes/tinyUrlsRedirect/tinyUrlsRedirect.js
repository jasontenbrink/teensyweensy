const router = require('express').Router()
const pgQuery = require('pg-query');
const dbQueries = require('./dbQueries');
const urls = require('../../modules/urls');

console.log('first urls', urls.getUrls())

router.get('/:tinyUrl',async (req, res) => {
    console.log('4th urls', urls.getUrls())
    res.json({m:"hi sarah"})
})

module.exports = router;
