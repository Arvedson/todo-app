"use client"
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';

const HomePage: React.FC = () => {
  const [refreshTasks, setRefreshTasks] = useState(false);

  // Función para refrescar la lista de tareas
  const handleTaskCreated = () => {
    setRefreshTasks(!refreshTasks); // Cambia el valor para forzar una actualización en TaskList
  };

  return (
    <main>
      <h1>Bienvenido a la App de Tareas</h1>
      <NewTaskForm onTaskCreated={handleTaskCreated} />
      <TaskList key={`${refreshTasks}`} />

    </main>
  );
};

export default HomePage;
