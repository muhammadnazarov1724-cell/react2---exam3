import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loyaout from './components/Loyaout'
import { lazy, Suspense } from 'react'

const Home = lazy(()=> import('./pages/Home/Home'))
const Login = lazy(()=> import('./pages/Login/Login'))
const Register = lazy(()=> import('./pages/Register/Register'))
const Menu = lazy(()=> import('./pages/Menu/Menu'))
const Dolgi = lazy(()=> import('./pages/Dolgi/Dolgi'))
const Archive = lazy(()=> import('./pages/archive/Archive'))
const Contact = lazy(()=> import('./pages/contact/Contact'))
const Papki = lazy(()=> import('./pages/papki/Papki'))
const Profile = lazy(()=> import('./components/Profile'))

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
        {
          path: '/dolgi',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Dolgi/>
            </Suspense>
          )
        },
        {
          path: '/archive',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Archive/>
            </Suspense>
          )
        },
        {
          path: '/contact',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Contact/>
            </Suspense>
          )
        },
        {
          path: '/papki',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Papki/>
            </Suspense>
          )
        },
        {
          path: '/profile',
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Profile/>
            </Suspense>
          )
        },
      ]
    }
  ])
  return <RouterProvider router={router}/>
}
