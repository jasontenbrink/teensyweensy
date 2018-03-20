const router = require('express').Router()
const pgQuery = require('pg-query');
const dbQueries = require('./dbQueries');
const urlsService = require('../../modules/urls');

router.get('/:tinyUrl', (req, res, next) => {
    const urls = urlsService.getUrls()
    let stupidFlagICouldntFigureOutHowNotToUse = false;
    urls.forEach(value => {
        console.log(next);
        if (req.params.tinyUrl == value.tiny_url){
            res.status(301).redirect(value.long_url);
            dbQueries.incrementCount(value.url_id, ++value.count)
            stupidFlagICouldntFigureOutHowNotToUse = true;
        }
    })
    if(stupidFlagICouldntFigureOutHowNotToUse) return null
    res.status(404).json({message: "teensy weensy url not found"})
})

module.exports = router;
