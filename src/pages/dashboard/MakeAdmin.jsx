import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import { FaUserShield, FaTrash, FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Loading from "../../shared/Loading";

const MakeAdmin = () => {
    const secureAxios = useSecureAxios();
    const queryClient = useQueryClient();

    // State for search
    const [searchTerm, setSearchTerm] = useState("");
    // Load users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users", searchTerm],
        queryFn: async () => {
            const res = await secureAxios.get("/users", {
                params: searchTerm ? { search: searchTerm } : {},
            });
            return res.data;
        },
    });


    // Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return [];
        return users.filter(
            (user) =>
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentItems = filteredUsers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Handle page click
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    // Make admin mutation
    const toggleAdminMutation = useMutation({
        mutationFn: async ({ id, newRole }) => {
            return secureAxios.patch(`/users/${id}`, { role: newRole });
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "User role updated successfully!",
            });
            queryClient.invalidateQueries(["users"]);
        },
    });

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: async (id) => {
            return secureAxios.delete(`/users/${id}`);
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "User deleted successfully!",
            });
            queryClient.invalidateQueries(["users"]);
        },
    });

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-4xl font-extrabold mb-4">Manage Users</h2>

            {/* Search bar */}
            <div className="flex items-center border rounded px-3 py-2 w-full md:w-1/3 mb-6">
                <FaSearch className="text-green-600 mr-2" />
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="flex-1 outline-none bg-transparent text-gray-700 dark:text-gray-200"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(0);
                    }}
                />
            </div>
            {
                isLoading && <Loading/>
            }
            {/* User Data With Search */}
            {/* No search results */}
            {filteredUsers.length === 0 && searchTerm && (
                <p className="text-center text-red-500 py-6 font-semibold">
                    No users found matching “{searchTerm}”
                </p>
            )}

            {/* No search typed yet */}
            {!searchTerm && (
                <p className="text-center text-gray-500 italic py-6">
                    Type something to search for users...
                </p>
            )}

            {/* Table only if results exist */}
            {currentItems.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="border dark:border-green-600">
                                <th>#</th>
                                <th>User Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user, idx) => (
                                <tr key={user._id}>
                                    <td>{currentPage * itemsPerPage + idx + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-full ring dark:ring-green-600 ring-offset-base-100 ring-offset-2">
                                                <img src={user.image} alt={user.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`font-semibold ${user.role === "admin" ? "text-red-500" : ""
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="flex gap-2 items-center my-2 justify-center">
                                        {user.role !== "admin" ? (
                                            <button
                                                className="btn btn-outline border-green-600 text-green-600 btn-sm flex items-center gap-2"
                                                onClick={() =>
                                                    Swal.fire({
                                                        title: "Are you sure?",
                                                        text: "This user will become an admin!",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: "#16A34A",
                                                        cancelButtonColor: "#d33",
                                                        confirmButtonText: "Yes, make admin!",
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            toggleAdminMutation.mutate({
                                                                id: user._id,
                                                                newRole: "admin",
                                                            });
                                                        }
                                                    })
                                                }
                                            >
                                                <FaUserShield /> Make Admin
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline border-yellow-600 text-yellow-600 btn-sm flex items-center gap-2"
                                                onClick={() =>
                                                    Swal.fire({
                                                        title: "Are you sure?",
                                                        text: "This user will be demoted to a regular user!",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: "#d97706",
                                                        cancelButtonColor: "#3085d6",
                                                        confirmButtonText: "Yes, remove admin!",
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            toggleAdminMutation.mutate({
                                                                id: user._id,
                                                                newRole: "user",
                                                            });
                                                        }
                                                    })
                                                }
                                            >
                                                <FaUserShield /> Remove Admin
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-outline text-red-600 border-red-600 btn-sm flex items-center gap-2"
                                            onClick={() =>
                                                Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "This user will be deleted!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#d33",
                                                    cancelButtonColor: "#3085d6",
                                                    confirmButtonText: "Yes, delete it!",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteUserMutation.mutate(user._id);
                                                    }
                                                })
                                            }
                                        >
                                            <FaTrash /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Pagination */}
            {pageCount >= 1 && (
                <ReactPaginate
                    previousLabel={"← Prev"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="flex justify-center mt-8 space-x-2"
                    pageClassName="btn btn-outline btn-sm"
                    activeClassName="btn-success"
                    previousClassName="btn btn-outline btn-sm"
                    nextClassName="btn btn-outline btn-sm"
                    disabledClassName="btn-disabled"
                />
            )}
        </div>
    );
};

export default MakeAdmin;

