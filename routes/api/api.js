const express = require('express');
const createError = ('http-errors');
// const Joi = require('joi');
// const { routes } = require('../../app');
const router = express.Router()


const {Users} =require('../../models/users')
// const contactsOperation = require("../../model/db");

// const joiSchema= Joi.object({
//   name:Joi.string().required(),
//   email:Joi.string().email({ minDomainSegments: 2 }).required(),
// //   phone:Joi.string().required()
// // password:Joi.mixed().required()
// })

router.get('/', async (req,res,next)=>{
try {
    const get = await Users.find();
    res.json(get)
} catch (error) {
    console.log(error)
}
})

router.post('/', async(req,res,next)=>{
    try {
     
        const newContacts = await Users.create(req.body);
        res.status(201).json(newContacts);

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try{
      const contacts = await Users.findOne(id);
     res.json(contacts);
     if(!contacts){
       throw new createError(404, "Not found");
     }
   }
   catch(error){
   next(error);
   }});


   router.delete('/:id', async(req,res,next)=>{
    const {id} = req.params;
    try{
      const contacts = await Users.findOneAndRemove(id);
     res.json(contacts);
     if(!contacts){
       throw new createError(404, "Not found");
     }
   }
   catch(error){
   next(error);
   }

   })

   router.put('/:id', async (req, res, next) => {
    try{
  const {id} = req.params;
  const updateContacts=await Users.findOneAndUpdate(id, req.body, {new:true});
  // const {error} = joiSchema.validate(req.body);
 
  if (!updateContacts) {
    throw createError(404, "Not found");
}
res.json(updateContacts);

} catch (error) {
if (error.message.includes("Cannot read")) {
    error.status = 400;
}
next(error);
}
  })
module.exports = router;