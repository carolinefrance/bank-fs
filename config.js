// REFACTORED: Added configuration file that connects to MongoDB "bank-fs" using Mongoose
// Import Mongoose library to work with MongoDB
const mongoose = require('mongoose');  

async function connectDB() {
    // Connect to MongoDB w/ MONGODB_URI env var in .env file
    await mongoose.connect(process.env.MONGODB_URI);
    // When connected, print success message to console
    console.log("Connected to DB");  
}
// Export connectDB function to be accessed by other modules
module.exports = connectDB;