import { prisma } from '@/prisma/prisma';

export async function GET(req: Request, { params } : { params: { id: string } }) {
    try {
        const { id: post_id } = await params;
        const post = await prisma.post.findUnique({
            where: {
                post_id,
            },
            include: {
                author: {
                    select: {
                        username: true,
                    }
                }
            },
        });
        if(!post) return Response.json({ msg: 'Post not found' }, { status: 404 });
        return Response.json({ data: post }, { status: 200 });
    } 
    catch (error) {
        return Response.json({ err: error }, { status: 500 });    
    }
}
export async function PATCH(req: Request, { params } : { params: { id: string } }){
    try {
        const { id: post_id } = await params;
        const data = await req.json();
        await prisma.post.update({
            where: { post_id }, data 
        });
        return Response.json({ msg: "Post successfully updated!" }, { status: 200 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}
export async function DELETE(req: Request, { params } : { params: { id: string } }) {
    try {
        const { id: post_id } = await params;
        await prisma.post.delete({
            where: {
                post_id,
            },
        });
        return Response.json({ msg: "Post successfully deleted!" }, { status: 200 });
    } 
    catch (error) {
        return Response.json({ err: error }, { status: 500 });    
    }
}