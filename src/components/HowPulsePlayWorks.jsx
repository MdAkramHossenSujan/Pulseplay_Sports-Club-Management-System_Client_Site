import React from "react";
import useUserData from "../hooks/useUserData";
import {
  ShieldCheck,
  MapPin,
  CalendarDays,
  CreditCard,
  UserPlus,
  BadgePercent,
} from "lucide-react";
import { motion } from "framer-motion";
import Loading from "../shared/Loading";

const RoleFeatures = () => {
  const { role, isLoading } = useUserData();

  const featuresByRole = {
    user: [
      {
        icon: MapPin,
        title: "Find Nearby Courts",
        desc: "Locate sports courts in your vicinity using real-time map services integrated into PulsePlay.",
      },
      {
        icon: CalendarDays,
        title: "Book Slots Instantly",
        desc: "Choose from available time slots and secure your court bookings instantly with just a few clicks.",
      },
      {
        icon: CreditCard,
        title: "Make Secure Payments",
        desc: "Pay for your sessions using trusted payment gateways, ensuring quick and secure transactions.",
      },
      {
        icon: ShieldCheck,
        title: "Real-Time Slot Navigation",
        desc: "Easily view and manage upcoming bookings, cancellations, and timing — all from your dashboard.",
      }
    ],
    member: [
      {
        icon: MapPin,
        title: "Find Premium Courts",
        desc: "Access exclusive courts and enjoy a more premium experience reserved for members only.",
      },
      {
        icon: CalendarDays,
        title: "Faster Booking Flow",
        desc: "Enjoy priority slots and seamless reservation with minimum hassle and faster confirmations.",
      },
      {
        icon: CreditCard,
        title: "Secure Member Payments",
        desc: "Benefit from stored payment options, faster checkout, and invoice tracking tailored to members.",
      },
      {
        icon: ShieldCheck,
        title: "Manage Schedules Effortlessly",
        desc: "Get automated reminders and insights into your playing habits to better manage your time.",
      }
    ],
    admin: [
      {
        icon: CalendarDays,
        title: "Add & Register Courts",
        desc: "Easily onboard new courts with full details including slot schedules, pricing, and images.",
      },
      {
        icon: ShieldCheck,
        title: "Manage Court Operations",
        desc: "Edit slots, manage bookings, disable unavailable courts, and stay in control of operations.",
      },
      {
        icon: BadgePercent,
        title: "Control Coupon System",
        desc: "Create and manage targeted coupons to attract users and boost off-peak engagement.",
      },
      {
        icon: UserPlus,
        title: "Oversee Memberships",
        desc: "Approve new member applications, monitor current subscriptions, and revoke privileges as needed.",
      },
    ],
  };

  const features = featuresByRole[role] || [];

  if (isLoading) {
    return <Loading />;
  }

  // New single-entry animation for icons (no infinite repeat)
  const iconAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: {
      scale: 1,
      opacity: 1,
      filter: "drop-shadow(0 0 5px rgba(255,255,255,0.6))",
      transition: { duration: 0.6, ease: "easeOut" },
    },
    viewport: { once: true },
  };

  return (
    <section className="py-10 lg:py-14 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-center mb-12 text-gray-700 dark:text-gray-200"
      >
        How You’ll Access PulsePlay
      </motion.h2>

      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
      >
        {features.map(({ icon: Icon, title, desc }, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow hover:shadow-xl transition"
          >
            <motion.div
              {...iconAnimation}
              className="inline-block text-gray-800 dark:text-white mb-4"
            >
              <Icon size={36} />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default RoleFeatures;




