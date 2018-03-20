pgQuery = require('pg-query')

module.exports = {
    addUrl(tinyURL, longURL){
        return pgQuery(`
            INSERT INTO urls (tiny_url, long_url)
            VALUES ($1, $2)
            RETURNING *`, 
            [tinyURL, longURL])
        .then(rows => rows[0][0]);
    },
    getURLs(){
        return pgQuery(`SELECT * FROM urls`)
        .then(rows => rows[0])
    }
}