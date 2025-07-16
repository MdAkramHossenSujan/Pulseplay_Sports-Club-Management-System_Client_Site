# PulsePlay

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-green)](https://pulseplay-65454.firebaseapp.com/)

---

## 🌟 Project Name

**PulsePlay – Sports Club Management System**

---

## 🔗 Live URL

[PulsePlay Live](https://pulseplay-65454.firebaseapp.com/)

---

## 🎯 Objectives & About

PulsePlay is a complete **Sports Club Management System** designed for single-club operations. The platform allows seamless management of:

- Court/session booking
- Member approvals
- Secure payments
- User/member/admin dashboards
- Club announcements

The goal is to digitize and simplify sports club management with powerful admin features and a smooth user experience.

---

## 🗂️ Workflow

- Users explore courts via the landing page, gallery, or interactive map
- Guests must log in to book courts
- Bookings go into a **pending state** until admin approval
- Upon approval:
  - User becomes a member
  - Member dashboard unlocks
- Members pay via Stripe and receive confirmation
- Admins manage all resources:
  - Courts
  - Users
  - Members
  - Announcements
  - Coupons
- Notifications keep everyone updated in real time

---

## ✨ Uniqueness

- Real-time booking system with admin approval flow
- Firebase + MongoDB hybrid architecture for data
- Live interactive map to browse courts
- Payment system integrated with Stripe
- Animated and visually rich UI
- Extensive admin panel with full CRUD
- Live notifications
- Toggleable data views (table/card)
- Secure and responsive for all devices

---

## 🚀 Features

### 🔐 User Authentication & Profile
- Firebase-based secure auth (login/signup/reset)
- Email/password authentication with validation
- Live profile photo upload from device storage
- Edit profile info synced in Firebase & MongoDB
- Registration date shown in profile
- Membership status badge displayed

---

### 🏠 Home & Public Pages
- Hero banner with animated slider
- About Club, How It Works, and Why Choose Us sections
- Interactive map (React Leaflet) showing nationwide courts
- Exclusive coupons displayed on the homepage
- Gallery page showcasing courts with modal image preview

---

### 🏟️ Court Listings & Booking
- View courts with:
  - Image
  - Court type
  - City
  - Slots
  - Price
- Search courts by sport type
- Sort courts by price (ascending/descending)
- Pagination with 6 cards per page
- “Book Now” opens modal:
  - Only accessible for logged-in users
  - Non-logged-in users redirected to login
  - Modal has:
    - All fields read-only except slot & date
    - Multiple slot selection
    - Dynamic price calculation
- Custom toast notifications for booking actions
- Booking requests stored in MongoDB as pending
- “No data found” animations handled with Lottie

---

### 👤 User Dashboard
- Dashboard includes:
  - Profile details
  - Pending bookings list
  - Announcements
  - Dashboard charts visualizing booking stats
- User can:
  - Cancel pending bookings
  - Update personal info
- Announcements displayed from admin

---

### 🧑‍🏫 Member Dashboard
- Unlocked after admin approves booking
- Dashboard includes:
  - My Profile with membership badge
  - Pending bookings with cancel option
  - Approved bookings with “Pay Now” button
  - Confirmed bookings list
  - Payment History with toggle view (table/card)
  - Announcements
- Stripe payment:
  - Read-only form for booking info
  - Coupon code entry reduces total amount
  - Confirmation modal before payment
- Chart displays:
  - Total amount paid
  - Most booked court types

---

### 👑 Admin Dashboard
- Admin home page shows:
  - Total earnings
  - Total courts
  - Total users
  - Total members
  - Count of pending, approved, and confirmed bookings
- Charts visualize earnings and court activity
- Admin badge in profile

#### 📋 Manage Bookings
- View all pending booking requests
- Approve or reject bookings
- State handled with loading and “no data” visuals

#### 🎮 Manage Courts
- Add new courts
- Edit existing courts
- Delete courts

#### 💳 Manage Coupons
- Add new coupons
- Edit coupons
- Delete coupons

#### 🧑‍🤝‍🧑 Manage Users & Members
- View all registered users
- Search users by name
- Manage members separately
- Promote or demote admins

#### 📣 Manage Announcements
- Add new announcements
- Edit existing announcements
- Delete announcements
- Send updates directly to users/members

#### 📩 Notifications
- Real-time notifications for:
  - Booking approvals/rejections
  - Payments
  - Announcements
  - Admin messages

---

## ⚙️ Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - DaisyUI
  - Lottie animations
  - Framer Motion
  - React Icons
  - React Leaflet
  - React Router
  - React Paginate
  - Stripe.js for payments
- **State Management:**
  - React Context
  - TanStack Query
- **Backend & Auth:**
  - Node.js / Express
  - MongoDB
  - Firebase Auth
  - Axios with Interceptors

---

## 🛠 Packages Used

- axios
- @tanstack/react-query
- framer-motion
- lottie-react
- react-router-dom
- react-icons
- react-paginate
- stripe-js
- react-leaflet
- daisyui
- tailwindcss

---

## 📝 Summary of Outcome

✅ Successfully built a modern, single-club management system with:
- Seamless user journey from browsing to payment
- Rich admin functionality for club operations
- Clean, responsive UI with animations
- Real-time data updates
- Secure architecture combining Firebase & MongoDB

---

## 💡 Possible Improvements

- Real-time chat between members and admin
- In-app notifications instead of only toast messages
- Advanced analytics for admin (e.g. heatmaps)
- SMS/email notifications for bookings
- Deep link support for booking modals
- Multi-language support

---

**PulsePlay** brings the entire sports club experience online with powerful admin tools, elegant UI, and seamless management of courts, users, and payments!

> 🔥 **PulsePlay** offers an all-in-one digital transformation for sports club operations, combining usability, security, and control with modern technologies.

---

**Made with 💚 by Md.Akram Hossen Sujan**
