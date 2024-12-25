const express = require('express');
const { login } = require('../middleware/auth');
const participantRoutes = require('./participants');

const router = express.Router();

router.post('/login', login);
router.use('/participants', participantRoutes);

module.exports = router;