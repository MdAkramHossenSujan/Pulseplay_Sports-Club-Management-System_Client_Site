import { useQuery } from "@tanstack/react-query";
import React from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { format } from "date-fns";
import { FaBullhorn } from "react-icons/fa";

const UserAnnouncements = () => {
    const secureAxios = useSecureAxios();

    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await secureAxios.get("/announcements", {
                params: { type: "Court update" },
            });
            return res.data;
        },
    });

    return (
        <div className="mx-auto p-6 lg:py-18 md:px-10">
            <div className="mb-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-3">
                    <FaBullhorn className="text-green-600" />
                    Court Announcements
                </h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                    Stay informed about important updates related to court availability,
                    maintenance schedules, surface renovations, or changes in operating hours.
                    Check this page regularly so you never miss an announcement about your
                    favorite courts.
                </p>
            </div>


            {isLoading && (
                <p className="text-gray-600 dark:text-gray-300">Loading announcements…</p>
            )}

            {!isLoading && announcements.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No court updates found.</p>
            )}

            <div className="grid gap-6 grid-cols-1">
                {announcements.map((announcement) => (
                    <div
                        key={announcement._id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
                    >
                        <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                            {announcement.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                            {announcement.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Posted on:{" "}
                            {format(new Date(announcement.createdAt?.$date?.$numberLong || announcement.createdAt), "PPpp")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserAnnouncements;
