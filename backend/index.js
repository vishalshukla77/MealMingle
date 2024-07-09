const express = require('express');
const cors = require('cors');
const mongoDB = require("./db");
const createUserRoute = require('./Routes/CreateUser');
const displayDataRoute = require('./Routes/Displaydata');
const orderDataRoute = require('./Routes/OrderData');
require('dotenv').config();

const app = express();
const port =process.envPORT || 5000;

app.use(cors({
    origin: 'https://food-delivery-webs.onrender.com',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

app.use(express.json());

mongoDB();

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.use('/api', createUserRoute);
app.use('/api', displayDataRoute);
app.use('/api', orderDataRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
