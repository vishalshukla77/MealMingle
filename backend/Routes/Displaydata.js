const express = require('express');
const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {
        res.status(200).json([global.food_items, global.food_categories]);
    } catch (error) {
        console.error('Error fetching food data:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
