const pool = require('./pool');
const bcrypt = require('bcrypt');

const db = {

    async signup({ username, firstName, lastName, email, hashedPassword }) {
        try {
            await pool.query(
                'INSERT INTO users (username, first, last, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [username, firstName, lastName, email, hashedPassword]
            );
            
        } catch(err) {
            
            throw new Error('Database error during signup:' + err);
        }
    }
}

module.exports = db;