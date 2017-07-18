'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Index = require('./routers/index.js');
const Teacher = require('./routers/teachers');
const Subject = require('./routers/subjects');
const Student = require('./routers/students');
const session = require('express-session');

let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'hacktiv',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use('/', Index);
app.use('/students', Student);
app.use('/subjects', Subject);
app.use('/teachers', Teacher);

app.listen(3000);
