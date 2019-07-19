const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


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

router.post('/login', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) return res.status(400).json(errors);

    const username = req.body.username;
    const password = req.body.password;

    try{
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json("Username does not appear in DB.");
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const payload = {
                id: user.id,
                name: user.name
            }

            return jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
            );
        }
        return res.status(400).json({ passwordIsIncorrect: "Password is incorrect"});
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;