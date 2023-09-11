
import prisma from '../lib/prismadb'
export default async function getBlogs(){
    try{
     const blogs  = await prisma.blog.findMany({
        orderBy:{
            createAt:'desc'
        }
     })
     const safeBlogs = blogs.map((blog)=>({
        ...blog,
        createAt: blog.createAt.toISOString()
     }))

     return safeBlogs
    }
    catch(err:any){
    throw new Error(err)
    }
}