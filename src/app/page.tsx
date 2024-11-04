'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthButton from './components/AuthButton';

const HomePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard'); // Redirigir al dashboard si hay una sesión activa
    }
  }, [session, router]);

  return (
<div className="flex items-center justify-center min-h-screen">
  <main className="flex flex-col bg-[rgba(var(--color-bg),0.7)] backdrop-blur-md p-2 sm:p-4 md:p-6 rounded-lg">
    <div className="flex flex-col text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-750 mb-6">
        Bienvenido a la App de Tareas
      </h1>
      {!session ? (
        <AuthButton />
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Redirigiendo...
        </p>
      )}
    </div>
  </main>
</div>

  );
};

export default HomePage;
