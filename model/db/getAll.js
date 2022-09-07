const fs =require('fs').promises;

const contactsPath = require('./contactsPath');

const getAll= async() =>{
    const contacts = await fs.readFile(contactsPath);

    const response = JSON.parse(contacts);
    return response;
}

module.exports = getAll;