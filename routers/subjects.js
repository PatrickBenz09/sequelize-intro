const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', function(req, res) {
  db.Subject.findAll()
  .then(result => {
    res.render('subjects', {datas: result});
  });
});


module.exports = router;
