var express = require('express');
var router = express.Router();
var translate=require('../controllers/translate')
var users=require('../controllers/users')
var middleWare=require('../model/middleWare')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/translate',translate.translate)
router.post('/addWordsToList',middleWare.getToken,translate.addWordsToList)
router.post('/getReciteWordsList',middleWare.getToken,translate.getReciteWordsList)
router.post('/deleteWordFromReciteWordsList',middleWare.getToken,translate.deleteWordFromReciteWordsList)
router.post('/addLabelByUserId',middleWare.getToken,translate.addLabelByUserId)
router.post('/getLabelListByUserId',middleWare.getToken,translate.getLabelListByUserId)
router.post('/getReciteWordsInLabelByUserId',middleWare.getToken,translate.getReciteWordsInLabelByUserId)
router.post('/addWordsToWordsLabelList',middleWare.getToken,translate.addWordsToWordsLabelList)
router.post('/deleteWordsFromWordsLabelList',middleWare.getToken,translate.deleteWordsFromWordsLabelList)
router.post('/avalidateAccount',users.avalidateAccount)
router.post('/createAccount',users.createAccount)
router.post('/login',users.login)
module.exports = router;
