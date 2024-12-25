const pool = require('../utils/db');

const addParticipant = async (req, res) => {
    const { email, firstname, lastname, dob, companyname, salary, currency, country, city } = req.body;

    if (!email || !firstname || !lastname || !dob || !companyname || !salary || !currency || !country || !city) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO participants (email, firstname, lastname, dob, companyname, salary, currency, country, city)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await pool.query(query, [email, firstname, lastname, dob, companyname, salary, currency, country, city]);
        res.status(201).json({ message: 'Participant added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getParticipants = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM participants');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getParticipantDetails = async (req, res) => {
    const { email } = req.params;
    try {
        const [rows] = await pool.query('SELECT firstname, lastname, dob FROM participants WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ error: 'Participant not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getParticipantWorkDetails = async (req, res) => {
  const { email } = req.params;
  try {
      const [rows] = await pool.query(
          'SELECT companyname, salary, currency FROM participants WHERE email = ?', 
          [email]
      );
      if (rows.length === 0) return res.status(404).json({ error: 'Participant work details not found' });
      res.json(rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getParticipantHomeDetails = async (req, res) => {
  const { email } = req.params;
  try {
      const [rows] = await pool.query(
          'SELECT country, city FROM participants WHERE email = ?', 
          [email]
      );
      if (rows.length === 0) return res.status(404).json({ error: 'Participant home details not found' });
      res.json(rows[0]);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const updateParticipant = async (req, res) => {
  const { email } = req.params;
  const { firstname, lastname, dob, companyname, salary, currency, country, city } = req.body;

  if (!firstname || !lastname || !dob || !companyname || !salary || !currency || !country || !city) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const query = `
          UPDATE participants 
          SET firstname = ?, lastname = ?, dob = ?, companyname = ?, salary = ?, currency = ?, country = ?, city = ?
          WHERE email = ?
      `;
      const [result] = await pool.query(query, [firstname, lastname, dob, companyname, salary, currency, country, city, email]);
      
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Participant not found' });
      res.json({ message: 'Participant updated successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteParticipant = async (req, res) => {
  const { email } = req.params;

  try {
      const [result] = await pool.query('DELETE FROM participants WHERE email = ?', [email]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Participant not found' });
      res.json({ message: 'Participant deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addParticipant,
  getParticipants,
  getParticipantDetails,
  getParticipantWorkDetails,
  getParticipantHomeDetails,
  updateParticipant,
  deleteParticipant
};