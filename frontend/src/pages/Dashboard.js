import React, { useEffect, useState } from 'react';
import API from '../services/api';

/* 🔹 Inline Styles (MOVE TO TOP) */
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    fontFamily: 'Arial'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logout: {
    background: 'crimson',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    marginTop: '20px'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '15px'
  },
  addBtn: {
    marginLeft: '10px',
    padding: '10px 16px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  taskList: {
    marginTop: '30px'
  },
  task: {
    background: '#f4f4f4',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: 'crimson',
    fontSize: '18px',
    cursor: 'pointer'
  },
  doneBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    marginRight: '10px'
  }
};

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.tasks);
    } catch (err) {
      alert('Session expired. Please login again.');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    await API.post('/tasks', { title, description: '' });
    setTitle('');
    fetchTasks();
  };

 // 🔹 Delete task with confirmation
const deleteTask = async (id) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this task?'
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  } catch (err) {
    alert('Failed to delete task');
  }
};


  // Toggle status
  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task.id}`, {
      status:
        (task.status || 'pending') === 'pending'
          ? 'completed'
          : 'pending'
    });
    fetchTasks();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Task Manager Dashboard</h2>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>

      <form onSubmit={addTask} style={styles.form}>
        <input
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <button style={styles.addBtn}>Add</button>
      </form>

      <div style={styles.taskList}>
        {tasks.length === 0 && <p>No tasks found</p>}

        {tasks.map(task => (
          <div key={task.id} style={styles.task}>
            <span style={{
              textDecoration:
                (task.status || 'pending') === 'completed'
                  ? 'line-through'
                  : 'none'
            }}>
              {task.title}
            </span>

            <div>
              <button
                style={styles.doneBtn}
                onClick={() => toggleStatus(task)}
              >
                {(task.status || 'pending') === 'completed' ? '↩️' : '✅'}
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteTask(task.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
