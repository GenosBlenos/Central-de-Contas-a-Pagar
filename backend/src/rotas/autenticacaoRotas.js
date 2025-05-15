const express = require('express');
const router = express.Router();
const { login } = require('../controladores/AutenticacaoController');

router.post('/login', login);

module.exports = router;