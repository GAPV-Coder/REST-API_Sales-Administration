const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connection.setMaxListeners(0);

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successful database connection');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;