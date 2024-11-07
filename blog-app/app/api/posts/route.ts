import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
    try {
        const posts = await prisma.post.findMany();
        return Response.json({ data: posts }, { status: 200 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}