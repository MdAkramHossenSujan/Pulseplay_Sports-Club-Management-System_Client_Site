import React from 'react';
import useAuth from './useAuth';

import { useQuery } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';

const useUserData = () => {
  const secureAxios = useSecureAxios()
  const { user } = useAuth()
  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await secureAxios.get(`/users`, {
        params: { email: user?.email }
      });
      return res.data;
    }
  });
  const role = userData?.role
  return {
    userData,
    isLoading,
    role,
    refetch
  }
};

export default useUserData;