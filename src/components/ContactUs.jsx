import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";
import image from "../assets/StackSlider/pexels-vladimirsrajber-25287801.jpg";

export default function ContactUs() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:block"
        >
          <img
            src={image}
            alt="Contact Us"
            className="w-full h-[600px] object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className=" p-8"
        >
          {/* Title */}
          <h2 className="text-4xl font-bold mb-6 text-center md:text-left">
            Contact Admin
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-center md:text-left">
            Have questions or need support? Fill out the form below and our
            team will get back to you shortly.
          </p>

          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <FaUser className="text-blue-600" /> Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <FaEnvelope className="text-blue-600" /> Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-700">
                <FaCommentDots className="text-blue-600" /> Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
