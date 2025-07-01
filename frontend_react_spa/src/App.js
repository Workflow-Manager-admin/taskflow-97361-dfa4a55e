import React from 'react';
import Dashboard from './pages/Dashboard';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component - directly renders the Kanban board dashboard
   * No authentication required - all users can access the task management interface
   */
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
