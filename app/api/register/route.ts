import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from '../../lib/prismadb';

export async function POST(request:Request){
    const body = await request.json()  // res comes from register.page

    const {email, name, password} = body

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    });
    return NextResponse.json(user);
}