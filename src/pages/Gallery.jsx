import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { courtsData } from '../components/CourtsData';

const Gallery = () => {
  useEffect(() => {
    document.title = `Gallery | PulsePlay`; 
    window.scrollTo(0, 0); 
  }, []);
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const pageCount = Math.ceil(courtsData.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentItems = courtsData.slice(offset, offset + itemsPerPage);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };

  const openModal = (court) => {
    setModalImage(court);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
     <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-600 dark:text-gray-400">
  Explore Our Stunning Collection of Sports Courts & Fields
</h1>
<p className="text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
  Browse through high-quality images of our premium sports venues across Bangladesh.  
  Click any image to view in full size and get inspired to book your next game!
</p>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentItems.map((court) => (
          <div
            key={court._id}
            className="border border-gray-400 rounded overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => openModal(court)}
          >
            <img
              src={court.courtImage}
              alt={court.courtName}
              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
            />
            <p className="text-center p-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              {court.courtName}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <ReactPaginate
          previousLabel="← Previous"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex gap-2 flex-wrap justify-center"
          pageClassName="border border-green-600 rounded px-3 py-1 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer transition"
          activeClassName="bg-green-600 text-white"
          previousClassName="border border-green-600 rounded px-3 py-1 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer transition"
          nextClassName="border border-green-600 rounded px-3 py-1 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer transition"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className="relative bg-gray-300 dark:bg-gray-900 p-4 rounded-lg max-w-3xl w-[90%] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-2 right-1 cursor-pointer text-gray-500 hover:text-red-500 text-2xl font-bold transition duration-300"
            >
              &times;
            </button>
            <img
              src={modalImage.courtImage}
              alt={modalImage.courtName}
              className="w-full h-auto rounded mb-4"
            />
            <p className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
              {modalImage.courtName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
