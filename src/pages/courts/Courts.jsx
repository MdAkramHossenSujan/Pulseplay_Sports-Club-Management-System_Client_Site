import React, { useState, useMemo } from 'react';
import useAxios from '../../hooks/useAxios';
import loadingAnimation from '../../assets/Animation/Animation - 1751968204375_Loading.json';
import Lottie from 'lottie-react';
import { useQuery } from '@tanstack/react-query';
import CourtCard from './CourtCard';
import ReactPaginate from 'react-paginate';
import { HiSearch, HiSortAscending, HiSortDescending } from 'react-icons/hi';
import noData from '../../assets/Animation/Animation - 1751980631636_no_data.json'
const Courts = () => {
  const axiosInstance = useAxios();

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosInstance.get('/courts');
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  // Filter + Sort courts
  const filteredCourts = useMemo(() => {
    let filtered = courts;

    // Search
    if (searchTerm) {
      filtered = filtered.filter(court =>
        court.courtType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === 'asc') {
      filtered = [...filtered].sort(
        (a, b) => parseFloat(a.pricePerSession) - parseFloat(b.pricePerSession)
      );
    } else if (sortOrder === 'desc') {
      filtered = [...filtered].sort(
        (a, b) => parseFloat(b.pricePerSession) - parseFloat(a.pricePerSession)
      );
    }

    return filtered;
  }, [courts, searchTerm, sortOrder]);

  const pageCount = Math.ceil(filteredCourts.length / itemsPerPage);
console.log(pageCount)
  const currentItems = filteredCourts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Lottie className="w-16 h-16" animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-6 md:px-12">
      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center border border-green-600 rounded px-3 py-2 w-full md:w-1/3">
          <HiSearch className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Search by sport name..."
            className="flex-1 outline-none bg-transparent text-gray-700 dark:text-gray-200"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${sortOrder === 'asc' ? 'btn-success' : 'btn-outline btn-success'}`}
            onClick={() => setSortOrder('asc')}
          >
            <HiSortAscending className="mr-1" />
            Price Low to High
          </button>
          <button
            className={`btn btn-sm ${sortOrder === 'desc' ? 'btn-success' : 'btn-outline btn-success'}`}
            onClick={() => setSortOrder('desc')}
          >
            <HiSortDescending className="mr-1" />
            Price High to Low
          </button>
        </div>
      </div>

      {/* Courts List */}
      <div>
        {currentItems.length===0 ?
        <div className='flex justify-center items-center min-h-screen w-full'>
          <Lottie animationData={noData} loop={true} />
        </div>
        :
        currentItems.map((court) => (
          <CourtCard key={court._id} court={court} />
        ))
        }
      </div>

      {/* Pagination */}
      {pageCount >= 1 && (
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-8 space-x-2"}
          pageClassName={"btn btn-outline btn-sm"}
          activeClassName={"btn-success"}
          previousClassName={"btn btn-outline btn-sm"}
          nextClassName={"btn btn-outline btn-sm"}
          disabledClassName={"btn-disabled"}
        />
      )}
    </div>
  );
};

export default Courts;
