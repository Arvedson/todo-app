import React, { useEffect, useState } from 'react';
import {  signOut } from 'next-auth/react';


interface Task {
  id: number;
  title: string;
  completed: boolean;
}


const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Error al obtener las tareas');
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        setError('Error al cargar las tareas');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleEditTask = async (id: number, updatedTitle: string, updatedCompleted: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, completed: updatedCompleted }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }
      const updatedTask: Task = await response.json();
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      setError('No se pudo actualizar la tarea. Inténtalo de nuevo.');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      setError('No se pudo eliminar la tarea. Inténtalo de nuevo.');
    }
  };

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Cargando tareas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col p-1 self-center">
      <h2 className="self-center">Mis tareas</h2>
     
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No hay tareas disponibles.</p>
      ) : (
        <div className="space-y-4 ">
          {tasks.map(task => (
            <div
              key={task.id}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 flex justify-between items-center gap-6 "
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {task.completed ? 'Completada' : 'Pendiente'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTask(task.id, task.title, !task.completed)}
                  className="bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-700 transition-all duration-200"
                >
                  {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700 transition-all duration-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
              <button
          onClick={() => signOut()}
          className="mb-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200 my-6"
        >
          Cerrar sesión
        </button>
    </div>
  );
};

export default TaskList;
