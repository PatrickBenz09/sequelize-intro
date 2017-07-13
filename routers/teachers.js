'use strict'

const express = require('express');
const router  = express.Router();
const db = require('../models');

router.get('/', function(req, res) {
  db.Teacher.findAll()
  .then(result => {
    res.render('teachers', {datas: result});
  })
  .catch(err => {
    console.log("error");
  })
});

module.exports = router;
