import React, { useContext } from 'react'
import Container from '../components/Container'
import { Link } from 'react-router-dom'
import { Context } from '../context/Main';

export default function Header() {
    const { cart } = useContext(Context);
  return (
    <header className="shadow py-2 sticky top-0 bg-white z-[99999]">
    <div className="container mx-auto flex justify-between items-center px-4">
      {/* Brand Logo */}
      <h1 className="text-3xl font-bold">MyStore</h1>
  
      {/* Navigation Links */}
      <nav>
        <ul className="hidden md:flex gap-6 items-center text-[18px]">
          <li>
            <Link to="/" className="hover:text-blue-600 transition duration-200">
              Store
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-blue-600 transition duration-200">
              Cart ({cart.length})
            </Link>
          </li>
        </ul>
      </nav>
  
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-gray-700 hover:text-blue-600 focus:outline-none text-2xl">
          ☰ {/* HTML Unicode Icon for Hamburger */}
        </button>
      </div>
    </div>
  </header>
  
  
  )
}
