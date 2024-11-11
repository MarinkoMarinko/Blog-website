import { prisma } from "@/prisma/prisma";
import { signIn } from "next-auth/react";
import brcypt from "bcrypt";
export async function POST(req: Request){
    try {
        const data = await req.json();

        data.password = await brcypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data
        });
        return Response.json({ data: user }, { status: 201 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}