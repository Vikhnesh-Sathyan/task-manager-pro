import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // 🔹 Fetch tasks
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

  // 🔹 Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await API.post('/tasks', {
        title,
        description: ''
      });
      setTitle('');
      fetchTasks();
    } catch (err) {
      alert('Failed to add task');
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const toggleStatus = async (task) => {
  try {
    await API.put(`/tasks/${task.id}`, {
      status: task.status === 'pending' ? 'completed' : 'pending'
    });
    fetchTasks();
  } catch (err) {
    alert('Failed to update task');
  }
};


  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2>Task Manager Dashboard</h2>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>

      {/* Add Task */}
      <form onSubmit={addTask} style={styles.form}>
        <input
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <button style={styles.addBtn}>Add</button>
      </form>

      {/* Task List */}
      <div style={styles.taskList}>
        {tasks.length === 0 && <p>No tasks found</p>}

      {tasks.map((task) => (
  <div key={task.id} style={styles.task}>
    <span
      style={{
        textDecoration: task.status === 'completed' ? 'line-through' : 'none'
      }}
    >
      {task.title}
    </span>

    <div>
      <button
        style={styles.doneBtn}
        onClick={() => toggleStatus(task)}
      >
        {task.status === 'completed' ? '↩️' : '✅'}
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

/* 🔹 Inline Styles */
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
},

};
