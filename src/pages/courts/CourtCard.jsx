import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import CourtBookingModal from "./CourtBookingModal";
import { BadgePercent, Clock, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const CourtCard = ({ court }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {user}=useAuth()
  const navigate=useNavigate()
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
        className="bg-base-100 max-w-7xl lg:h-76 mx-auto border border-gray-200 rounded-lg shadow overflow-hidden flex flex-col md:flex-row mb-8"
      >
        {/* Left - Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <motion.img
            src={court.courtImage}
            alt={court.courtName}
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 w-full px-6 py-12 justify-between">
          <div className="space-y-2">
            <motion.h3
              className="text-3xl font-bold text-green-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {court.courtName}
            </motion.h3>

            <div className="flex flex-wrap gap-2">
              <span className="badge badge-success gap-1">
                <BadgeCheck size={16} /> Available
              </span>

              <span className="badge badge-outline gap-1">
                {court.courtType}
              </span>

             
            </div>

            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">
              <Clock className="mb-6 md:mb-0" size={18} />
              <span>
                Slots:&nbsp;
                {court.slots.slice(0, 3).join(", ")}
                {court.slots.length > 3 && " ..."}
              </span>
            </div>

            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-2">
              Price per Session:{" "}
              <span className="text-green-600">${court.pricePerSession}</span>
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen(true)}
              className="btn bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
     {
      user ?
      <CourtBookingModal
        court={court}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      : navigate('/login')
     }
    </>
  );
};

export default CourtCard;

