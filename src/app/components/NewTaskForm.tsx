import React, { useState } from 'react';

const NewTaskForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado'); // Registro al inicio del envío

    try {
        const response = await fetch('/api/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }), // Asegúrate de que "title" esté definido
        });

        if (!response.ok) {
            console.log('Error en la respuesta de la API:', response.status, response.statusText);
            throw new Error('Error al crear la tarea');
        }

        const taskData = await response.json();
        console.log('Tarea creada con éxito:', taskData);
    } catch (error) {
        console.error('Error en el proceso de creación:', error);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Nueva Tarea</h3>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default NewTaskForm;
