import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import Loading from "../../shared/Loading";
import ReactPaginate from "react-paginate";
import NoData from "../../shared/NoData";

const UserManagement = () => {
    const secureAxios = useSecureAxios();
    //Get data from usersCollection through tanstack query
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await secureAxios.get("/users");
            return res.data;
        },
    });
    //Searching state declared and page state declared
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 10;

    // Filter users based on search term
    //Used useMemo to save each search to avoid rerendering
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Pagination logic
    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
//How many users to display through slice logic and page state
    const displayedUsers = useMemo(() => {
        const startIndex = currentPage * usersPerPage;
        return filteredUsers.slice(startIndex, startIndex + usersPerPage);
    }, [filteredUsers, currentPage, usersPerPage]);

    //Pagination logic to set which page to show
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="mx-auto p-6 lg:py-18">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                        All the users
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        View and manage all registered users in one place. Monitor user details, roles, and activity for efficient administration and control.
                    </p>

                    {/* Search Field */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);//Name/Email search
                                setCurrentPage(0); // reset to first page when searching
                            }}
                            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-100"
                        />
                    </div>
{/*Table to display users data */}
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-200 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Profile
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Last Logged In
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {/*Displaying users data */}
                                {displayedUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                                            {currentPage * usersPerPage + index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100 font-semibold capitalize">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {user.created_at
                                                ? new Date(user.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                                : "-"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {user.last_logged_in
                                                ? new Date(user.last_logged_in).toLocaleString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : "-"}
                                        </td>
                                    </tr>
                                ))}
                                {/*If no users found, display this message */}
                                {displayedUsers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-4 text-center text-gray-600 dark:text-gray-400"
                                        >
                                            <NoData/>
                                            There is no user in your website
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <div className="mt-8 flex justify-center">
                            <ReactPaginate
                                previousLabel={"← Previous"}
                                nextLabel={"Next →"}
                                breakLabel={"..."}
                                onPageChange={handlePageChange}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                containerClassName={"flex gap-2"}
                                pageClassName={"px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 cursor-pointer"}
                                activeClassName={"bg-primary-500 text-white dark:bg-primary-600"}
                                previousClassName={"px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 cursor-pointer"}
                                nextClassName={"px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600 cursor-pointer"}
                                disabledClassName={"opacity-50 cursor-not-allowed"}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default UserManagement;

