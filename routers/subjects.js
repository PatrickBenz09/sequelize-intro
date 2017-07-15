const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', function(req, res) {
  model.Subject.findAll()
  .then(result => {
    let janjiPalsu = result.map(subject => {
      subject.teacher_name = [];
      return new Promise((fulfill, reject) => {
        subject.getTeachers()
        .then(teacher => {
          teacher.forEach(i => {
            if(teacher.subject_id !== null)
              subject.teacher_name.push(i.first_name);
          });
          return fulfill(subject);
        })
      })
    })
    Promise.all(janjiPalsu)
    .then(subject => {
      res.render('subjects', {datas: subject});
    })
  });
});

router.get('/enrolledstudents/:id', function(req, res) {
  model.student_subject.findAll({ order: [[ 'Student', 'first_name', 'ASC' ]] ,where: { SubjectId: req.params.id }, include: [{ all:true }] })
  .then(result => {
    res.render('subject_students_enrolled', {datas: result});
  })
});

router.get('/givescore/:id/:idstudent', function(req, res) {
  model.student_subject.findOne({ where: { SubjectId: req.params.id, StudentId: req.params.idstudent }, include: [{ all: true }] })
  .then(result => {
    res.render('subject_add_score', { data: result });
  })
});

router.post('/givescore/:id/:idstudent', function(req, res) {
  model.student_subject.update(
  {
    score: req.body.score
  },
  {
    where:
    {
      SubjectId: req.params.id,
      StudentId: req.params.idstudent
    }
  })
  .then(() => {
    res.redirect('/subjects');
  })
})

module.exports = router;
