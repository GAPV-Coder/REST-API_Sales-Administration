const { v4: uuidv4 } = require('uuid');

const generateId = () => {
    const uuid = uuidv4();
    
    const numericId = uuid.replace(/\D/g, '');

    return numericId;
};

module.exports = generateId;