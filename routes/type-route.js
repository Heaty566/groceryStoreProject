const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

const {validateId} = require('../handle-modules/validateid');
const {Type, validate, embed} = require('../modules/type-module');

router.get("/", async (req, res) => {
    const type = await Type.find();
    res.send(type);
});

router.get("/:id", async(req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(404).send("The type with the given Id was not found");

    const type = await Type.findById(req.params.id);
    res.send(type);
});


router.post('/', async (req, res) => {
    const {error} =  validate(req.body);
    if (error) return res.status(400).send(error.deatils[0].message);
    
    const type = new Type(_.pick(req.body, ["name"]));
    res.send(type);
});

module.exports = router;