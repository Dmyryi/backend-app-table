const fs = require('fs/promises');
const getAll = require('./getAll');
const updateContacts = require('./updateContacts')

const remove = async(id)=>{
    const contacts = await getAll();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
        return null;
    }
    const removeContact = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeContact;
}

module.exports = remove;