import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import dark from "../assets/scattered-forcefields-dark.png";
import light from "../assets/scattered-forcefields.png";
import turf from "../assets/turf.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import SocialLogIn from "../shared/SocialLogIn";

const Register = () => {
    const { theme, createUser, updateUser } = useAuth();
    const axiosInstance = useAxios()
    const backgroundImage = theme === "dark" ? dark : light;
    //Navigation Logic
    const location=useLocation()
    useEffect(() => {
        document.title = `Register | PulsePlay`; 
        window.scrollTo(0, 0); 
      }, []);
    const navigate=useNavigate()
    const from=location.state?.from || '/'
    //React Hook form to extract data from the form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const onSubmit = (data) => {
        // Register logic here
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user)
                const userProfile = {
                    displayName: data.name,
                    photoURL: selectedImage
                }
                const userData = {
                    email: data.email,
                    name: data.name,
                    image: selectedImage,
                    created_at: new Date().toISOString(),
                    role: 'user'
                }
                const userResponse = await axiosInstance.post('/users', userData)
                console.log(userResponse.data)
                //Update logic to set Image.
                updateUser(userProfile)
                    .then(() => {
                        toast.success("User Registered Successfully")
                        reset()
                        navigate(from)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //Collecting Image as a form of url by live hosting
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('image', file)
        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_imageUpload_key}`, formData)
        setSelectedImage(res.data.data.url)
        console.log(selectedImage)
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50"></div>

            <div className="relative z-10 flex w-full max-w-5xl">
                {/* LEFT IMAGE */}
                <div className="hidden lg:block w-1/2">
                    <img
                        src={turf}
                        alt="Turf"
                        className="h-full w-full object-cover rounded-l-lg"
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="text-center space-y-2 mb-8">
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Hey!!! Welcome to <span className="text-green-600 dark:text-green-400 font-semibold">PulsePlay</span>!
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                            Create an Account
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Join our vibrant community and elevate your sports experience.
                        </p>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 dark:text-gray-300">
                                    Name
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full pr-10"
                                    {...register("name", { required: "Name is required" })}
                                />
                                <HiUser className="absolute right-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 dark:text-gray-300">
                                    Email
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="input input-bordered w-full pr-10"
                                    {...register("email", { required: "Email is required" })}
                                />
                                <HiOutlineMail className="absolute right-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 dark:text-gray-300">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pr-10"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                            message:
                                                "Password must contain uppercase, lowercase, and a number",
                                        },
                                    })}
                                />
                                <span
                                    className="absolute z-10 right-3 top-3 text-gray-400 dark:text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>


                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 dark:text-gray-300">
                                    Profile Image
                                </span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                required
                                className="file-input file-input-bordered w-full"
                                onChange={handleImageChange}
                            />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-green-700 dark:text-green-400 hover:underline font-semibold"
                            >
                                LogIn
                            </Link>
                        </p>
                        <button className="btn w-full bg-green-600 hover:bg-green-700 text-white">
                            Register
                        </button>
                    </form>
                    <div class="divider">OR</div>
                    <SocialLogIn />
                </div>
            </div>
        </div>
    );
};

export default Register;
