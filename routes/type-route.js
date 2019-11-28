const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

const {validateId} = require('../handle-modules/validateid');
const {Type, validate} = require('../modules/type-module');

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
    if (error) return res.status(400).send(error.details[0].message);
    
    let type = new Type(_.pick(req.body, ["name"]));
    type = await type.save();
    res.send(type);
});

router.put('/:id', async (req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(404).send(error.details[0].message);

    const {error: error1} = validate(req.body);
    if (error1) return res.status(400).send(error1.details[0].message);
    
    let type = await Type.findById(req.params.id);
    type.name = req.body.name;
    type = await type.save();
    res.send(type);
});

router.delete('/:id', async(req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(404).send(error.details[0].message);

    let type = await Type.findByIdAndDelete(req.params.id);
    res.send(type);
});

module.exports = router;