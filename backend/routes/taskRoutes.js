const express = require('express');
const db = require('../services/db');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');


router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);

module.exports = router;
