 'use client'
 
import Input from '../components/input/Input';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface InitialStateProps{
  name:string,
  email:string,
  password:string
}

const initialState:InitialStateProps ={
  name:'',
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
    axios.post('/api/register', state)
    .then(()=>{
      router.refresh()
    })
    .then(()=>{
      setTimeout(()=>{
        router.push('/login')
      },1000)
    })
    .catch((err:any)=>{
    })
    
  }

  return (
    <form className='text-center' onSubmit={onSubmit}>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
          
          <Input 
          placeholder='Name' id='name' name='name' type='text'onChange={handleChange} value={state.name}
          />
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
            Do you have an accout ? <Link href="/login">Signin</Link>
          </div>
        </div>
      
    </form>
  )
}
