const router = require('express').Router()
const pgQuery = require('pg-query');
const dbQueries = require('./dbQueries');
const urlsService = require('../../modules/urls');

router.route('/')
.post(async (req, res) => {
    const urls = urlsService.getUrls();
    let response;

    if (!req.body.tinyURL) {
        let newTinyURL = 1;
        
        //Discussion spot 1.  Optimizations
        function ensureTinyUrlUnique() {
            if ( urls.find(({tiny_url}) => newTinyURL == tiny_url) ) {
                newTinyURL++;
                ensureTinyUrlUnique();
            }
        }

        ensureTinyUrlUnique();

        try {
            response = await dbQueries.addUrl(newTinyURL, req.body.longURL)
        }
        catch (e) {
            console.log('add url to DB error', e)
            return res.status(500).send();
        }
    }
    else {
        if ( urls.find(({tiny_url}) => req.body.tinyURL == tiny_url) ){
            return res.send({message: 'That tiny url is taken.  Please try another'})
        } 
        try {
            response = await dbQueries.addUrl(req.body.tinyURL, req.body.longURL)
        }
        catch(e){
            console.log('add url to DB error2', e)
            res.status(500).send();
        }
    }
    urlsService.addUrl(response);
    res.status(200).json(response);
})
.get( (req, res) => {
    dbQueries.getURLs()
    .then(rows => res.json(rows))
    .catch(err => {
        console.log('error getting urls', err);
        res.status(500).send()
    })
});

module.exports = router;