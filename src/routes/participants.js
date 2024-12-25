const express = require('express');
const {
  addParticipant,
  getParticipants,
  getParticipantDetails,
  getParticipantWorkDetails,
  getParticipantHomeDetails,
  updateParticipant,
  deleteParticipant
} = require('../controllers/participants');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/add', authenticate, addParticipant);
router.get('/', authenticate, getParticipants);
router.get('/details/:email', authenticate, getParticipantDetails);
router.get('/work/:email', authenticate, getParticipantWorkDetails);
router.get('/home/:email', authenticate, getParticipantHomeDetails);
router.put('/:email', authenticate, updateParticipant);
router.delete('/:email', authenticate, deleteParticipant);

module.exports = router;