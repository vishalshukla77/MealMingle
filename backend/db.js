require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const fetched_data = mongoose.connection.db.collection("fooditems");
        const foodItems = await fetched_data.find({}).toArray();

        const fetched_category = mongoose.connection.db.collection("foodCategory");
        const foodCategories = await fetched_category.find({}).toArray();

        global.food_items = foodItems;
        global.food_categories = foodCategories;

        console.log("Food items and categories fetched successfully");
        
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
};

module.exports = mongoDB;
