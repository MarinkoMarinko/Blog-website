import { prisma } from "@/prisma/prisma";

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return Response.json({ data: posts }, { status: 200 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const data = await req.json();
        await prisma.post.create({ data });
        return Response.json({ msg: "Post successfully created!" }, { status: 201 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}