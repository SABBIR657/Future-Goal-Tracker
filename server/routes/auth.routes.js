const registerController = require('../controller/auth.controller');

const router = require('express').Router();

router.post('/register',registerController )

module.exports = router;