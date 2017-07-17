'use strict'

const express = require('express');
const router  = express.Router();
const model = require('../models');

router.use((req, res, next) => {
  if(req.session.authority > 2)
    next();
  else {
    // res.sendStatus(403);
    res.render('forbidden', {canOnlyBeAccessedBy: "Headmaster", session: ""});
  }
})

router.get('/', function(req, res) {
  model.Teacher.findAll({ order: [ ['first_name', 'ASC'] ]})
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
      res.render('teachers', {datas: teacher, pageTitle: "Teacher", session: req.session.role});
    });
  })
  .catch(err => {
    console.log("error");
  })
});

router.get('/add', function(req, res) {
  res.render('teachers_add', {pageTitle: "Teacher Add", session: req.session.role});
})

router.post('/add', function(req,res) {
  model.Teacher.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    })
    .then(() => {
      res.redirect('/teachers');
    })
    .catch(err => {
      res.send(err)
    })
});

router.get('/edit/:id', function(req, res) {
  model.Teacher.findById(req.params.id)
  .then(result => {
    model.Subject.findAll()
    .then(resultSubj => {
      res.render('teachers_edit', {data: result, subject: resultSubj, pageTitle: "Teacher Edit", session: req.session.role});
    })
  })
});

router.post('/edit/:id', function(req, res) {
  model.Teacher.update(
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
