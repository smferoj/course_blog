import { NextResponse } from "next/server";
import prisma from '../../lib/prismadb';

import getCurrentUser from "../../actions/getCurrentUser";

export async function POST(request:Request){
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return null
    }
    const body = await request.json()
    const {name, descriptiom, imageSrc} = body;
     
    const blog = await prisma.blog.create({
        data:{
            name,
            imageSrc,
            descriptiom,
            userId:currentUser.id,
        }
    })
    return NextResponse.json(blog)

}