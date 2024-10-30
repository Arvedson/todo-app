import React, { useEffect, useState } from 'react';

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
      console.log('Iniciando la solicitud para obtener tareas');
      try {
        const response = await fetch('/api/tasks');
        console.log('Respuesta recibida del servidor:', response);

        if (!response.ok) {
          console.error('Error en la respuesta de la API al obtener tareas:', response.status, response.statusText);
          throw new Error('Error al obtener las tareas');
        }

        const data: Task[] = await response.json();
        console.log('Datos de tareas recibidos:', data);
        setTasks(data);
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al cargar las tareas:', errMessage);
        setError('Error al cargar las tareas');
      } finally {
        setLoading(false);
        console.log('Proceso de carga de tareas completado');
      }
    };
    fetchTasks();
  }, []);

  const handleEditTask = async (id: number, updatedTitle: string, updatedCompleted: boolean) => {
    console.log(`Iniciando la solicitud para editar la tarea con ID ${id}`);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, completed: updatedCompleted }),
      });
      console.log('Respuesta de la API para editar tarea:', response);

      if (!response.ok) {
        console.error('Error en la respuesta de la API al actualizar la tarea:', response.status, response.statusText);
        throw new Error('Error al actualizar la tarea');
      }

      const updatedTask: Task = await response.json();
      console.log('Tarea actualizada con éxito:', updatedTask);

      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al actualizar la tarea:', errMessage);
      setError('No se pudo actualizar la tarea. Inténtalo de nuevo.');
    }
  };

  const handleDeleteTask = async (id: number) => {
    console.log(`Iniciando la solicitud para eliminar la tarea con ID ${id}`);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      console.log('Respuesta de la API para eliminar tarea:', response);

      if (!response.ok) {
        console.error('Error en la respuesta de la API al eliminar la tarea:', response.status, response.statusText);
        throw new Error('Error al eliminar la tarea');
      }

      console.log('Tarea eliminada con éxito, ID:', id);
      setTasks(tasks.filter(task => task.id !== id)); // Remueve la tarea del estado local
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error al eliminar la tarea:', errMessage);
      setError('No se pudo eliminar la tarea. Inténtalo de nuevo.');
    }
  };

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.completed ? 'Completada' : 'Pendiente'}</p>
              <button onClick={() => handleEditTask(task.id, task.title, !task.completed)}>
                Marcar como {task.completed ? 'Pendiente' : 'Completada'}
              </button>
              <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px', color: 'red' }}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
