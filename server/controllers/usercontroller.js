const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/', async (req, res) => {
    let {username, password} = req.body;

    try{
        const newUser = await User.create({
            username,
            passwordhash: bcrypt.hashSync(password, 13)
        })
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
        res.status(201).json({
            message: "User created!",
            user: newUser,
            token
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                error: "Username already in use."
            })
        } else {
            res.status(500).json({
            error: "Failed to create user."
            })
        }
    }
});


module.exports = router;