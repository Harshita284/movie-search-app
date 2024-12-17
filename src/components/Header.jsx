import React, { useContext } from 'react'
import Container from '../components/Container'
import { Link } from 'react-router-dom'
import { Context } from '../context/Main';

export default function Header() {
    const { cart } = useContext(Context);
  return (
    <header className='shadow py-2 sticky top-0 bg-white z-[99999]'>
        <Container className ="flex justify-between items-center">
            <h1 className='text-3xl font-bold'>MyStore</h1>
            <ul className='flex gap-3 items-center text-[18px]'>
                <li>
                    <Link to="">Store</Link>
                </li>
                <li>
                    <Link to ="">Cart ({cart.length})</Link>
                </li>
            </ul>            
        </Container>
    </header> 
  )
}
