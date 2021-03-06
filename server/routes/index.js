var express = require('express');
var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).single('image');
//var upload = multer({dest: './public/media'}).single('image');

var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticController = require('../controllers/statistic_controller');
var userController = require('../controllers/user_controller')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Estadísticas




//Autoload
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId', userController.load);

router.get('/login',  sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/user', userController.new);
router.post('/user', userController.create);
router.get('/user/:userId(\\d+)/edit',  sessionController.loginRequired, userController.ownershipRequired, userController.edit);
router.put('/user/:userId(\\d+)',       sessionController.loginRequired, userController.ownershipRequired, userController.update);
router.delete('/user/:userId(\\d+)',    sessionController.loginRequired, userController.ownershipRequired, userController.destroy);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                 sessionController.loginRequired, quizController.new);
router.post('/quizes/create',             sessionController.loginRequired, upload, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',  sessionController.loginRequired, quizController.ownershipRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',       sessionController.loginRequired, upload, quizController.ownershipRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',    sessionController.loginRequired, quizController.ownershipRequired, quizController.destroy);
router.get('/user/:userId(\\d+)/quizes',  quizController.index);

router.get('/quizes/:quizId(\\d+)/image', quizController.image);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comment/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.ownershipRequired, commentController.publish);
router.get('/author', function(req, res) {
  res.render('author.ejs', {errors: []});
});
router.get('/quizes/statistics', statisticController.index);

module.exports = router;
