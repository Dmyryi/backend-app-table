const {v4} = require('uuid');
 
const getAll = require('./getAll');
const updateContacts = require('./updateContacts');
 
const add = async(data)=>{
const newUser = {...data, id:v4()}
const users = await getAll();
users.push(newUser)
await updateContacts(users)
return newUser
}

module.exports = add;