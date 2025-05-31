const express = require('express');
const { saveGameData, getGameHistory } = require('../controllers/memoryController');
const router = express.Router();
const { body } = require('express-validator');

// Route to save game data
router.post(
  '/save',
  [
    body('userID').isMongoId().withMessage('Valid userID is required'),
    body('gameDate').isISO8601().withMessage('Valid gameDate is required'),
    body('failed').isInt({ min: 0 }).withMessage('failed must be a non-negative integer'),
    body('difficulty').isIn(['Easy', 'Normal', 'Hard']).withMessage('difficulty must be Easy, Normal, or Hard'),
    body('completed').isInt({ min: 0 }).withMessage('completed must be a non-negative integer'),
    body('timeTaken').isInt({ min: 0 }).withMessage('timeTaken must be a non-negative integer'),
  ],
  saveGameData
);

// Route to fetch game result history
router.get('/history', getGameHistory);

module.exports = router;
