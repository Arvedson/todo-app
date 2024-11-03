"use client";
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import TaskList from './../components/TaskList';
import NewTaskForm from './../components/NewTaskForm';
import Image from 'next/image';

const DashboardPage: React.FC = () => {
  const { data: session } = useSession(); // Obtener  sesión actual
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleTaskCreated = () => {
    setRefreshTasks(!refreshTasks);
  };

  if (!session) {
    return <p>Cargando...</p>; 
  }

  return (
    <main>
      <h1>Bienvenido, {session.user?.name}</h1>
      {session.user?.image && <Image width={300} height={300} src={session.user.image} alt="Foto de perfil" />}
      <button onClick={() => signOut()}>Cerrar sesión</button>
      <NewTaskForm onTaskCreated={handleTaskCreated} />
      <TaskList key={`${refreshTasks}`} />
    </main>
  );
};

export default DashboardPage;
