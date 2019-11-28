const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const bcrypt = require('bcrypt');

const {validateId} = require('../handle-modules/validateId');
const {User, validate} = require('../modules/user-module');
const {Product} = require('../modules/product-module');

router.get("/", async(req, res) => {
    const user = await User.find().select("-_id");
    res.send(user);
});

router.get("/:id", async(req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(404).send(error.details[0].message);

    const user = await User.findById(req.params.id).select("-_id");
    res.send(user);
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User(_.pick(req.body, ["phone", "name", "userName"]));
    const salt = await bcrypt.genSalt(4);
    user.password = await bcrypt.hash(req.body.password, salt);
    for (let value of req.body.bags) {
        const {error: error2} = validateId(value);
        if (error2) return res.status(404).send(error2.details[0].message);

        let product = await Product.findById(value);
        user.bags.push(product);
    };

    user = await user.save();
    res.send(user);
});

module.exports = router;