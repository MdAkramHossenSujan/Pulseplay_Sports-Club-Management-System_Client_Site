import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import field from "../assets/field.jpg";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router";
import useSecureAxios from "../hooks/useSecureAxios";

const AddCourt = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()
    const [imageURL, setImageURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const secureAxios=useSecureAxios()
    const slotTimes = [
        "08:00 - 09:00",
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
        "17:00 - 18:00",
        "19:00 - 20:00",
        "20:00 - 21:00",
        "21:00 - 22:00",
        "22:00 - 23:00",
        "23:00 - 00:00",
        "00:00 - 01:00",
        "01:00 - 02:00",
    ];
    console.log(imageURL)
    const onSubmit = async (data) => {
        const courtData = {
            courtName: data.name,
            courtType: data.type,
            slots: data.slots || [],
            pricePerSession: data.price,
            courtImage: imageURL,
        };

        // Confirmation modal
        Swal.fire({
            title: "Confirm Court Details",
            html: `
        <p><strong>Name:</strong> ${courtData.courtName}</p>
        <p><strong>Type:</strong> ${courtData.courtType}</p>
        <p><strong>Slots:</strong> ${courtData.slots.join(", ")}</p>
        <p><strong>Price:</strong> $${courtData.pricePerSession}</p>
      `,
            imageUrl: imageURL,
            imageWidth: 200,
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Post Now!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Here is my API call
                console.log("Court saved:", courtData);
                await secureAxios.post('/courts', courtData)
                reset();
                setImageURL("");
                navigate('/courts')
                Swal.fire({
                    icon: "success",
                    title: "Court added successfully",
                    timer: 1200,
                    showConfirmButton: false,
                });
            }
        });
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageUpload_key}`,
                formData
            );
            setImageURL(res.data.data.url);
            toast.success('Image Uploaded')
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Image upload failed.", "error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover py-8 bg-center relative px-6 md:px-10 flex items-center justify-center"
            style={{
                backgroundImage: `url(${field})`,
            }}
        >
            {/* Mask overlay */}
            <div className="absolute inset-0 bg-gradient-to-br backdrop-blur-xs from-black/90 via-green-900/40 to-black/70"></div>

            {/* Form container */}
            <div className="relative z-10 w-full max-w-5xl bg-base-200 backdrop-blur-xl rounded-lg px-8 py-8 shadow-lg">
                <h2 className="text-4xl lg:text-5xl font-bold text-center text-green-600 mb-4">
                    Add New Court
                </h2>
                <div className="text-center max-w-xl italic mx-auto mb-6">
                    <p>
                        Ready to expand your facilities? Use the form below to add a new court to PulsePlay.
                        Provide details like court type, images, and available time slots to keep players in the game!
                    </p>
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div className="form-control space-x-2">
                        <label className="label">
                            <span className="label-text">Court Name </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name of the court"
                            {...register("name", { required: "Court name is required" })}
                            className="input input-bordered"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    {/* Type */}
                    <div className="form-control space-x-2">
                        <label className="label">
                            <span className="label-text">Court Type</span>
                        </label>
                        <select
                            {...register("type", { required: "Court type is required" })}
                            className="select select-bordered"
                        >
                            <option value="">Select type</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Badminton">Badminton</option>
                            <option value="Squash">Squash</option>
                            <option value="Football">Football</option>
                            <option value="Cricket">Cricket</option>
                            <option value="Hockey">Hockey</option>
                            <option value="Volleyball">Volleyball</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Baseball">Baseball</option>
                            <option value="Golf">Golf</option>
                            <option value="Gymnastics">Gymnastics</option>
                            <option value="Swimming">Swimming</option>
                            <option value="Rugby">Rugby</option>
                        </select>
                        {errors.type && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.type.message}
                            </span>
                        )}
                    </div>

                    {/* Slot Times */}
                    <div className="form-control space-y-2">
                        <label className="label">
                            <span className="label-text">Slot Times</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {slotTimes.map((slot) => (
                                <label
                                    key={slot}
                                    className="flex items-center cursor-pointer space-x-2 border border-green-600 rounded p-2 hover:bg-green-50 dark:hover:bg-green-900"
                                >
                                    <input
                                        type="checkbox"
                                        value={slot}
                                        {...register("slots")}
                                        className="checkbox checkbox-success"
                                    />
                                    <span>{slot}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="form-control space-x-2">
                        <label className="label">
                            <span className="label-text">Price per Session ($)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 20"
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 1, message: "Minimum price is $1" },
                            })}
                            className="input input-bordered"
                        />
                        {errors.price && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </span>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="form-control space-y-2">
                        <label className="label">
                            <span className="label-text">Court Image</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered w-full"
                        />
                        {uploading && <span className="text-green-600">Uploading...</span>}
                    </div>

                    {imageURL && (
                        <div className="mt-4 flex justify-center">
                            <img
                                src={imageURL}
                                alt="Uploaded Court"
                                className="w-48 h-48 object-cover rounded border border-gray-300"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn bg-green-600 hover:bg-green-700 text-white w-full"
                    >
                        Add Court
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCourt;


