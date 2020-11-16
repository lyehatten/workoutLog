const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');

router.post('/', async(req, res) => {
    let {username, password} = req.body;
    try {
        let loginUser = await User.findOne({
            where: { username }
        })

        if(loginUser && await bcrypt.compare(password, loginUser.passwordhash)){
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
            res.status(200).json({
                message: 'Login success!',
                user: loginUser,
                token
            })
        } else {
            res.status(401).json({
                message: "Login Failed: User information is incorrect!"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error logging in!'
        })
    }
});


module.exports = router;