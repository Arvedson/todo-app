import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface NewTaskFormProps {
  onTaskCreated: (newTask: Task) => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      const newTask: Task = await response.json();
      onTaskCreated(newTask); // Agrega la tarea al estado de TaskList
      setTitle(''); // Limpia el campo de entrada después de agregar la tarea
    } catch (error) {
      console.error('Error en el proceso de creación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-2">
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded-md"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
        Agregar Tarea
      </button>
    </form>
  );
};

export default NewTaskForm;
