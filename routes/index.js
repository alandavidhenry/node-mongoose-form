var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

/* GET new person page */
router.get('/new', (req, res, next) => {
  res.render('people/new');
});

/* POST new person page */
router.post('/', async (req, res, next) => {
  const person = new Person(req.body.person);
  await person.save();
  res.redirect('/');
});

/* GET person using id page */
router.get('/:id', async (req, res, next) => {
  const person = await Person.findById(req.params.id);
  res.render('people/show'), { person };
});

module.exports = router;
