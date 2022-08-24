var express = require('express');
var router = express.Router();

const Person = require('../models/person');

/* GET Render home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home Page' });
});

/* GET Render people index page */
router.get('/index', async (req, res, next) => {
  const people = await Person.find({});
  res.render('people/index', { people });
});

/* GET Render add a new person page */
router.get('/new', (req, res, next) => {
  res.render('people/new');
});

/* POST Add a new person to the database and redirect to home */
router.post('/people', async (req, res, next) => {
  const person = new Person(req.body.person);
  await person.save();
  res.redirect('/');
});

/* GET person using id page */
router.get('/people/:id', async (req, res, next) => { 
/* (CANNOT USE PARAMS IN GET) */
  const person = await Person.findById(req.params.id);
  res.render('people/show', { person });
});

/* GET person edit page */
router.get('/people/:id/edit', async (req, res, next) => {
  const person = await Person.findById(req.params.id);
  if(!person) {
    res.redirect('/');
  }
  res.render('people/edit', { person });
});

/* PUT submit person edit to database */
router.put('/people/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  const person = await Person.findByIdAndUpdate(id, { ...req.body.person });
  res.redirect('/index')
});

/* DELETE person delete page */
router.delete('/people/:id', async (req, res, next) => {
  const { id } = req.params;
  await Person.findByIdAndDelete(id);
  res.redirect('/index');
});

module.exports = router;
