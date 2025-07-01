import React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import SortableTaskCard from './SortableTaskCard';
import './KanbanBoard.css';

// PUBLIC_INTERFACE
const KanbanBoard = ({ columns, onCreateTask, onEditTask, onDeleteTask, onTaskMove }) => {
  /**
   * Kanban board component with drag and drop functionality using @dnd-kit
   * @param {Array} columns - Array of columns with tasks
   * @param {Function} onCreateTask - Callback for creating new task
   * @param {Function} onEditTask - Callback for editing task
   * @param {Function} onDeleteTask - Callback for deleting task
   * @param {Function} onTaskMove - Callback for moving task between columns
   */

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = parseInt(active.id);
    const overId = over.id;

    // Find the task being dragged
    let activeTask = null;
    let sourceColumn = null;
    
    for (const column of columns) {
      const task = column.tasks?.find(t => t.id === activeId);
      if (task) {
        activeTask = task;
        sourceColumn = column;
        break;
      }
    }

    if (!activeTask) return;

    // Determine if dropping over a column or another task
    let targetColumnId;
    let newPosition = 0;

    if (overId.toString().startsWith('column-')) {
      // Dropped over a column
      targetColumnId = parseInt(overId.toString().replace('column-', ''));
      const targetColumn = columns.find(c => c.id === targetColumnId);
      newPosition = targetColumn?.tasks?.length || 0;
    } else {
      // Dropped over another task
      const overTaskId = parseInt(overId);
      let targetColumn = null;
      let overTaskIndex = -1;

      for (const column of columns) {
        const taskIndex = column.tasks?.findIndex(t => t.id === overTaskId);
        if (taskIndex !== -1) {
          targetColumn = column;
          overTaskIndex = taskIndex;
          break;
        }
      }

      if (targetColumn) {
        targetColumnId = targetColumn.id;
        newPosition = overTaskIndex;
      } else {
        return;
      }
    }

    // Only move if different position or column
    if (targetColumnId !== sourceColumn.id || newPosition !== activeTask.position) {
      onTaskMove(activeId, targetColumnId, newPosition);
    }
  };

  const getColumnColor = (columnName) => {
    const colors = {
      'To Do': '#64748b',
      'In Progress': '#2563eb', 
      'Done': '#22d3ee'
    };
    return colors[columnName] || '#64748b';
  };

  // Get all task IDs for the sortable context
  const getAllTaskIds = () => {
    const taskIds = [];
    columns.forEach(column => {
      if (column.tasks) {
        column.tasks.forEach(task => {
          taskIds.push(task.id);
        });
      }
    });
    return taskIds;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="kanban-board">
        <SortableContext items={getAllTaskIds()} strategy={verticalListSortingStrategy}>
          {columns.map((column) => (
            <div key={column.id} className="kanban-column">
              <div className="column-header">
                <div className="column-title">
                  <div 
                    className="column-indicator"
                    style={{ backgroundColor: getColumnColor(column.name) }}
                  ></div>
                  <h3>{column.name}</h3>
                  <span className="task-count">{column.tasks?.length || 0}</span>
                </div>
                <button
                  className="add-task-button"
                  onClick={() => onCreateTask(column.id)}
                  title="Add new task"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2H9v4a1 1 0 1 1-2 0V9H3a1 1 0 1 1 0-2h4V3a1 1 0 0 1 1-1z"/>
                  </svg>
                </button>
              </div>

              <div
                id={`column-${column.id}`}
                className="column-content"
              >
                {column.tasks?.map((task) => (
                  <SortableTaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => onEditTask(task)}
                    onDelete={() => onDeleteTask(task.id)}
                  />
                ))}
                
                {(!column.tasks || column.tasks.length === 0) && (
                  <div className="empty-column">
                    <p>No tasks yet</p>
                    <button
                      className="create-first-task"
                      onClick={() => onCreateTask(column.id)}
                    >
                      Create your first task
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {/* This will show the dragged item during drag */}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
