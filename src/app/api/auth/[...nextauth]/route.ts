import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../lib/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database", // Cambiar la estrategia de sesión a base de datos
  },
  callbacks: {
    async session({ session, user }) {
      // Agregar la propiedad `id` al objeto de sesión solo si existe el usuario
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirigir al dashboard después del inicio de sesión con Google
      if (url.includes("/api/auth/callback/google")) {
        return `${baseUrl}/dashboard`;
      }
      return baseUrl;
    },
  },
};

// Exporta los métodos HTTP individualmente
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
