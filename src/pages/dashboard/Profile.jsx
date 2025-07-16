import React, { useEffect, useState } from 'react';
import useSecureAxios from '../../hooks/useSecureAxios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import Loading from '../../shared/Loading';
import { FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ROLE_COLORS = {
    admin: 'bg-red-800 text-white shadow-red-400',
    member: 'bg-blue-600 text-white :shadow-blue-400',
    user: 'bg-white-600  dark:shadow-green-800 shadow-gray-600',
};

const ROLE_LABELS = {
    admin: 'Admin',
    member: 'Member',
    user: 'User',
};

const Profile = () => {
    const secureAxios = useSecureAxios();
    const queryClient = useQueryClient();
    const { user,updateUser } = useAuth();
    useEffect(() => {
        document.title = `Profile | Dashboard | PulsePlay`; 
        window.scrollTo(0, 0); 
      }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newName, setNewName] = useState('');

    const { data: profile, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await secureAxios.get('/users', {
                params: {
                    email: user.email,
                },
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_imageUpload_key}`,
                formData
            );
            setSelectedImage(res.data.data.url);
            Swal.fire({
                icon: 'success',
                title: 'Image uploaded successfully!',
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Image upload failed!',
            });
        }
    };

    const updateProfileMutation = useMutation({
        mutationFn: async (updatedData) => {
            return secureAxios.patch(`/users/${profile._id}/profile`, updatedData);
        },
        onSuccess: () => {
            const userProfile = {
                displayName: newName,
                photoURL: selectedImage
            }
            updateUser(userProfile) .then(()=>{
              Swal.fire({
                icon: 'success',
                title: 'Profile updated successfully!',
            });
            queryClient.invalidateQueries(['user', user?.email]);
            setIsModalOpen(false);  
            }).catch(error=>{
                console.log(error)
            })
            
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update profile!',
            });
        },
    });

    const handleUpdateProfile = () => {
        updateProfileMutation.mutate({
            name: newName || profile?.name,
            image: selectedImage || profile?.image,
        });
    };

    if (isLoading) return <Loading />;

    return (
        <>
            {/* Main Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto p-6 lg:py-18"
            >
                {/* Personalized greeting */}
                <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Hello, <span className="dark:text-green-600 text-gray-500">{profile?.name}</span> 👋
                </h2>

                <div className="p-8 text-center space-y-6 relative">
                    {/* Profile Image with Badge */}
                    <div className="flex justify-center relative">
                        <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-green-500 shadow">
                            <img
                                src={profile?.image}
                                alt={profile?.name}
                                className="w-full h-full object-cover"
                            />

                        </div>
                    </div>

                    {/* Profile Details */}
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {profile?.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{profile?.email}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Registered on: {dayjs(profile?.created_at).format('MMMM D, YYYY h:mm A')}
                    </p>

                    {/* Role displayed nicely */}
                    <div className={`inline-block px-4 py-1 mt-2 rounded-full font-medium text-sm
            shadow
            transition-colors
            ease-in-out
            duration-300
            cursor-default
            hover:scale-105
            hover:brightness-110
            ${
              ROLE_COLORS[profile?.role] || 'bg-gray-500'
            }`}>
                        {ROLE_LABELS[profile?.role]}
                    </div>

                    <button
                        onClick={() => {
                            setNewName(profile?.name);
                            setSelectedImage(null);
                            setIsModalOpen(true);
                        }}
                        className="btn btn-outline text-gray-600 hover:text-green-800 dark:hover:text-white dark:hover:bg-gray-800 hover:bg-gray-100 dark:text-green-400 flex gap-2 mx-auto mt-4"
                    >
                        <FaEdit /> Edit Profile
                    </button>
                </div>
            </motion.div>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/70 bg-opacity-50 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg z-50 p-6"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                                Edit Profile
                            </h3>

                            {/* Image preview */}
                            <div className="flex justify-center mb-4">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500">
                                    <img
                                        src={selectedImage || profile?.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Upload image */}
                            <div className="flex justify-center mb-4">
                                <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Upload New Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>

                            {/* Name input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateProfile}
                                    className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Profile;


