const Save = require('../models/save');
const { validationResult } = require('express-validator');

exports.saveGameData = async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { userID, gameDate, failed, difficulty, completed, timeTaken, walletAddress } = req.body;

    console.log('Received data to save:', req.body); 

    try {
       
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
            walletAddress,
        });

        await newSave.save(); 
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

exports.getGameHistory = async (req, res) => {
    try {
        const history = await Save.find().populate('userID', 'username').sort({ gameDate: -1 });
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        console.error('Error fetching game history:', error);
        res.status(500).json({ success: false, message: 'Error fetching game history', error });
    }
};
