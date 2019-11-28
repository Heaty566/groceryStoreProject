const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

const {validateId} = require('../handle-modules/validateid');
const {Product, validate} = require('../modules/product-module');
const {Type} = require('../modules/type-module');

router.get("/", async (req, res) => {
    const product = await Product.find();
    res.send(product);
});

router.get("/:id", async(req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(404).send("The product with the given Id was not found");

    const product = await Product.findById(req.params.id);
    res.send(product);
});


router.post('/', async (req, res) => {
    const {error} =  validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let product = new Product(_.pick(req.body, ["name"]));

    const {error: error2} = validateId(req.body.typeId);
    if (error2) return res.status(404).send(error2.details[0].message);

    let type = await Type.findOne({_id: req.body.typeId});
    console.log(type);
    product.type = type;
    product = await product.save();
    res.send(product);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {error: error2} = validateId(req.params.id);
    if (error2) return res.status(404).send(error2.details[0].message);
    let product = await Product.findById(req.params.id);

    const {error: error3} = validateId(req.body.typeId);
    if (error3) return res.status(404).send(error3.details[0].message);
    let type = await Type.findById(req.body.typeId);

    product.name = req.body.name;
    product.type = type;

    product = await product.save();
    res.send(product);
});

router.delete('/:id', async(req, res) => {
    const {error} = validateId(req.params.id);
    if (error) return res.status(404).send(error.details[0].message);

    let product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
});

module.exports = router;