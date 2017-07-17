'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res) {
  console.log(req.session.role);
  res.render('index', {pageTitle: "FakeSchool", session: req.session.role});
});

router.get('/login', function(req, res, next) {
  res.render('login', {pageTitle: "Login", session: req.session.role});
});

router.post('/login', function(req, res, next) {
  model.User.findOne({ where: { username: req.body.username } })
  .then(result => {
    if(result) {
      req.session.user = result.dataValues.username,
      req.session.role = result.dataValues.role
      if(req.session.role === 'headmaster') req.session.authority = 3;
      else if(req.session.role === 'academic') req.session.authority = 2;
      else if(req.session.role === 'teacher') req.session.authority = 1;
    }
    res.redirect('/');
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy(err => {
    res.redirect('/');
  });
})

module.exports = router;
