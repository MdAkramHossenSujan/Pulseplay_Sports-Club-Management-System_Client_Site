import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import dark from "../assets/scattered-forcefields-dark.png";
import light from "../assets/scattered-forcefields.png";
import turf from "../assets/turf.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogIn from "../shared/SocialLogIn";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const { theme, signInUser } = useAuth();
  const axiosInstance = useAxios()
  const backgroundImage = theme === "dark" ? dark : light;
  const [credentialError, setCredentialError] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
//Navigation Logic
const location = useLocation()
const navigate = useNavigate()
const from = location.state?.from || '/';
console.log(from)
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(async () => {
        toast.success("Login Successful")
        await axiosInstance.patch('/users', {
          last_logged_in: new Date().toISOString(),
          email: data.email
        })    
        navigate(from)
      })
      .catch((error) => {
        setCredentialError('Password and Email is not matching')
      })
  };

  return (
    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        flex
        justify-center
        items-center
        relative
        overflow-hidden
      "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* 50% opacity overlay */}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50"></div>

      <div className="relative z-10 flex w-full max-w-5xl rounded-lg">
        {/* LEFT IMAGE - only visible on lg+ screens */}
        <div className="hidden lg:block w-1/2">
          <img
            src={turf}
            alt="Sports turf"
            className="h-full w-full min-h-screen object-cover rounded-l-lg"
          />
        </div>

        {/* RIGHT - Login form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          {/* Greeting */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-600 dark:text-gray-300 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Log in to your PulsePlay account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Email Field */}
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
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <HiOutlineMail
                  className="absolute right-3 top-3 text-gray-400 dark:text-gray-500"
                  size={20}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
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
                  })}
                />
                <span
                  className="absolute right-3 z-20 top-3 text-gray-400 dark:text-gray-500 cursor-pointer"
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
            {
              credentialError && <p className="text-red-500 text-sm mt-1">
                {credentialError}
              </p>
            }
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-green-700 dark:text-green-400 hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
            <button className="btn w-full bg-green-600 hover:bg-green-700 text-white">
              Login
            </button>
          </form>
          <div class="divider">OR</div>
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default Login;

