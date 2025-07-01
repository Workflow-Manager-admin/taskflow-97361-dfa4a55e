import React from 'react';
import './TaskCard.css';

// PUBLIC_INTERFACE
const TaskCard = ({ task, onEdit, onDelete }) => {
  /**
   * Individual task card component
   * @param {Object} task - Task object with title, description, priority, etc.
   * @param {Function} onEdit - Callback for editing task
   * @param {Function} onDelete - Callback for deleting task
   */

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#22d3ee',
      medium: '#2563eb',
      high: '#dc2626'
    };
    return colors[priority] || colors.medium;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="task-priority">
          <div 
            className="priority-indicator"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            title={`${task.priority} priority`}
          ></div>
        </div>
        <div className="task-actions">
          <button
            className="task-action-button edit"
            onClick={onEdit}
            title="Edit task"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 10.5V11.5C3 11.776 3.224 12 3.5 12H4.5C4.632 12 4.765 11.947 4.854 11.854L11.646 5.062L8.938 2.354L2.146 9.146C2.053 9.235 2 9.367 2 9.5V10.5C2 10.776 2.224 11 2.5 11H3ZM12.707 2.293L11.707 1.293C11.316 0.902 10.684 0.902 10.293 1.293L9.646 1.939L12.354 4.647L13 3.999C13.391 3.609 13.391 2.976 13 2.586L12.707 2.293Z"/>
            </svg>
          </button>
          <button
            className="task-action-button delete"
            onClick={onDelete}
            title="Delete task"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M5.5 1C5.224 1 5 1.224 5 1.5V2H3.5C3.224 2 3 2.224 3 2.5S3.224 3 3.5 3H4V11.5C4 12.327 4.673 13 5.5 13H8.5C9.327 13 10 12.327 10 11.5V3H10.5C10.776 3 11 2.776 11 2.5S10.776 2 10.5 2H9V1.5C9 1.224 8.776 1 8.5 1H5.5ZM6 4.5C6 4.224 6.224 4 6.5 4S7 4.224 7 4.5V10.5C7 10.776 6.776 11 6.5 11S6 10.776 6 10.5V4.5ZM8 4.5C8 4.224 8.224 4 8.5 4S9 4.224 9 4.5V10.5C9 10.776 8.776 11 8.5 11S8 10.776 8 10.5V4.5Z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="task-content">
        <h4 className="task-title">{task.title}</h4>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      
      <div className="task-footer">
        {task.due_date && (
          <div className={`task-due-date ${isOverdue(task.due_date) ? 'overdue' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1C3.243 1 1 3.243 1 6s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 9c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
              <path d="M6.5 3.5v2.793l1.854 1.853-.708.708L5.5 6.707V3.5h1z"/>
            </svg>
            {formatDate(task.due_date)}
          </div>
        )}
        
        <div className="task-meta">
          <span className="task-priority-text">
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
