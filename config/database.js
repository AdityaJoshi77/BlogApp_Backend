
// Getting instance of mongoose...
const mongoose = require('mongoose');

// initializing process object...
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connection successful'))
    .catch((err) => {
        console.error(err);
        console.log('Failed to connect database');
        process.exit(1);
    })
} 

module.exports = dbConnect;