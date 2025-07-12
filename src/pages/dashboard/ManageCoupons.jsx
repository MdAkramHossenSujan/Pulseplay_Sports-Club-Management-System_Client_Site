import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useSecureAxios from "../../hooks/useSecureAxios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import NoData from "../../shared/NoData";
import LoadingMiddle from "../../shared/LoadingMiddle";

const ManageCoupons = () => {
    const secureAxios = useSecureAxios();
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [newCoupon, setNewCoupon] = useState({
        couponName: "",
        couponValue: "",
    });

    // GET coupons first using queryKey TanStack Query stores the fetched coupons data under that key  and then queryFn to get the coupons
    const { data: coupons = [], isLoading } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await secureAxios.get("/coupons");
            return res.data;
        },
    });

    // ADD coupon,And refetch the coupons by using invalidQueries (Stored By the name ['coupons'])
    const addMutation = useMutation({
        mutationFn: async (couponData) => {
            return secureAxios.post("/coupons", couponData);
        },
        onSuccess: () => {
            //Manual InvalidQueries Refetching the coupons using queryClient
            queryClient.invalidateQueries(["coupons"]);
            Swal.fire("Success", "Coupon added successfully", "success");
            setShowModal(false);
            setNewCoupon({ couponName: "", couponValue: "" });
        },
        onError: () => {
            Swal.fire("Error", "Could not add coupon", "error");
        },
    });

    // DELETE coupon onSuccess Calls queryClient
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return secureAxios.delete(`/coupons/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
            Swal.fire("Deleted!", "Coupon has been deleted.", "success");
        },
        onError: () => {
            Swal.fire("Error", "Could not delete coupon", "error");
        },
    });
    //Update coupon by mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            return secureAxios.put(`/coupons/${id}`, updatedData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
            Swal.fire("Updated!", "Coupon updated successfully.", "success");
            setEditingCoupon(null);
        },
        onError: () => {
            Swal.fire("Error", "Could not update coupon", "error");
        },
    });

    //Submitting and Clicking on addCoupon then this function calls a post request to the server by addMutation
    const handleAddCoupon = (e) => {
        e.preventDefault();
        if (!newCoupon.couponName || !newCoupon.couponValue) {
            return Swal.fire("Warning", "All fields are required", "warning");
        }
        addMutation.mutate(newCoupon);
    };
    //By clicking on delete button this function calls a delete request to the server by deleteMutation
    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Delete coupon "${name}"?`,
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
    //Update coupon by handleUpdateCoupon
    const handleUpdateCoupon = (e) => {
        e.preventDefault();

        if (
            !editingCoupon.couponName ||
            editingCoupon.couponValue === "" ||
            isNaN(editingCoupon.couponValue)
        ) {
            return Swal.fire("Warning", "All fields are required", "warning");
        }

        updateMutation.mutate({
            id: editingCoupon._id,
            updatedData: {
                couponName: editingCoupon.couponName,
                couponValue: Number(editingCoupon.couponValue),
            },
        });
    };

    // queryKey = name tag for your data.
    //Helps TanStack Query identify it
    //Keeps it separate from other queries
    //Makes refetching and caching work properly
    return (
        <div className="p-6 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-extrabold mb-4">
                        Manage Coupons
                    </h2>
                    <p className="text-gray-600 max-w-2xl">
                        Here you can manage all discount coupons available in your system.
                        Add new coupons to offer promotions, or edit and remove existing ones
                        to keep your offers up to date. Use the buttons below to perform actions
                        on your coupon records.
                    </p>


                </div>
                {/*Clicking The button Will Open a modal */}
                <button
                    className="btn btn-outline dark:text-green-400 flex items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Add Coupon
                </button>
            </div>
            {/* If the data is loading then show the loading animation then Show the table */}
            {isLoading ? <div>
                <LoadingMiddle />
            </div> : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-200 dark:bg-gray-800">
                            <tr>
                                <th>#</th>
                                <th>Coupon Name</th>
                                <th>Value ($)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon, index) => (
                                <tr key={coupon._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-semibold text-green-700">
                                        {coupon.couponName}
                                    </td>
                                    <td className="text-green-600">
                                        {coupon.couponValue}%
                                    </td>
                                    <td className="flex gap-2">
                                        <button
                                            className="btn btn-xs btn-outline btn-primary flex items-center gap-1"
                                            onClick={() => handleUpdateCoupon(coupon)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="btn btn-xs btn-outline btn-error flex items-center gap-1"
                                            onClick={() =>
                                                handleDelete(coupon._id, coupon.couponName)
                                            }
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {coupons.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center text-gray-500 py-8">
                                        <NoData />
                                        You Have no coupons,Make some coupons to attract customers.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Coupon Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-green-700 mb-4">
                            Add New Coupon
                        </h3>
                        <form onSubmit={handleAddCoupon} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Coupon Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={newCoupon.couponName}
                                    onChange={(e) =>
                                        setNewCoupon({ ...newCoupon, couponName: e.target.value })
                                    }
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Coupon Value ($)</span>
                                </label>
                                <input
                                    type="number"
                                    value={newCoupon.couponValue}
                                    onChange={(e) =>
                                        setNewCoupon({ ...newCoupon, couponValue: e.target.value })
                                    }
                                    className="input input-bordered w-full"
                                    required
                                    min={1}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success">
                                    Add Coupon
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Edit coupon modal by handleUpdateCoupon */}
            {editingCoupon && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-green-600">
                            Edit Coupon
                        </h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!editingCoupon.couponName || !editingCoupon.couponValue) {
                                    return Swal.fire("Warning", "All fields are required", "warning");
                                }
                                updateMutation.mutate({
                                    id: editingCoupon._id,
                                    updatedData: {
                                        couponName: editingCoupon.couponName,
                                        couponValue: parseInt(editingCoupon.couponValue),
                                    },
                                });
                            }}
                            className="space-y-4"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Coupon Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={editingCoupon.couponName}
                                    onChange={(e) =>
                                        setEditingCoupon({
                                            ...editingCoupon,
                                            couponName: e.target.value,
                                        })
                                    }
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Coupon Value</span>
                                </label>
                                <input
                                    type="number"
                                    value={editingCoupon.couponValue}
                                    onChange={(e) =>
                                        setEditingCoupon({
                                            ...editingCoupon,
                                            couponValue: e.target.value,
                                        })
                                    }
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingCoupon(null)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={updateMutation.isLoading}
                                >
                                    {updateMutation.isLoading ? "Updating..." : "Update Coupon"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ManageCoupons;
