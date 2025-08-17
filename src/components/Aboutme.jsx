import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import one from '../assets/StackSlider/Untitled-design--10-.jpg';
import two from '../assets/StackSlider/Goalster-sports-Arena-.-Goregoan-Sports-Club-Indoor-Cricket-Nets-4.jpg';
import three from '../assets/StackSlider/istockphoto-1403780865-612x612.jpg';

const AboutClub = () => {
  const [activeTab, setActiveTab] = useState("history");

  const tabVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className='lg:max-w-[1400px] md:max-w-4xl mx-auto'>

      {/* IMAGES SECTION */}
      <motion.div
        className="lg:py-32 px-12 lg:px-0 py-16 flex items-center lg:justify-center md:gap-8 lg:gap-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Image 1 */}
        <motion.div
          className="lg:w-72 md:w-60 md:h-60 w-48 h-48 relative lg:h-72 rounded-full overflow-hidden shadow-lg ring-4 ring-gray-300 dark:ring-green-900"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={one}
            alt="About Club 1"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 dark:bg-black/30 bg-black/10" />
        </motion.div>

        {/* Image 2 */}
        <motion.div
          className="lg:w-72 md:w-60 md:h-60 w-48 h-48 relative lg:h-72 rounded-full overflow-hidden shadow-lg ring-4 ring-gray-300 dark:ring-green-900 lg:-mt-24"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={two}
            alt="About Club 2"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 dark:bg-black/30 bg-black/10" />
        </motion.div>

        {/* Image 3 */}
        <motion.div
          className="lg:w-72 md:w-60 md:h-60 w-48 h-48 relative lg:h-72 rounded-full overflow-hidden shadow-lg ring-4 ring-gray-300 dark:ring-green-900"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={three}
            alt="About Club 3"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 dark:bg-black/30 bg-black/10" />
        </motion.div>
      </motion.div>

      {/* TABS + CONTENT */}
      <div>
        <div className="w-full lg:-mt-28 ">
          {/* TABS HEADER */}
          <div role="tablist" className="tabs tabs-bordered flex justify-center permanent-marker-regular">
            <a
              role="tab"
              className={`tab text-2xl text-gray-500 dark:text-gray-300 ${activeTab === "history" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              History
            </a>
            <a
              role="tab"
              className={`tab text-2xl text-gray-500 dark:text-gray-300 ${activeTab === "mission" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("mission")}
            >
              Mission
            </a>
            <a
              role="tab"
              className={`tab text-2xl text-gray-500 dark:text-gray-300 ${activeTab === "vision" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("vision")}
            >
              Vision
            </a>
          </div>

          {/* TAB CONTENT */}
          <div className="p-6 text-center max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <h3 className="text-3xl font-extrabold mb-4 caveat-brush-regular  text-gray-700 dark:text-gray-300">
                    Our History
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                    Founded in 2020, PulsePlay began as a passion project among sports
                    enthusiasts who saw the need for a seamless way to book courts and manage
                    sports activities. From a modest startup, we grew rapidly, driven by our
                    community’s love for sports and technology. Over the years, we’ve expanded
                    to partner with numerous clubs, introduced real-time availability features,
                    and rolled out innovative tools to enhance the booking experience for
                    players of all levels.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                    Today, PulsePlay stands as a trusted platform used by thousands of sports
                    lovers, transforming how people engage with their favorite sports and
                    fostering vibrant communities around athletic pursuits.
                  </p>
                </motion.div>
              )}

              {activeTab === "mission" && (
                <motion.div
                  key="mission"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <h3 className="text-3xl font-extrabold caveat-brush-regular  mb-4 text-gray-700 dark:text-gray-300">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                    Our mission is to connect people to the world of sports through technology
                    that simplifies court bookings, fosters community, and promotes active
                    lifestyles. We believe everyone should have access to high-quality sports
                    facilities and an effortless way to organize their sporting activities.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                    Whether you’re a seasoned athlete, a coach, or simply someone looking to
                    enjoy a friendly game on the weekend, PulsePlay empowers you to reserve
                    courts, join exciting events, and stay informed — all in one place.
                  </p>
                </motion.div>
              )}

              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h3 className="text-3xl font-extrabold caveat-brush-regular  mb-4 text-gray-700 italic dark:text-gray-300">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    At PulsePlay, we envision a future where sports are universally accessible,
                    where technology seamlessly connects players, clubs, and communities. We aim
                    to be more than just a booking platform — we want to become the pulse of the
                    sports world, inspiring people to stay active, pursue their passions, and
                    build meaningful connections through sports.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                    As we continue to innovate, our goal is to expand our reach globally,
                    offering unparalleled convenience and fostering a vibrant ecosystem where
                    every player feels like they belong.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutClub;


