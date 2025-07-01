import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import * as localStorageService from '../services/localStorageService';
import './Dashboard.css';

// PUBLIC_INTERFACE
const Dashboard = () => {
  /**
   * Main dashboard component that displays the Kanban board
   * Manages tasks, columns, and modal states using local storage
   * No authentication required - accessible to all users
   */
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  // Load tasks and columns from local storage on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    try {
      setLoading(true);
      const data = localStorageService.getKanbanData();
      setColumns(data.columns);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Failed to load tasks from local storage.');
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

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const success = localStorageService.deleteTask(taskId);
        if (success) {
          loadTasks(); // Refresh tasks
        } else {
          setError('Failed to delete task. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleTaskSave = (taskData) => {
    try {
      let success = false;
      
      if (selectedTask) {
        // Update existing task
        const updatedTask = localStorageService.updateTask(selectedTask.id, taskData);
        success = !!updatedTask;
      } else {
        // Create new task
        const newTask = localStorageService.createTask(selectedColumnId, taskData);
        success = !!newTask;
      }

      if (success) {
        setModalOpen(false);
        loadTasks(); // Refresh tasks after save
      } else {
        setError('Failed to save task. Please try again.');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      setError('Failed to save task. Please try again.');
    }
  };

  const handleTaskMove = (taskId, newColumnId, newPosition) => {
    try {
      const success = localStorageService.moveTask(taskId, newColumnId, newPosition);
      if (success) {
        loadTasks(); // Refresh tasks after move
      } else {
        setError('Failed to move task. Please try again.');
      }
    } catch (error) {
      console.error('Error moving task:', error);
      setError('Failed to move task. Please try again.');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      try {
        localStorageService.clearAllData();
        loadTasks();
      } catch (error) {
        console.error('Error clearing data:', error);
        setError('Failed to clear data. Please try again.');
      }
    }
  };

  const handleExportData = () => {
    try {
      const data = localStorageService.exportData();
      if (data) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `taskverse-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        setError('Failed to export data.');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      setError('Failed to export data.');
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
            <div>
              <h1>Task Management</h1>
              <p>Organize and manage your tasks efficiently with our Kanban board. All data is stored locally in your browser.</p>
            </div>
            <div className="dashboard-actions">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleExportData}
                title="Export all tasks as JSON backup"
              >
                Export Data
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleClearAllData}
                title="Clear all tasks and reset board"
              >
                Clear All
              </button>
            </div>
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
