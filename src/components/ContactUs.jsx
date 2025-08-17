import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import image from '../assets/StackSlider/pexels-vladimirsrajber-25287801.jpg'
export default function ContactUs() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Contact Admin
        </motion.h2>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaUser /> Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FaCommentDots /> Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
