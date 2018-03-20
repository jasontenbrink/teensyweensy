const router = require('express').Router()
const pgQuery = require('pg-query');
const dbQueries = require('./dbQueries');
const urlsService = require('../../modules/urls');

router.route('/')
.post(async (req, res) => {
    let response;
    const urls = urlsService.getUrls();

    //TODO insure new tiny url will be unique

    //could probably do this part on the DB
    const newTinyURI = urls[urls.length-1].url_id+1;
    try {
        response = await dbQueries.addUrl(newTinyURI, req.body.longURL)
    }
    catch(e){
        console.log(e)
        res.status(424).send();
    }

    urlsService.addUrl(response);
    res.status(200).json(response)
})
.get( (req, res) => {
    dbQueries.getURLs()
    .then(rows => res.json(rows))
    .catch(err => {
        console.log(err);
        res.status(424).send()
    })
});
module.exports = router;