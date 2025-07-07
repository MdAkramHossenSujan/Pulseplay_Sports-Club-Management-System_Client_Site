import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
  export const router = createBrowserRouter([
    {
      path: "/",
      Component:RootLayout,
      children:[
        {
            index:true,
            path:'/',
            Component:Home
        }
      ]
    },
    {
      path:'/',
      Component:AuthLayout,
      children:[
        {
          path:'/login',
          Component:Login
        },
        {
          path:'/register',
          Component:Register
        }
      ]
    }
  ]);