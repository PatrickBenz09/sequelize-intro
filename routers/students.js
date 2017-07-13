const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', function(req, res) {
  db.Student.findAll()
  .then(result => {
    res.render('students', {datas: result});
  });
});

router.get('/add', function(req, res) {
  res.render('students_add', {err: null});
});

router.post('/add', function(req, res) {
  db.Student.findOne(
  {
    where: {email: req.body.email}
  })
  .then(result => {
    if(!result) {
      db.Student.create(
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
  db.Student.destroy(
  {
    where:
    {
      id: req.params.id
    }
  })
  .then(() => {
    process.on('uncaughtException', function(err) {
      console.log('Caught exception: ' + err);
    });
    res.redirect('/students');
  })
});

router.get('/edit/:id', function(req, res) {
  db.Student.findOne(
    {
      where:
      {
        id: req.params.id
      }
    }
  )
  .then(result => {
    res.render('students_edit', {data: result, err: null});
  });
});

router.post('/edit/:id', function(req, res) {
  db.Student.findOne(
    {
      where:
      {
        email: req.body.email
      }
    }
  )
  .then(result => {
    if(!result || req.body.email === req.body.emailOri) {
      db.Student.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        jurusan: 'iniJurusan',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        where: {id: req.params.id}
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
  })
});

module.exports = router;
