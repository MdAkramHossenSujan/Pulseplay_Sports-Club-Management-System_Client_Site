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
import PendingBookings from "../pages/dashboard/PendingBookings";
import ManageBookings from "../pages/dashboard/ManageBookings";
import Notifications from "../pages/dashboard/Notifications";
import ApprovedBookings from "../pages/dashboard/ApprovedBookings";
import Payment from "../pages/dashboard/payments/Payment";
import PaymentHistory from "../pages/dashboard/payments/PaymentHistory";
import ManageBookingConfirmed from "../pages/dashboard/ManageBookingConfirmed";
import ConfirmedBookings from "../pages/dashboard/ConfirmedBookings";
import Forbidden from "../pages/Forbidden";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";
import MemberAndUserRoute from "./MemberAndUserRoute";
import AdminCourts from "../pages/dashboard/AdminCourts";
import UpdateCourt from "../pages/dashboard/UpdateCourt";

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
        path:'/forbidden',
        Component:Forbidden
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
        element:<AdminRoute>
          <MakeAdmin/>
        </AdminRoute>
      },
      {
        path:'payment/:id',
        Component:Payment
      },
      {
        path:'pendingBookings',
       element:<MemberAndUserRoute>
        <PendingBookings/>
       </MemberAndUserRoute>
      },
      {
        path:'manageBooking',
       element:<AdminRoute>
        <ManageBookings/>
       </AdminRoute>
      },
      {
        path:'addcourt',
        element:<AdminRoute>
          <AddCourt/>
        </AdminRoute>
      },{
        path:'notifications',
        element:<MemberRoute>
          <Notifications/>
        </MemberRoute>
      },
      {
        path:'approvedBookings',
        element:<MemberRoute>
          <ApprovedBookings/>
        </MemberRoute>
      },
      {
        path:'paymentHistory',
        element:<MemberRoute>
          <PaymentHistory/>
        </MemberRoute>
      },
      {
        path:'manageBookingConfirmed',
        element:<AdminRoute>
          <ManageBookingConfirmed/>
        </AdminRoute>
      },
      {
        path:'confirmedBookings',
        element:<MemberRoute>
          <ConfirmedBookings/>
        </MemberRoute>
      },
      {
        path:'courts',
        element:<AdminRoute>
          <AdminCourts/>
        </AdminRoute>
      },
      {
        path:'updateCourt/:id',
        element:<AdminRoute>
          <UpdateCourt/>
        </AdminRoute>
      }
    ]
  }
]);