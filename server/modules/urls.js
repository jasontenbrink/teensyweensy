const pgQuery = require('pg-query');

let urlsArray = []


const urls = {
    getUrls(){return urlsArray},
    addUrl(url){urlsArray.push(url)},
    loadURLsFromDB(){
        return pgQuery(`SELECT * FROM urls`)
        .then(rows => urlsArray = rows[0])
    }
}


module.exports = urls