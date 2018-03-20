pgQuery = require('pg-query')

module.exports = {
    incrementCount(url_id, count){
        return pgQuery(`
            UPDATE urls 
            SET count = $2 
            WHERE url_id = $1`, 
            [url_id, count])
    }
}