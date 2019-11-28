const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const brcypt = require('bcrypt');
const {User} = require('../modules/user-module');
const jwt = require('jsonwebtoken');
const config = require('config');
const {authLogin} = require('../middleware/authentication-login');

router.post("/", async (req, res) => {
    const {error} = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({userName: req.body.userName});
    if (!user) return res.status(400).send("Invalid username or password");

    const validatePassword = await brcypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).send("Invalid username or password");

    const token = getToken(user);
    res.header("x-auth-token", token).send("login successfully"); 
});

router.get("/me", authLogin, async (req, res) => {
    const user = await User.findById(req.body._id).select("-password");
    res.send(user);
});



validateLogin = (user) => {
    const schema = {
        userName: Joi.string().max(100).min(1).required(),
        password: Joi.string().max(255).min(1).required()
    };

    return Joi.validate(user, schema);
};

getToken = (value) => {
    const token = jwt.sign({_id: value._id, isAdmin: value.isAdmin}, config.get('app.secretKey'));
    return token;
};

module.exports = router;
