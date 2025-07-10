import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useSecureAxios from '../../hooks/useSecureAxios';
import useAuth from '../../hooks/useAuth';
import Loading from '../../shared/Loading';
import dayjs from 'dayjs';
import { FaBellSlash } from 'react-icons/fa';

const Notifications = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();

  const { data: notifications = [], isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await secureAxios.get('/notifications/all', {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        <FaBellSlash className="mx-auto text-5xl mb-4" />
        <p>Could not load notifications. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-500 dark:text-green-700 mb-8 text-center">
       Your Notifications
      </h2>

      {notifications.length === 0 ? (
        <div className="text-center text-gray-500">
          <FaBellSlash className="mx-auto text-5xl mb-4" />
          <p>No new notifications at the moment.</p>
        </div>
      ) : (
        <div className="grid  gap-6">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`
                border border-gray-400 dark:border-green-400 rounded-lg shadow-md p-5 transition-transform transform hover:scale-[1.02]
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-green-600">
                  {notification.title || 'Notification'}
                </h3>
                <span className="text-xs text-gray-500">
                  {dayjs(notification.createdAt).format('MMM D, YYYY h:mm A')}
                </span>
              </div>
              <p className="text-gray-500">
                {notification.message || 'You have a new notification.'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;

