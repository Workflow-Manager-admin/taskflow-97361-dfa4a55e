import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

// PUBLIC_INTERFACE
const SortableTaskCard = ({ task, onEdit, onDelete }) => {
  /**
   * Sortable wrapper for TaskCard component using @dnd-kit
   * @param {Object} task - Task object with title, description, priority, etc.
   * @param {Function} onEdit - Callback for editing task
   * @param {Function} onDelete - Callback for deleting task
   */
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-wrapper ${isDragging ? 'dragging' : ''}`}
    >
      <TaskCard
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default SortableTaskCard;
