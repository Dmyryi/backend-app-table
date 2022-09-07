const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name:{
        type:String,
    required:[true,"Name is required!"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
       
        required: [true, 'Password is required'],
    },
    token: {
        type: String,
        default: null,
    }


}, { versionKey: false, timestamps: true }
)

const Users = model("contact", userSchema);

module.exports= {Users};