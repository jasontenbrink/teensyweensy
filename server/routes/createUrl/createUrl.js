const router = require('express').Router()
const pgQuery = require('pg-query');
const dbQueries = require('./dbQueries');
const urls = require('../../modules/urls');

console.log('first urls', urls.getUrls())

router.post('/',async (req, res) => {

    console.log('second urls', urls.getUrls())

    try {
        const rows = await dbQueries.getUrls()
    }
    catch(e){
        console.log(e)
        res.status(424).send();
    }
    // const newUrlId = rows.lastOne.url_id

    //refactor and do this all on the DB with one call
    try {
        const response = await dbQueries.addUrl(newUrlId)
    }
    catch(e){
        console.log(e)
        res.status(424).send();
    }
    res.status(200).json(response)
    //get latest url id
    //increment and make new tiny url
    //write tiny url and long url to DB
})

module.exports = router;