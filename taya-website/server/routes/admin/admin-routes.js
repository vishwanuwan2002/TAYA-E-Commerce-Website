const express = require('express');
const { createAdmin } = require('../../controllers/admin/admin-controller');

const router = express.Router();

router.post('/create-admin', createAdmin);

module.exports = router;
