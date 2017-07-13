'use strict'

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  let data = {satu: 'hayy'}
  res.render('index', {data: data});
});

module.exports = router;
