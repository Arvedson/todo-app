'use client';

import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Bienvenido, {session.user?.name}</p>
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Iniciar sesión</button>
      )}
    </div>
  );
};

export default AuthButton;
