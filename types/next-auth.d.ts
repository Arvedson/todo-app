import NextAuth from "next-auth";


// Extend the default session to include the user ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}

// Extend the JWT to include the user ID
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
