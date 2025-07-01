import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import axios from 'axios';
import './Dashboard.css';

// PUBLIC_INTERFACE
const Dashboard = () => {
  /**
   * Main dashboard component that displays the Kanban board
   * Manages tasks, columns, and modal states
   * No authentication required - accessible to all users
   */
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  // Fetch tasks and columns on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/tasks`);
      setColumns(response.data.data.columns);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = (columnId) => {
    setSelectedTask(null);
    setSelectedColumnId(columnId);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setSelectedColumnId(null);
    setModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/tasks/${taskId}`);
        fetchTasks(); // Refresh tasks
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleTaskSave = async () => {
    setModalOpen(false);
    fetchTasks(); // Refresh tasks after save
  };

  const handleTaskMove = async (taskId, newColumnId, newPosition) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/tasks/order`, {
        taskId,
        newColumnId,
        newPosition
      });
      fetchTasks(); // Refresh tasks after move
    } catch (error) {
      console.error('Error moving task:', error);
      setError('Failed to move task. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-main">
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError('')} className="error-close">×</button>
          </div>
        )}
        
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Task Management</h1>
            <p>Organize and manage your tasks efficiently with our Kanban board.</p>
          </div>
          
          <KanbanBoard
            columns={columns}
            onCreateTask={handleCreateTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onTaskMove={handleTaskMove}
          />
        </div>
      </main>
      
      {modalOpen && (
        <TaskModal
          task={selectedTask}
          columnId={selectedColumnId}
          columns={columns}
          onClose={() => setModalOpen(false)}
          onSave={handleTaskSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
