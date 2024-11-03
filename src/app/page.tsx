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
    <main>
      <h1>Bienvenido a la App de Tareas</h1>
      {!session ? <AuthButton /> : <p>Redirigiendo...</p>}
    </main>
  );
};

export default HomePage;
