// REFACTORED: Added config file that connects server to MongoDB "bank-fs" using Mongoose
// Import Mongoose library (a Node.js package) to work with MongoDB
const mongoose = require('mongoose');  

async function connectDB() {
    // full MONGODB_URI is in .env file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");  
}
// Export connectDB function; can be accessed by other modules
module.exports = connectDB;