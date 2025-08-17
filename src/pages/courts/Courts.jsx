import React, { useState, useMemo, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import Lottie from 'lottie-react';
import { useQuery } from '@tanstack/react-query';
import CourtCard from './CourtCard';
import ReactPaginate from 'react-paginate';
import { HiSearch, HiSortAscending, HiSortDescending } from 'react-icons/hi';
import noData from '../../assets/Animation/Animation - 1751980631636_no_data.json';
import Loading from '../../shared/Loading';

const Courts = () => {
  const axiosInstance = useAxios();
  useEffect(() => {
    document.title = `Courts | PulsePlay`;
    window.scrollTo(0, 0);
  }, []);
  
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
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  const itemsPerPage = 10;

  // ✅ Extract unique cities & sports dynamically
  const uniqueCities = [...new Set(courts.map(court => court.city).filter(Boolean))].slice(0, 5);
  const uniqueSports = [...new Set(courts.map(court => court.courtType).filter(Boolean))].slice(0, 5);

  const filteredCourts = useMemo(() => {
    let filtered = courts;

    if (searchTerm) {
      filtered = filtered.filter(court =>
        court.courtType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(court => court.city === selectedCity);
    }

    if (selectedSport) {
      filtered = filtered.filter(court => court.courtType === selectedSport);
    }

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
  }, [courts, searchTerm, sortOrder, selectedCity, selectedSport]);

  const pageCount = Math.max(1, Math.ceil(filteredCourts.length / itemsPerPage));

  const currentItems = filteredCourts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, sortOrder, selectedCity, selectedSport]);

  if (isLoading) return <Loading />;

  return (
    <div className="py-12 space-y-8 max-w-7xl mx-auto px-6 md:px-12">
      
      {/* ✅ Top Featured Cities */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="font-bold text-xl mr-2">Top Cities:</span>
        <button 
          onClick={() => setSelectedCity('')} 
          className={`px-4 py-2 cursor-pointer rounded-full border ${selectedCity === '' ? 'bg-green-600 text-white' : 'border-green-600 text-green-600'}`}
        >
          All
        </button>
        {uniqueCities.map(city => (
          <button 
            key={city} 
            onClick={() => setSelectedCity(city)} 
            className={`px-4 py-2 cursor-pointer rounded-full border ${selectedCity === city ? 'bg-green-600 text-white' : 'border-green-600 text-green-600'}`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* ✅ Top Featured Sports */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="font-semibold mr-2">Top Sports:</span>
        <button 
          onClick={() => setSelectedSport('')} 
          className={`px-4 cursor-pointer py-2 rounded-full border ${selectedSport === '' ? 'bg-blue-600 text-white' : 'border-blue-600 text-blue-600'}`}
        >
          All
        </button>
        {uniqueSports.map(sport => (
          <button 
            key={sport} 
            onClick={() => setSelectedSport(sport)} 
            className={`px-4 py-2 cursor-pointer rounded-full border ${selectedSport === sport ? 'bg-blue-600 text-white' : 'border-blue-600 text-blue-600'}`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center border border-green-600 rounded px-3 py-2 w-full md:w-1/3">
          <HiSearch className="text-green-600 mr-2" />
          <input
            type="text"
            placeholder="Search by sport name..."
            className="flex-1 outline-none bg-transparent text-gray-700 dark:text-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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

      {/* Court List */}
      <div>
        {currentItems.length === 0 ? (
          <div className='flex justify-center items-center min-h-screen w-full'>
            <Lottie animationData={noData} loop={true} />
          </div>
        ) : (
          currentItems.map((court) => (
            <CourtCard key={court._id} court={court} />
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredCourts.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          forcePage={currentPage}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-8 space-x-2"}
          pageClassName={"btn btn-outline btn-sm"}
          activeClassName={"btn-success"}
          previousClassName={"btn btn-outline btn-sm"}
          nextClassName={"btn btn-outline btn-sm"}
          disabledLinkClassName={"btn-disabled"}
        />
      )}
    </div>
  );
};

export default Courts;



