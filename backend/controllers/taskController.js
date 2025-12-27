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
