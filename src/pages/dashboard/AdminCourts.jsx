import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Loading from '../../shared/Loading';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';


const AdminCourts = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: Courts = [], isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosInstance.get('/courts');
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosInstance.delete(`/courts/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Court Deleted',
        text: 'Court has been successfully removed.',
      });
      queryClient.invalidateQueries(['courts']);
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not delete court. Please try again.',
      });
    },
  });

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Delete "${name}"?`,
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Pagination logic
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(Courts.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentCourts = Courts.slice(offset, offset + itemsPerPage);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };


  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Manage Courts
      </h2>
      <p className="max-w-3xl italic mb-8">
        Here you can view, edit, or remove courts available in the system.
        Keep the court information updated to ensure users have accurate
        details for booking their preferred sports sessions. Use the table
        below to manage courts efficiently and keep your sports facilities running smoothly.
      </p>


      {
        isLoading ? <Loading /> :
          <div className="overflow-x-auto w-full">
            <table className="table w-full text-sm md:text-base">
              <thead className="bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th>#</th>
                  <th>Court Details</th>
                  <th>Price</th>
                  <th>Full Slots of courts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCourts.map((court, index) => (
                  <tr key={court._id} className="hover">
                    <td>{offset + index + 1}</td>
                    <td>
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <img
                          src={court.courtImage}
                          alt={court.courtName}
                          className="w-20 h-16 object-cover rounded border dark:border-green-600 border-gray-300"
                        />
                        <div>
                          <p className="font-semibold text-green-700 text-sm md:text-base">
                            {court.courtName}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">
                            {court.courtType}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-green-600 font-medium">
                      $ {court.pricePerSession}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {court.slots.map((slot) => (
                          <span
                            key={slot}
                            className="badge badge-outline text-xs px-2 py-1"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          className="btn btn-xs btn-outline btn-primary flex items-center gap-1"
                          onClick={() =>
                            navigate(`/dashboard/updateCourt/${court._id}`)
                          }
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-xs btn-outline btn-error flex items-center gap-1"
                          onClick={() => handleDelete(court._id, court.courtName)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {Courts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-10">
                      No courts available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      }

      {Courts.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={'pagination flex gap-2'}
            previousClassName={'btn btn-sm btn-outline'}
            nextClassName={'btn btn-sm btn-outline'}
            pageClassName={'btn btn-sm btn-outline'}
            activeClassName={'btn bg-green-600 text-white'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
      )}
    </div>
  );
};

export default AdminCourts;

