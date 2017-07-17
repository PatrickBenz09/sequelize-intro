const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res) {
  model.Student.findAll({ order: [ ['first_name', 'ASC'] ] })
  .then(result => {
    res.render('students', {datas: result, pageTitle: "Student"});
  });
});

router.get('/add', function(req, res) {
  res.render('students_add', {err: null, pageTitle: "Student Add"});
});

router.post('/add', function(req, res) {
  model.Student.findOne({ where: {email: req.body.email} })
  .then(result => {
    if(!result) {
      model.Student.create(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        jurusan: 'sebuahEmail',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(() => {
        res.redirect('/students');
      })
      .catch(err => {
        res.send('err');
      })
    } else {
      res.render('students_add', {err: "Email Already Exist!"});
    }
  });
});


router.get('/delete/:id', function(req, res) {
  model.Student.destroy({ where: { id: req.params.id } })
  .then(() => {
    process.on('uncaughtException', function(err) {
      console.log('Caught exception: ' + err);
    });
    res.redirect('/students');
  })
});

router.get('/edit/:id', function(req, res) {
  model.Student.findOne({ where: { id: req.params.id } })
  .then(result => {
    res.render('students_edit', {data: result, err: null, pageTitle: "Student Edit"});
  });
});

router.post('/edit/:id', function(req, res) {
  model.Student.findOne({ where: { email: req.body.email } })
  .then(result => {
    if(!result || req.body.email === req.body.emailOri) {
      model.Student.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        jurusan: 'iniJurusan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { where: { id: req.params.id } })
      .then(() => {
        res.redirect('/students');
      })
      .catch(err => {
        res.send('err');
      })
    } else {
      res.render('students_add', {err: "Email Already Exist!"});
    }
  })
});

router.get('/addsubject/:id', function(req, res) {
  let student = model.Student.findOne({ where: { id: req.params.id } })
  .then(result => {
    return result;
  })

  let subjects = model.Subject.findAll()
  .then(result => {
    return result;
  });

  Promise.all([student, subjects])
  .then(result => {
    res.render('student_add_subject', {dataStudent: result[0], dataSubjects: result[1], err: null, pageTitle: "Student Add Subject"});
  })
  .catch(err => {
    res.render('student_add_subject', {err: err})
  })
});

router.post('/addsubject/:id', function(req, res) {
  model.student_subject.create(
  {
    StudentId: parseInt(req.params.id),
    SubjectId: req.body.subject_id
  })
  .then(() => {
    res.redirect('/students');
  })
});

module.exports = router;
