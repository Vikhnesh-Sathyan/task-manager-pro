const db = require('../services/db');

exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const query = `
    INSERT INTO tasks (user_id, title, description)
    VALUES (?, ?, ?)
  `;

  db.run(
    query,
    [req.user.id, title, description],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to create task' });
      }

      res.status(201).json({
        message: 'Task created successfully',
        taskId: this.lastID
      });
    }
  );
};

exports.getTasks = (req, res) => {
  const userId = req.user.id;

  const search = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM tasks
    WHERE user_id = ? AND title LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.all(
    query,
    [userId, `%${search}%`, limit, offset],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch tasks' });
      }

      res.json({
        page,
        limit,
        tasks: rows
      });
    }
  );
};

exports.updateTask = (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;
  const userId = req.user.id;

  const query = `
    UPDATE tasks
    SET status = ?
    WHERE id = ? AND user_id = ?
  `;

  db.run(query, [status, taskId, userId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update task' });
    }

    res.json({ message: 'Task updated successfully' });
  });
};


exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  const query = `
    DELETE FROM tasks
    WHERE id = ? AND user_id = ?
  `;

  db.run(query, [taskId, userId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete task' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });

    
  });
};


