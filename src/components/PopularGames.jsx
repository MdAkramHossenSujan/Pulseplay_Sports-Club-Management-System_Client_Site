import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import "aos/dist/aos.css";

const PopularGames = () => {
    const [activeType, setActiveType] = useState(null);
    const axiosInstance = useAxios();



    const { data, isLoading, error } = useQuery({
        queryKey: ["courts"],
        queryFn: async () => {
            const res = await axiosInstance.get("/courts");
            return res.data;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong!</p>;

    const uniqueTypes = ["Football", "Cricket", "Badminton"];
    const currentType = activeType || uniqueTypes[0];

    const filteredCourts = data
        .filter((item) => item.courtType === currentType)
        .slice(0, 3);

    return (
        <div className="max-w-7xl relative mx-auto p-6 md:px-12">
            <h2
                className="text-3xl font-extrabold mb-8 caveat-brush-regular text-gray-600 dark:text-gray-300"
                data-aos="fade-down"
            >
                Popular Courts Based on Trending Sports
            </h2>


            {/* Tabs for Small & Medium (Top Horizontal) */}
            <div
                className="flex lg:hidden justify-center mb-6 overflow-hidden "
                data-aos="fade-up"
            >
                {uniqueTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`px-5 py-2 font-semibold text-lg cursor-pointer ${currentType === type
                                ? "bg-green-600 text-white"
                                : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row justify-between px-2">
                {/* Cards */}
                <div
                    className="
            grid 
            grid-cols-1
            lg:grid-cols-3
            gap-8
            flex-grow
          "
                >
                    {filteredCourts.map((court, index) => (
                        <div
                            key={court._id}
                            className="rounded-lg w-full overflow-hidden shadow border border-gray-300 dark:border-gray-700 hover:shadow-lg dark:shadow-gray-800 transition"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                        >
                            <div className="relative">
                                <img
                                    src={court.courtImage}
                                    alt={court.courtName}
                                    className="w-full h-60 object-cover"
                                />
                                <div className="absolute inset-0 dark:bg-black/30 bg-black/10 rounded-lg" />
                            </div>
                            <div className="py-2 px-6 flex lg:flex-col lg:text-center justify-between">
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100">
                                    {court.courtName}
                                </h3>
                                <p className="text-gray-600 lg:text-3xl dark:text-gray-400 text-2xl">
                                    {court.city}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs for Large+ (Vertical Right) */}
                <div
                    className="hidden absolute right-0 lg:flex flex-col rounded-r-2xl overflow-hidden"
                    data-aos="fade-left"
                >
                    {uniqueTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`
              w-12 h-28 flex items-center justify-center
              font-semibold xl:text-lg
              ${currentType === type
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer"
                                }
            `}
                        >
                            <span
                                className="block text-center transform rotate-90"
                            >
                                {type}
                            </span>
                        </button>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularGames;




