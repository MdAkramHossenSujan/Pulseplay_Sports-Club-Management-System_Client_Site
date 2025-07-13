import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import useAxios from "../hooks/useAxios";
import { courtsData } from "../components/CourtsData";
import { FaSearch } from "react-icons/fa";
import Loading from "../shared/Loading";

const MapPage = () => {
    const axiosInstance = useAxios();
    const [courtType, setCourtType] = useState("");
    const [searchType, setSearchType] = useState("");

    // Query backend for validation
    const { data, isLoading, isError } = useQuery({
        queryKey: ["courts", searchType],
        queryFn: async () => {
            const res = await axiosInstance.get("/courts");
            return res.data;
        },
        enabled: !!searchType,
    });
    const courts = data
        ? (
            searchType.trim() === ""
                ? data
                : data.filter((court) => {
                    const search = searchType.toLowerCase();
                    return (
                        court.courtType.toLowerCase().includes(search) ||
                        court?.city?.toLowerCase().includes(search)
                    );
                })
        )
        : [];
    const filteredCourts =
        searchType.trim() === ""
            ? courtsData
            : courtsData.filter((court) => {
                const search = searchType.toLowerCase();
                return (
                    court.courtType.toLowerCase().includes(search) ||
                    court?.city?.toLowerCase().includes(search)
                );
            });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchType(courtType.trim());
    };

    return (
        <div className="max-w-[1400px] relative mx-auto px-6 md:px-10 py-10 space-y-8">
            {/* Page Title & Description */}
            <div className="space-y-3 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                    Explore Sports Courts Across Bangladesh
                </h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Find your perfect sports turf, court, or arena. Search by sport type and
                    locate premium facilities nationwide. Book your game, elevate your play!
                </p>
            </div>

            {/* Search Form */}
            <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
            >
                <input
                    type="text"
                    placeholder="Search by court type (e.g. Football, Badminton)"
                    className="input input-bordered w-full md:w-1/2"
                    value={courtType}
                    onChange={(e) => setCourtType(e.target.value)}
                />
                <button type="submit" className="btn btn-outline dark:text-green-400">
                    <FaSearch className="mr-2" /> Search
                </button>
            </form>

            {isError && (
                <p className="text-center text-red-500">
                    Something went wrong fetching data.
                </p>
            )}

            {searchType && !isLoading && !isError && filteredCourts.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-300">
                    No courts found matching <span className="font-semibold">{searchType}</span>.
                    Try searching for something like “Football”, “Tennis”, or “Swimming”.
                </p>
            )}

            {/* Map and Data Side by Side */}
            <div className="flex flex-col gap-8">
                {/* Map */}
                <div className="relative z-0 flex-1">
                    {
                        isLoading ? <Loading /> :
                            <MapContainer
                                center={[23.8103, 90.4125]}
                                zoom={7}
                                className="h-[600px] w-full rounded-2xl"
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />

                                {filteredCourts.map((court) => (
                                    <Marker key={court._id} position={[court.lat, court.lng]}>
                                        <Popup>
                                            <img
                                                className="mb-2 w-40 h-24 object-cover rounded"
                                                src={court.courtImage}
                                                alt={court.courtName}
                                            />
                                            <strong>{court.courtName}</strong>
                                            <br />
                                            Type: {court.courtType}
                                            <br />
                                            City: {court.city}
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                    }
                </div>

                {/* Filtered List */}
                <div className="flex-1 space-y-4 max-h-[400px] overflow-y-auto">
                    {courts.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Courts {searchType ? "available" : "found"} now:
                            </h2>
                            {courts.map((court) => (
                                <div
                                    key={court._id}
                                    className="p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={court.courtImage}
                                            alt={court.courtName}
                                            className="w-24 h-16 object-cover rounded"
                                        />
                                        <div className="flex flex-col justify-between">
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                                {court.courtName}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Type: {court.courtType}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                City: {court.city}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapPage;



