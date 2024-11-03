

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}


// Extend the JWT to include the user ID
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}


