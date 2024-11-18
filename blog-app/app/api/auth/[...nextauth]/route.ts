
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma";
export const authOptions = {

};

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            id: "SignIn",
            credentials: {
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              try {

                const user = await prisma.user.findFirst({ where: {
                    username: credentials?.username
                }});

                const isValid = await bcrypt.compare(credentials?.password || '', user?.password || ''); 

                if(isValid)
                    return user;
                return null;
            } catch (error) {
                console.log(error);
                return null;
            } 
          }}),
          CredentialsProvider({
            id: "SignUp",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
              },
            async authorize(credentials) {
              try {
                const existingUser = await prisma.user.findFirst({
                  where: { username: credentials?.username },
                });
    
                if(existingUser)
                  return null;
                
                const hashedPassword = await bcrypt.hash(credentials?.password || '', 10);

                const user = await prisma.user.create({
                  data: {
                    username: credentials?.username || '',
                    password: hashedPassword,
                  },
                });
                return user;
              } catch (error) {
                console.error(error);
                return null; 
              }
            },
          }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, account, profile }) {

            const user = await prisma.user.findFirst({ where: {
                id: token.sub
            }})
            token.name = user?.username;
            return token;
            
        },
        async session({ session, token, user }) {
            return session;
        }
    }, 
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }