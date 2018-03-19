pgQuery = require('pg-query')

module.exports = {
    getProfile(pin){
        return pgQuery(`SELECT username, pin
            FROM users
            WHERE pin = $1`, [pin])
        .then(rows => {
            const user = rows[0][0];
            return {
                username: user.username,
                pin: user.pin
            }
        });
    }
}