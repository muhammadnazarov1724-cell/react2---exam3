import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loyaout from './components/Loyaout'
import { lazy, Suspense } from 'react'

const Home = lazy(()=> import('./pages/Home/Home'))
const Login = lazy(()=> import('./pages/Login/Login'))
const Register = lazy(()=> import('./pages/Register/Register'))
const Menu = lazy(()=> import('./pages/Menu/Menu'))

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Loyaout/>,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Home/>
            </Suspense>
          )
        },
        {
          path: '/login',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Login/>
            </Suspense>
          )
        },
        {
          path: '/register',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Register/>
            </Suspense>
          )
        },
        {
          path: '/menu',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Menu/>
            </Suspense>
          )
        },
      ]
    }
  ])
  return <RouterProvider router={router}/>
}
