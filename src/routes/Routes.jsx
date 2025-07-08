import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCourt from "../pages/AddCourt";
import PrivateRoute from "./PrivateRoute";
  export const router = createBrowserRouter([
    {
      path: "/",
      Component:RootLayout,
      children:[
        {
            index:true,
            path:'/',
            Component:Home
        },
        {
          path:'/login',
          Component:Login
        },
        {
          path:'/register',
          Component:Register
        },
        {
          path:'/addcourt',
          element:<PrivateRoute>
            <AddCourt/>
          </PrivateRoute>
        }
      ]
    }
  ]);