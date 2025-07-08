import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { HiOutlineUpload } from "react-icons/hi";

const AddCourt = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const slotTimes = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "19:00 - 20:00",
  ];

  const onSubmit = async (data) => {
    const courtData = {
      name: data.name,
      type: data.type,
      slots: data.slots || [],
      price: data.price,
      image: imageURL,
    };

    // Confirmation modal
    Swal.fire({
      title: "Confirm Court Details",
      html: `
        <p><strong>Name:</strong> ${courtData.name}</p>
        <p><strong>Type:</strong> ${courtData.type}</p>
        <p><strong>Slots:</strong> ${courtData.slots.join(", ")}</p>
        <p><strong>Price:</strong> $${courtData.price}</p>
      `,
      imageUrl: imageURL,
      imageWidth: 200,
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Post Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Replace with your API call
        console.log("Court saved:", courtData);
        Swal.fire("Success!", "Court added successfully.", "success");
        reset();
        setImageURL("");
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
      Swal.fire({
        icon: "success",
        title: "Image Uploaded!",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 shadow rounded p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
        Add New Court
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Court Name</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Court 1"
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
        <div className="form-control">
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
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm mt-1">
              {errors.type.message}
            </span>
          )}
        </div>

        {/* Slot Times */}
        <div className="form-control">
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
        <div className="form-control">
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
        <div className="form-control">
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
  );
};

export default AddCourt;

