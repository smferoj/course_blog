'use client'
import Input from '../components/input/Input';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface initialStateProps{
  email:string,
  password:string
}

const initialState ={
  email:'',
  password:''
}


export default function page() {
  const [state, setState] = useState(initialState)
  const router = useRouter()
  
  function handleChange(e:any){
    setState({...state, [e.target.name]: e.target.value})
  }

  const onSubmit = (event:FormEvent)=>{
    event.preventDefault()
     signIn('credentials', {
        ...state,
        redirect:false
     })
     .then((callback)=>{
        if(callback?.ok){
            router.refresh()
        }
        if(callback?.error){
            throw new Error("Wrong credentials")
        }
     })
     router.push('/')
    
  }

  return (
    <form className='text-center' onSubmit={onSubmit}>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
          
          <Input 
          placeholder='Email' id='email' name='email' type='email'onChange={handleChange} value={state.email}
          />
          <Input 
          placeholder='Password' id='email' name='password' type='password'onChange={handleChange} value={state.password}
          />

          <button type='submit'>Submit</button>
        </div>
        <div>
          <div>
           Have'nt an account? <Link href="/register">Register</Link>
          </div>
        </div>
      
    </form>
  )
}
