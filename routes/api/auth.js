const express = require('express');
const { Users } = require('../../models/users');
const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const { joiSchema } = require('../../models/user');
const router = express.Router();

const { SECRET_KEY } = process.env;


router.post('/register', async(req, res, next) => {
    try {
        // const { error } = joiSchema.validate(req.body);
        // if (error) {
        //     throw new BadRequest(error.message);
        // }
        const { name, email, password } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            throw new Conflict("User already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await Users.create({ name, email, password: hashPassword });
        res.status(201).json({
            user: {
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {

        next(error);
    }

});

router.post("/login", async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            throw new Unauthorized("Email or password wrong")
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw new Unauthorized("Email or password wrong")
        }
        const { _id, name } = user;
        const payload = {
            id: _id
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        await Users.findByIdAndUpdate(_id, { token });
        res.json({
            token,
            user: {
                email,
                name
            }
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;