const bcrypt = require('bcryptjs');
const pool = require('./db');

async function seedAdmin() {
    const hashedPassword = await bcrypt.hash('P4ssword', 10);
    const query = 'INSERT INTO admins (username, password) VALUES (?, ?)';
    try {
        await pool.query(query, ['admin', hashedPassword]);
        console.log('Admin seeded successfully!');
    } catch (error) {
        console.error('Error seeding admin:', error.message);
    }
}

seedAdmin();