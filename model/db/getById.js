const fs = require('fs/promises');
const getAll = require('./getAll')
const contactsPath = require('./contactsPath');

const getById = async(id)=>{
    const users = await getAll();
const result = users.find(item => item.id === id);
if(!result){
    return null
}
return result;
}

module.exports = getById;