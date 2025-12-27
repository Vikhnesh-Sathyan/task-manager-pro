const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/', authMiddleware, createTask);

module.exports = router;
