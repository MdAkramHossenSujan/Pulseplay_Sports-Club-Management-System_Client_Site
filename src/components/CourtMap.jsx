import React from "react";
import map from "../assets/Logo/Screenshot 2025-07-13 195846.png";
import "aos/dist/aos.css";
import { Link } from "react-router";

const CourtMapImage = () => {
    

    return (
        <div
            className="max-w-[1200px] mx-auto px-6 md:px-10 pb-6 space-y-10"
            data-aos="fade-up"
        >
            {/* Divider + Title */}
            <div
                className="divider text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100"
                data-aos="fade-down"
            >
                Our Main Office
            </div>

            {/* Address */}
            <div className="text-center space-y-2" data-aos="fade-up" data-aos-delay="100">
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                        Headquarters:
                    </span>{" "}
                    House #12, Road #34, Gulshan-2, Dhaka-1212, Bangladesh
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    Visit our office for inquiries, partnerships, or booking assistance. We’re open Sunday to Thursday, 10 AM – 6 PM.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                        Email:
                    </span>{" "}
                    info@pulseplaybd.com &nbsp;|&nbsp;
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                        Phone:
                    </span>{" "}
                    +880 123 456 7890
                </p>
            </div>

            {/* Map Image */}
            <div data-aos="zoom-in" data-aos-delay="100">
               <Link to={'/findInMap'}>
               <img
                    className="rounded-2xl mx-auto shadow-lg"
                    src={map}
                    alt="Club Location Map"
                />
               </Link>
            </div>
        </div>
    );
};

export default CourtMapImage;



