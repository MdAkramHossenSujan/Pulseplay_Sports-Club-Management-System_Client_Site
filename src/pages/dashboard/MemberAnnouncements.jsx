import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import dayjs from "dayjs";
import LoadingMiddle from "../../shared/LoadingMiddle";
import NoData from "../../shared/NoData";
import { FaBullhorn } from "react-icons/fa";

const MemberAnnouncements = () => {
  const secureAxios = useSecureAxios();
  useEffect(() => {
    document.title = `Announcements | Dashboard | PulsePlay`; 
    window.scrollTo(0, 0); 
  }, []);
  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await secureAxios.get("/announcements");
      return res.data;
    },
  });

  return (
    <div className="p-6 lg:py-20">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-2">
        <FaBullhorn /> Latest Announcements
      </h2>
      <p className="text-gray-500 mb-6 italic">
        Stay informed about new updates, court changes, deadlines, and important news. Check regularly for the latest information!
      </p>

      {isLoading ? (
        <LoadingMiddle />
      ) : announcements.length === 0 ? (
        <NoData text="No announcements available at the moment." />
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="border border-gray-400 rounded-xl p-4 dark:border-green-700 shadow hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-bold dark:text-green-700 mb-2">
                {announcement.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {announcement.message}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                <span className="badge badge-outline ">
                  {announcement.type}
                </span>
                <span>{dayjs(announcement.createdAt).format("MMM D, YYYY h:mm A")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberAnnouncements;
