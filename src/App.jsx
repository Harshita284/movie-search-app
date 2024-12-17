import React from 'react'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout'
import Home from './pages/Home'
import Details from './pages/Details'

export default function App() {
  const routes = createBrowserRouter(
    [
      {
        path:"/",
        element:<Layout/>,
        children:[
          {
            path:"/:category_slug?",
            element:<Home/>
          },
          {
            path:"product-details/:product_id", //parameter => product_id
            element:<Details/>
          }
        ]
      }
    ]
  )
  return (
   <RouterProvider router={routes}/>
  )
}
