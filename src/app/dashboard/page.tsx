"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import TaskList from './../components/TaskList';
import NewTaskForm from './../components/NewTaskForm';
import Image from 'next/image';


const DashboardPage: React.FC = () => {
  const { data: session } = useSession(); // Obtener sesión actual
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleTaskCreated = () => {
    setRefreshTasks(!refreshTasks);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <main className=" flex flex-col items-center justify-center mt-6 mx-6 mb-6">

      <div className="flex flex-col bg-[rgba(var(--color-bg),0.7)] backdrop-blur-md p-2 sm:p-4 md:p-6 rounded-lg">
        <div className="flex flex-col items-center justify-center ">
          <h1 className=" self-center">
            Bienvenido, {session.user?.name}
          </h1>
          {session.user?.image && (
            <Image
              width={150}
              height={150}
              src={session.user.image}
              alt="Foto de perfil"
              className="rounded-full shadow-lg items-center"
            />
          )}
        </div>

        <NewTaskForm onTaskCreated={handleTaskCreated} />
        <TaskList key={`${refreshTasks}`} />
      </div>
    </main>
  );
};

export default DashboardPage;
