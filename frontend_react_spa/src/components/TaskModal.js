import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskModal.css';

// PUBLIC_INTERFACE
const TaskModal = ({ task, columnId, columns, onClose, onSave }) => {
  /**
   * Modal component for creating and editing tasks
   * @param {Object} task - Task object (null for new task)
   * @param {number} columnId - Column ID for new tasks
   * @param {Array} columns - Available columns
   * @param {Function} onClose - Callback to close modal
   * @param {Function} onSave - Callback after save
   */
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    column_id: columnId || (columns[0]?.id || 1)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!task;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        due_date: task.due_date ? task.due_date.split('T')[0] : '',
        column_id: task.column_id || columnId || (columns[0]?.id || 1)
      });
    }
  }, [task, columnId, columns]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        title: formData.title,
        description: formData.description || null,
        priority: formData.priority,
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
        column_id: formData.column_id
      };

      if (isEdit) {
        await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/tasks/${task.id}`, payload);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/tasks`, payload);
      }

      onSave();
    } catch (error) {
      console.error('Error saving task:', error);
      setError(error.response?.data?.message || 'Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter task title"
              maxLength="200"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter task description (optional)"
              rows="3"
              maxLength="1000"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="due_date">Due Date</label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          {!isEdit && (
            <div className="form-group">
              <label htmlFor="column_id">Column</label>
              <select
                id="column_id"
                name="column_id"
                value={formData.column_id}
                onChange={handleChange}
                disabled={loading}
              >
                {columns.map(column => (
                  <option key={column.id} value={column.id}>
                    {column.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-button secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-button primary"
              disabled={loading || !formData.title.trim()}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
