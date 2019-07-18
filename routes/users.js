const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const validateRegisterInput = require('../validation/register');
// const validateLoginInput = require('../validation/login');


router.post('/register', async (req, res) => {
    const username = req.body.username;

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    try{
        const user = await User.findOne({ username });
        if(user){
            return res.status(400).json("This username already taken by someone else.")   
        }  

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username,
            password: hash
        });

        await newUser.save()
        res.json(newUser)
    }catch (err) {
        console.log(err);
    }
});



module.exports = router;