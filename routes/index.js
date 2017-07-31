var express = require('express');
var router = express.Router();
var translate=require('../controllers/translate')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/translate',translate.translate)
module.exports = router;
