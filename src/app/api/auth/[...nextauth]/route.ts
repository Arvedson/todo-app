// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import authOptions from "../authOptions"; 

export const GET = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
export const POST = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
