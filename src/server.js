const app = require('./app');

require('dotenv').config();


// Run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});