import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import field from "../../assets/field.jpg";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading";

const UpdateCourt = () => {
  const { id } = useParams();
  const secureAxios = useSecureAxios();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['court', id],
    queryFn: async () => {
      const res = await secureAxios.get(`/courts/${id}`)
      return res.data
    }
  })
console.log(data)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
      toast.success('Image Uploaded!');
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };
  if (isLoading) {
    return <Loading />
  }
  const onSubmit = async (data) => {
    const courtData = {
      courtName: data.name,
      courtType: data.type,
      slots: data.slots || [],
      pricePerSession: data.price,
      courtImage: imageURL,
      city: data.city,
    };

    Swal.fire({
      title: "Confirm Update",
      html: `
                <p><strong>Name:</strong> ${courtData.courtName}</p>
                <p><strong>Type:</strong> ${courtData.courtType}</p>
                <p><strong>Slots:</strong> ${courtData.slots.join(", ")}</p>
                <p><strong>Price:</strong> $${courtData.pricePerSession}</p>
                <p><strong>City:</strong> ${courtData.city}</p>
            `,
      imageUrl: imageURL,
      imageWidth: 200,
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update Now!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await secureAxios.put(`/courts/${id}`, courtData);
          reset();
          setImageURL("");
          Swal.fire({
            icon: "success",
            title: "Court updated successfully!",
            timer: 1200,
            showConfirmButton: false,
          });
          navigate("/dashboard/courts");
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to update court.", "error");
        }
      }
    });
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-8 md:px-16 flex items-center justify-center"
      style={{
        backgroundImage: `url(${field})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-green-900/40 to-black/80 backdrop-blur-sm"></div>

      {/* Form card */}
      <div className="relative w-full max-w-5xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-green-700 mb-6">
          Update Court
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-10">
          Keep your facility information up to date. Modify court details,
          slots, and images to provide players with the best experience.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Court Name */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">
              Court Name
            </label>
            <input
              type="text"
              placeholder="Enter court name"
              defaultValue={data.courtName}
              {...register("name", { required: "Court name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Court Type */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">
              Court Type
            </label>
            <select
              defaultValue={data.courtType}
              {...register("type", { required: "Court type is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select court type</option>
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
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
          <div className="form-control space-x-3">
            <label className="label">City</label>
            <input defaultValue={data?.city} type="text" placeholder="Edit name Of the City" {...register('city', { required: 'City Location Is required' })} className="input input-bordered" />
          </div>
          {/* Slot Times */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Slot Times
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slotTimes.map((slot) => (
                <label
                  key={slot}
                  className="flex items-center space-x-2 p-2 border border-green-600 rounded hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={slot}
                    {...register("slots")}
                    className="checkbox checkbox-success"
                  />
                  <span className="text-gray-700 dark:text-gray-200 text-sm">
                    {slot}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-1">
              Price per Session ($)
            </label>
            <input
              defaultValue={data.pricePerSession}
              type="number"
              placeholder="e.g. 20"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Minimum price is $1" },
              })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Court Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
            {uploading && (
              <p className="text-green-600 mt-2 text-sm">Uploading image…</p>
            )}
          </div>

          {imageURL &&
            <div className="flex justify-center mt-4">
              <img
                src={imageURL}
                alt="Court Preview"
                className="w-48 h-48 rounded object-cover border border-gray-300 shadow"
              />
            </div>
          }

          <button
            type="submit"
            className="btn bg-green-700 hover:bg-green-800 text-white w-full py-3 text-lg"
          >
            Update Court
          </button>
        </form>
      </div>
    </div>

  );
};

export default UpdateCourt;
