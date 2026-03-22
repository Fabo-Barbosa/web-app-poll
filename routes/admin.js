const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Poll');
const Poll = mongoose.model('poll');
require('../models/Topic');
const Topic = mongoose.model('topic');

router.get('/', (req, res) => {
    res.redirect('/admin/enquetes');
});

router.get('/enquetes', (req, res) => {
    res.render('admin/index');
});

module.exports = router;
