'use strict'

const express = require('express');
const router  = express.Router();
const db = require('../models');

router.get('/', function(req, res) {
  db.Teacher.findAll({ order: [ ['first_name', 'ASC'] ]})
  .then(result => {
    let janjiPalsu = result.map(teacher => {
      return new Promise((fulfill, reject) => {
        teacher.getSubject()
        .then(subj => {
           if(teacher.subject_id !== null) {
            teacher.subject_name = subj.subject_name;
           }
          return fulfill(teacher);
        })
        .catch(err => reject(err));
      });
    });

    Promise.all(janjiPalsu)
    .then(teacher => {
      res.render('teachers', {datas: teacher});
    });
  })
  .catch(err => {
    console.log("error");
  })
});

router.get('/add', function(req,res) {

});

router.get('/edit/:id', function(req, res) {
  db.Teacher.findById(req.params.id)
  .then(result => {
    db.Subject.findAll()
    .then(resultSubj => {
      res.render('teachers_edit', {data: result, subject: resultSubj});
    })
  })
});

router.post('/edit/:id', function(req, res) {
  db.Teacher.update(
  {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    subject_id: req.body.subject_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    where: { id: req.params.id }
  })
  .then(result => {
    res.redirect('/teachers');
  });
});

module.exports = router;
