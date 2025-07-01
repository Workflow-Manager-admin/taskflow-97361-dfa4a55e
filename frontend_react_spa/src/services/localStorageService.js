// PUBLIC_INTERFACE
/**
 * Local storage service for managing Kanban board data
 * Handles all CRUD operations for tasks and columns using browser local storage
 */

const STORAGE_KEY = 'taskverse_kanban_data';

// Default column structure
const DEFAULT_COLUMNS = [
  { id: 1, name: 'To Do', tasks: [] },
  { id: 2, name: 'In Progress', tasks: [] },
  { id: 3, name: 'Done', tasks: [] }
];

// PUBLIC_INTERFACE
export const initializeStorage = () => {
  /**
   * Initialize local storage with default columns if not exists
   */
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    const initialData = {
      columns: DEFAULT_COLUMNS,
      nextTaskId: 1,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(existingData);
};

// PUBLIC_INTERFACE
export const getKanbanData = () => {
  /**
   * Get all Kanban data from local storage
   * @returns {Object} Kanban data with columns and tasks
   */
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return initializeStorage();
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from local storage:', error);
    return initializeStorage();
  }
};

// PUBLIC_INTERFACE
export const saveKanbanData = (data) => {
  /**
   * Save Kanban data to local storage
   * @param {Object} data - Kanban data to save
   */
  try {
    const dataToSave = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Error saving to local storage:', error);
    return false;
  }
};

// PUBLIC_INTERFACE
export const createTask = (columnId, taskData) => {
  /**
   * Create a new task in the specified column
   * @param {number} columnId - ID of the column to add task to
   * @param {Object} taskData - Task data (title, description, priority, due_date)
   * @returns {Object} Created task or null if failed
   */
  try {
    const data = getKanbanData();
    const column = data.columns.find(col => col.id === columnId);
    
    if (!column) {
      throw new Error('Column not found');
    }

    const newTask = {
      id: data.nextTaskId,
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      due_date: taskData.due_date || null,
      column_id: columnId,
      position: column.tasks.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    column.tasks.push(newTask);
    data.nextTaskId += 1;

    saveKanbanData(data);
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

// PUBLIC_INTERFACE
export const updateTask = (taskId, taskData) => {
  /**
   * Update an existing task
   * @param {number} taskId - ID of the task to update
   * @param {Object} taskData - Updated task data
   * @returns {Object} Updated task or null if failed
   */
  try {
    const data = getKanbanData();
    let taskFound = false;
    let updatedTask = null;

    // Find and update the task
    for (const column of data.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        updatedTask = {
          ...column.tasks[taskIndex],
          ...taskData,
          updated_at: new Date().toISOString()
        };
        column.tasks[taskIndex] = updatedTask;
        taskFound = true;
        break;
      }
    }

    if (!taskFound) {
      throw new Error('Task not found');
    }

    saveKanbanData(data);
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

// PUBLIC_INTERFACE
export const deleteTask = (taskId) => {
  /**
   * Delete a task
   * @param {number} taskId - ID of the task to delete
   * @returns {boolean} Success status
   */
  try {
    const data = getKanbanData();
    let taskFound = false;

    // Find and remove the task
    for (const column of data.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        // Reorder positions
        column.tasks.forEach((task, index) => {
          task.position = index;
        });
        taskFound = true;
        break;
      }
    }

    if (!taskFound) {
      throw new Error('Task not found');
    }

    saveKanbanData(data);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

// PUBLIC_INTERFACE
export const moveTask = (taskId, newColumnId, newPosition) => {
  /**
   * Move a task to a different column or position
   * @param {number} taskId - ID of the task to move
   * @param {number} newColumnId - ID of the destination column
   * @param {number} newPosition - New position in the column
   * @returns {boolean} Success status
   */
  try {
    const data = getKanbanData();
    let task = null;
    let sourceColumn = null;

    // Find the task and its current column
    for (const column of data.columns) {
      const taskIndex = column.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        task = column.tasks[taskIndex];
        sourceColumn = column;
        // Remove task from source column
        column.tasks.splice(taskIndex, 1);
        break;
      }
    }

    if (!task) {
      throw new Error('Task not found');
    }

    // Find destination column
    const destColumn = data.columns.find(col => col.id === newColumnId);
    if (!destColumn) {
      throw new Error('Destination column not found');
    }

    // Update task's column_id and position
    task.column_id = newColumnId;
    task.updated_at = new Date().toISOString();

    // Insert task at new position
    const insertPosition = Math.min(newPosition, destColumn.tasks.length);
    destColumn.tasks.splice(insertPosition, 0, task);

    // Reorder positions in both columns
    if (sourceColumn) {
      sourceColumn.tasks.forEach((t, index) => {
        t.position = index;
      });
    }
    
    destColumn.tasks.forEach((t, index) => {
      t.position = index;
    });

    saveKanbanData(data);
    return true;
  } catch (error) {
    console.error('Error moving task:', error);
    return false;
  }
};

// PUBLIC_INTERFACE
export const clearAllData = () => {
  /**
   * Clear all Kanban data and reset to defaults
   * @returns {Object} Reset data
   */
  try {
    localStorage.removeItem(STORAGE_KEY);
    return initializeStorage();
  } catch (error) {
    console.error('Error clearing data:', error);
    return null;
  }
};

// PUBLIC_INTERFACE
export const exportData = () => {
  /**
   * Export all Kanban data as JSON string
   * @returns {string} JSON string of all data
   */
  try {
    const data = getKanbanData();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

// PUBLIC_INTERFACE
export const importData = (jsonData) => {
  /**
   * Import Kanban data from JSON string
   * @param {string} jsonData - JSON string of data to import
   * @returns {boolean} Success status
   */
  try {
    const data = JSON.parse(jsonData);
    
    // Validate data structure
    if (!data.columns || !Array.isArray(data.columns)) {
      throw new Error('Invalid data format');
    }

    // Ensure required fields
    const validatedData = {
      columns: data.columns,
      nextTaskId: data.nextTaskId || 1,
      lastUpdated: new Date().toISOString()
    };

    return saveKanbanData(validatedData);
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
