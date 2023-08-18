var express = require('express');
var router = express.Router();

// Controllers
const usersController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validadeRegisterMiddleware');
const loggedUserMiddleware = require('../middlewares/loggedUserMiddleware');
const notLoggedUserMiddleware = require('../middlewares/notLoggedUserMiddleware');

// Formulário de registro
router.get('/register', loggedUserMiddleware, usersController.register);

// Processar o registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulário de login
router.get('/login', loggedUserMiddleware, usersController.login);

// Processar o login
router.post('/login', usersController.loginProcess);

// Perfíl de usuário
router.get('/profile/', notLoggedUserMiddleware, usersController.profile);

// Logout
router.get('/logout/', notLoggedUserMiddleware, usersController.logout);

module.exports = router;
