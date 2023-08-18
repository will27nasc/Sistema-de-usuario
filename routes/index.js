var express = require('express');
var router = express.Router();

const main = require('../controllers/mainController');

/* GET home page. */
router.get('/', main.index);

module.exports = router;
