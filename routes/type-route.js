const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {Type, validate} = require('../modules/type-module');

router.get("/", async (req, res) => {
    const type = await Type.find();
    res.send(type);
});

router.post('/', async (req, res) => {

});

module.exports = router;