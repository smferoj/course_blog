'use client'
import { User } from "@prisma/client";
import { SafeUser } from "../../../types/types";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserMenuProps{
    currentUser: User |null
}
export default function Navbar({currentUser}:UserMenuProps){
    return(
        <header> 
            <nav className="bg-gray-200 flex justify-between px-4 py-6 shadow-xl">
              <div>{currentUser?.name}</div>
              <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/create">Create</Link>
                {currentUser? <button onClick={()=>signOut()}> Sign out</button>: <Link href="/registe"> Register</Link> }
              </div>
            </nav>
            
        </header>
    )
}