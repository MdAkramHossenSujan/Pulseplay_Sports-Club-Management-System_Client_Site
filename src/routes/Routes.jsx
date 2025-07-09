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
import Courts from "../pages/courts/Courts";
import DashboardLayout from "../layouts/DashboardLayout";
import MakeAdmin from "../pages/dashboard/MakeAdmin";
import DashboardHome from "../pages/dashboard/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path: '/',
        Component: Home
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/courts',
        Component: Courts
      },
      {
        path: '/addcourt',
        element: <PrivateRoute>
          <AddCourt />
        </PrivateRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
    children:[
      {
        index:true,
        path:'/dashboard',
        Component:DashboardHome
      },
      {
        path:'makeadmin',
        Component:MakeAdmin
      }
    ]
  }
]);