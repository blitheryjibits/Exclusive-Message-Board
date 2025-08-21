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
    },

    async createMessage({ title, content, userId }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // insert message and return message_id
            const messageResult = await client.query(
                'INSERT INTO messages (title, content) VALUES ($1, $2) RETURNING id',
                [title, content]
            );
            const messageId = messageResult.rows[0].id;

            // insert user_message relationship
            await client.query(
                'INSERT INTO user_messages (user_id, message_id) VALUES ($1, $2)',
                [userId, messageId]
            );

            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw new Error('Database error during message creation:' + err);
        } finally {
            client.release();
        }
    },

    async getMessages() {
        try {
            const result =  await pool.query(
                `SELECT m.title, m.content, m.created_at, u.username
                FROM messages m
                JOIN user_messages um ON m.id = um.message_id
                JOIN users u ON um.user_id = u.id
                ORDER BY m.created_at DESC`
            );
            return result.rows;

        } catch (err) {
            throw new Error('Database error during message retrieval: ' + err);
        }
    },

    async addMember(userId) {
        try {
            await pool.query(
                'UPDATE users SET member_status = true WHERE id = $1',
                [userId]
            );
        } catch (err) {
            throw new Error('Database error during member addition: ' + err);
        }
    }
}

module.exports = db;