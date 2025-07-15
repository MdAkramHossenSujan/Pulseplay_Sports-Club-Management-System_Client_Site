import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useSecureAxios from '../../hooks/useSecureAxios';
import useAuth from '../../hooks/useAuth';
import { X, Search } from 'lucide-react';
import Swal from 'sweetalert2';

const MemberManagement = () => {
  const secureAxios = useSecureAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  // Fetch members
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members', search],
    queryFn: async () => {
      const res = await secureAxios.get('/users/member', {
        params: {
          role: 'member',
          name: search || undefined
        }
      });
      return res.data;
    }
  });

  // Patch role mutation (remove member)
  const removeMemberMutation = useMutation({
    mutationFn: async (id) => {
      return await secureAxios.patch(`/users/${id}`, { role: 'user' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['members']);
    }
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This member will be removed from the members list.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        removeMemberMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire(
              'Removed!',
              'The member has been removed.',
              'success'
            );
          },
          onError: () => {
            Swal.fire(
              'Error!',
              'Something went wrong while removing the member.',
              'error'
            );
          },
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Member Management
      </h2>

      <p className="text-gray-500 dark:text-gray-300 mb-4">
        All approved members are displayed below. You can search members by name and manage them as needed.
      </p>

      {/* Search */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 w-full md:w-80 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        />
        <button
          onClick={() => queryClient.invalidateQueries(['members'])}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Members Table */}
      {isLoading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading members...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{member.name}</td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRemove(member._id)}
                      className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1"
                    >
                      <X size={16} />
                      Remove Member
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;

