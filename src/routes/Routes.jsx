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
import ManageCoupons from "../pages/dashboard/ManageCoupons";
import AnnouncementsManagement from "../pages/dashboard/AnnouncementsManagement";
import Profile from "../pages/dashboard/Profile";
import UserAnnouncements from "../pages/dashboard/UserAnnouncements";
import UserRoute from "./UserRoute";
import MemberAnnouncements from "../pages/dashboard/MemberAnnouncements";
import MapPage from "../pages/MapPage";
import Gallery from "../pages/Gallery";
import Membership from "../pages/Membership";
import UserManagement from "../pages/dashboard/Usermanagement";
import MemberManagement from "../pages/dashboard/MemberManagement";

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
        path: '/findInMap',
        Component: MapPage
      },
      {
        path: '/forbidden',
        Component: Forbidden
      },
      {
        path: '/gallery',
        Component: Gallery
      },
      {
        path: '/membership',
        Component: Membership
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
    children: [
      {
        index: true,
        path: '/dashboard',
        Component: DashboardHome
      },
      {
        path: 'makeadmin',
        element: <AdminRoute>
          <MakeAdmin />
        </AdminRoute>
      },
      {
        path: 'payment/:id',
        Component: Payment
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'pendingBookings',
        element: <MemberAndUserRoute>
          <PendingBookings />
        </MemberAndUserRoute>
      },
      {
        path: 'manageBooking',
        element: <AdminRoute>
          <ManageBookings />
        </AdminRoute>
      },
      {
        path: 'addcourt',
        element: <AdminRoute>
          <AddCourt />
        </AdminRoute>
      }, {
        path: 'notifications',
        element: <MemberRoute>
          <Notifications />
        </MemberRoute>
      },
      {
        path: 'approvedBookings',
        element: <MemberRoute>
          <ApprovedBookings />
        </MemberRoute>
      },
      {
        path: 'paymentHistory',
        element: <MemberRoute>
          <PaymentHistory />
        </MemberRoute>
      },
      {
        path: 'manageBookingConfirmed',
        element: <AdminRoute>
          <ManageBookingConfirmed />
        </AdminRoute>
      },
      {
        path: 'confirmedBookings',
        element: <MemberRoute>
          <ConfirmedBookings />
        </MemberRoute>
      },
      {
        path: 'courts',
        element: <AdminRoute>
          <AdminCourts />
        </AdminRoute>
      },
      {
        path: 'updateCourt/:id',
        element: <AdminRoute>
          <UpdateCourt />
        </AdminRoute>
      },
      {
        path: 'manageCoupons',
        element: <AdminRoute>
          <ManageCoupons />
        </AdminRoute>
      },
      {
        path: 'manageAnnounces',
        element: <AdminRoute>
          <AnnouncementsManagement />
        </AdminRoute>
      },
      {
        path: 'announcements',
        element: <UserRoute>
          <UserAnnouncements />
        </UserRoute>
      },
      {
        path: 'memberAnnouncements',
        element: <MemberRoute>
          <MemberAnnouncements />
        </MemberRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute>
          <UserManagement />
        </AdminRoute>
      },
      {
        path:'manageMembers',
        element:<AdminRoute>
          <MemberManagement/>
        </AdminRoute>
      }
    ]
  }
]);