const express = require('express');
const RoleController = require('../controllers/role.controller');

const router = express.Router();

router.post('/create', RoleController.createRole);

module.exports = router;