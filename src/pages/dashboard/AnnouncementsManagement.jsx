import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import LoadingMiddle from "../../shared/LoadingMiddle";
import NoData from "../../shared/NoData";

const AnnouncementsManagement = () => {
    const secureAxios = useSecureAxios();
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        message: "",
        type: "",
    });
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    // GET announcements from query operation
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ["announcements"],
        queryFn: async () => {
            const res = await secureAxios.get("/announcements");
            return res.data;
        },
    });

    // ADD announcement by useMutation
    const addMutation = useMutation({
        mutationFn: async (announcementData) => {
            return secureAxios.post("/announcements", announcementData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["announcements"]);
            Swal.fire("Success", "Announcement added successfully", "success");
            setShowModal(false);
            setNewAnnouncement({
                title: "",
                message: "",
                type: "",
            });
        },
        onError: () => {
            Swal.fire("Error", "Could not add announcement", "error");
        },
    });

    // DELETE announcement by useMutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return secureAxios.delete(`/announcements/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["announcements"]);
            Swal.fire("Deleted!", "Announcement has been deleted.", "success");
        },
        onError: () => {
            Swal.fire("Error", "Could not delete announcement", "error");
        },
    });
    //Update call here by mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            return secureAxios.put(`/announcements/${id}`, updatedData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["announcements"]);
            Swal.fire("Updated!", "Announcement updated successfully.", "success");
            setEditingAnnouncement(null);
        },
        onError: () => {
            Swal.fire("Error", "Could not update announcement", "error");
        },
    });
    //Here update announcement by handleUpdateAnnouncement
    const handleUpdateAnnouncement = (e) => {
        e.preventDefault();

        if (
            !editingAnnouncement.title ||
            !editingAnnouncement.message ||
            !editingAnnouncement.type
        ) {
            return Swal.fire("Warning", "All fields are required", "warning");
        }

        updateMutation.mutate({
            id: editingAnnouncement._id,
            updatedData: {
                title: editingAnnouncement.title,
                message: editingAnnouncement.message,
                type: editingAnnouncement.type,
            },
        });
    };


    // Add announcement by handleAddAnnouncement
    const handleAddAnnouncement = (e) => {
        e.preventDefault();
        if (!newAnnouncement.title || !newAnnouncement.message || !newAnnouncement.type) {
            return Swal.fire("Warning", "All fields are required", "warning");
        }
        addMutation.mutate(newAnnouncement);
    };

    // Delete announcement by handleDelete
    const handleDelete = (id, title) => {
        Swal.fire({
            title: `Delete announcement "${title}"?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-extrabold">
                    Manage Announcements
                </h2>
                <button
                    className="btn btn-outline dark:text-green-400"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Add Announcement
                </button>
            </div>
            <p className="text-gray-500 mb-6 italic">
                Keep your users informed with timely announcements. Use different types
                to classify updates, e.g. User Updates, Court Updates, or Deadlines.
            </p>

            {isLoading ? (
                <LoadingMiddle />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full text-sm md:text-base">
                        <thead className="bg-gray-200 dark:bg-gray-800">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Type</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((announcement, index) => (
                                <tr key={announcement._id} className="hover">
                                    <td>{index + 1}</td>
                                    <td className="font-semibold text-green-700">
                                        {announcement.title}
                                    </td>
                                    <td>{announcement.message}</td>
                                    <td>
                                        <span className="font-bold">
                                            {announcement.type}
                                        </span>
                                    </td>
                                    <td>{dayjs(announcement.createdAt).format("MMM D, YYYY h:mm A")}</td>
                                    <td className="flex gap-2">
                                        <button
                                            className="btn btn-xs btn-outline btn-primary"
                                            onClick={() => setEditingAnnouncement(announcement)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="btn btn-xs btn-outline btn-error"
                                            onClick={() =>
                                                handleDelete(announcement._id, announcement.title)
                                            }
                                        >
                                            <FaTrash /> {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            {announcements.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center text-gray-400 py-10">
                                        <NoData />
                                        No announcements available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4 text-green-600">
                            Add New Announcement
                        </h3>
                        <form onSubmit={handleAddAnnouncement} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    value={newAnnouncement.title}
                                    onChange={(e) =>
                                        setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                                    }
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={newAnnouncement.message}
                                    onChange={(e) =>
                                        setNewAnnouncement({ ...newAnnouncement, message: e.target.value })
                                    }
                                    className="textarea textarea-bordered w-full"
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Type</span>
                                </label>
                                <div className="space-y-2">
                                    {["User update", "Court update", "Deadline update", "Maintenance", "Other"].map(
                                        (option) => (
                                            <label key={option} className="flex gap-2 items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    checked={newAnnouncement.type === option}
                                                    onChange={(e) =>
                                                        setNewAnnouncement({
                                                            ...newAnnouncement,
                                                            type: e.target.value,
                                                        })
                                                    }
                                                    className="radio radio-success"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={addMutation.isLoading}
                                >
                                    {addMutation.isLoading ? "Saving..." : "Add Announcement"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {editingAnnouncement && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4 text-green-600">
                            Edit Announcement
                        </h3>
                        <form onSubmit={handleUpdateAnnouncement} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    value={editingAnnouncement.title}
                                    onChange={(e) =>
                                        setEditingAnnouncement({
                                            ...editingAnnouncement,
                                            title: e.target.value,
                                        })
                                    }
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={editingAnnouncement.message}
                                    onChange={(e) =>
                                        setEditingAnnouncement({
                                            ...editingAnnouncement,
                                            message: e.target.value,
                                        })
                                    }
                                    className="textarea textarea-bordered w-full"
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Type</span>
                                </label>
                                <div className="space-y-2">
                                    {[
                                        "User update",
                                        "Court update",
                                        "Deadline update",
                                        "Maintenance",
                                        "Other",
                                    ].map((option) => (
                                        <label
                                            key={option}
                                            className="flex gap-2 items-center cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={editingAnnouncement.type === option}
                                                onChange={(e) =>
                                                    setEditingAnnouncement({
                                                        ...editingAnnouncement,
                                                        type: e.target.value,
                                                    })
                                                }
                                                className="radio radio-success"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingAnnouncement(null)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={updateMutation.isLoading}
                                >
                                    {updateMutation.isLoading ? "Updating..." : "Update Announcement"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AnnouncementsManagement;
