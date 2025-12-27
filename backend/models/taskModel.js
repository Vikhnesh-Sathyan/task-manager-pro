const db = require('../services/db');

// Create tasks table
const createTaskTable = `
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.run(createTaskTable, (err) => {
  if (err) {
    console.error('Error creating tasks table', err);
  } else {
    console.log('Tasks table ready ✅');
  }
});

module.exports = db;
