
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma";
export const authOptions = {

};

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name: "Credentials",
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
          }})
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            // console.log(user, account, profile, email, credentials, 'singin');

            return true;
        },
        async jwt({ token, account, profile }) {

            const user = await prisma.user.findFirst({ where: {
                id: token.sub
            }})

            return {
                id: user?.id,
                name: user?.username
            };
            
        },
        async session({ session, token, user }) {

            // console.log(session, token, user, 'session');

            return session;
        }
    }, 
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }