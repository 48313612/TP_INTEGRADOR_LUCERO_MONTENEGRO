import pool from '../configs/db-config.js';
import bcrypt from 'bcryptjs';

class UserRepository {
    async createUser(userData) {
        const { first_name, last_name, username, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = `
            INSERT INTO users (first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, first_name, last_name, username
        `;
        
        const values = [first_name, last_name, username, hashedPassword];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        
        try {
            const result = await pool.query(query, [username]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        const query = 'SELECT id, first_name, last_name, username FROM users WHERE id = $1';
        
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async checkUsernameExists(username) {
        const query = 'SELECT COUNT(*) FROM users WHERE username = $1';
        
        try {
            const result = await pool.query(query, [username]);
            return parseInt(result.rows[0].count) > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository; 