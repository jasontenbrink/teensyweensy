const pgQuery = require('pg-query');

module.exports = {
    addUser(username, passwordHash){
        return pgQuery(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)`,
            [username, passwordHash]
        )
    }
}