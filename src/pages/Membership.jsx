import React, { useEffect } from "react";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const advantages = [
  "Priority booking for courts and sessions",
  "Exclusive member-only discounts and coupons",
  "Access to special events and tournaments",
  "Real-time notifications and personalized announcements",
  "Ability to track payment history and booking statuses",
  "Profile customization including photo uploads",
  "Seamless payment via integrated Stripe gateway",
  "Support from dedicated club administration",
];

const processSteps = [
  "Register or log in to your PulsePlay account.",
  "Browse courts and submit a booking request.",
  "Wait for admin approval of your booking.",
  "Upon approval, your membership will be activated.",
  "Make payment securely via Stripe to confirm booking.",
  "Enjoy full member benefits and track your activity on your dashboard.",
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Membership = () => {
  useEffect(() => {
    document.title = `Membership | PulsePlay`; 
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-12">
        Become a PulsePlay Member
      </h1>

      {/* Advantages Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200 text-center">
          🌟 Advantages of Being a Member
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-start gap-4 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
              <p className="text-gray-700 dark:text-gray-300 font-medium">{adv}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200 text-center">
          🔄 Membership Process
        </h2>

        <motion.ol
          className="space-y-6 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ listStyleType: "decimal" }}
        >
          {processSteps.map((step, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md cursor-default"
              variants={cardVariants}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaArrowRight
                className="text-green-500 mt-1 flex-shrink-0"
                size={20}
                aria-hidden="true"
              />
              <p className="text-gray-700 dark:text-gray-300 font-medium">{step}</p>
            </motion.li>
          ))}
        </motion.ol>
      </section>
    </div>
  );
};

export default Membership;

