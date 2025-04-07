import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaGavel,
  FaStickyNote,
  FaSearch,
} from "react-icons/fa";

const CourtAppearances = () => {
  // Sample data for court appearances
  const [appearances] = useState([
    {
      id: 1,
      case: "Case #12345",
      date: "Sep 10, 2024",
      time: "9:00 AM",
      location: "Courtroom 2B",
      attorney: "John Doe",
      judge: "Judge Smith",
      notes: "Prepare for witness testimony.",
    },
    {
      id: 2,
      case: "Case #67890",
      date: "Sep 12, 2024",
      time: "11:00 AM",
      location: "Courtroom 3A",
      attorney: "Jane Roe",
      judge: "Judge Johnson",
      notes: "Review final arguments.",
    },
    {
      id: 3,
      case: "Case #24680",
      date: "Sep 15, 2024",
      time: "1:00 PM",
      location: "Virtual - Zoom",
      attorney: "Alice Johnson",
      judge: "Judge Williams",
      notes: "Prepare for cross-examination.",
    },
    {
      id: 4,
      case: "Case #13579",
      date: "Sep 20, 2024",
      time: "2:00 PM",
      location: "Courtroom 4C",
      attorney: "Emily Davis",
      judge: "Judge Miller",
      notes: "Gather evidence and prepare opening statements.",
    },
    {
      id: 5,
      case: "Case #98765",
      date: "Sep 25, 2024",
      time: "10:00 AM",
      location: "Courtroom 1A",
      attorney: "Michael Brown",
      judge: "Judge Lee",
      notes: "Submit final brief and review case law.",
    },
    {
      id: 6,
      case: "Case #54321",
      date: "Sep 30, 2024",
      time: "3:00 PM",
      location: "Virtual - Teams",
      attorney: "Laura Wilson",
      judge: "Judge Roberts",
      notes: "Prepare for rebuttal and finalize arguments.",
    },
  ]);

  // State for search term and filtered appearances
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppearances, setFilteredAppearances] = useState(appearances);

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value.toUpperCase();
    setSearchTerm(term);
    setFilteredAppearances(
      appearances.filter(
        (appearance) =>
          appearance.case.toUpperCase().includes(term) ||
          appearance.date.includes(term) ||
          appearance.location.toUpperCase().includes(term) ||
          appearance.attorney.toUpperCase().includes(term) ||
          appearance.judge.toUpperCase().includes(term) ||
          appearance.notes.toUpperCase().includes(term)
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Heading Section */}
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Court Appearances
        </h1>
        <p className="text-lg text-gray-600">
          Search for court appearances based on case details.
        </p>
      </div>

      {/* Search Input and Button */}
      <div className="flex mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by Case, Date, Location, Attorney, Judge, or Notes"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-3 w-full md:w-80 lg:w-96"
          />
          <button
            onClick={() =>
              handleSearchChange({ target: { value: searchTerm } })
            } // Trigger search on button click
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center"
          >
            <FaSearch className="w-5 h-5 mr-2 text-white" />
            <span className="font-semibold">Search</span>
          </button>
        </div>
      </div>

      {/* Appearances List */}
      <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAppearances.map((appearance) => (
            <div
              key={appearance.id}
              className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-3 text-primary" />
                  {appearance.case}
                </h2>
                <div className="text-gray-700 mb-4">
                  <div className="flex items-center mb-3">
                    <FaClock className="mr-3 text-primary" />
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {appearance.date}
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaClock className="mr-3 text-primary" />
                    <div>
                      <span className="font-medium">Time:</span>{" "}
                      {appearance.time}
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaMapMarkerAlt className="mr-3 text-primary" />
                    <div>
                      <span className="font-medium">Location:</span>{" "}
                      {appearance.location}
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    <FaUser className="mr-3 text-primary" />
                    <div>
                      <span className="font-medium">Attorney:</span>{" "}
                      {appearance.attorney}
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <FaGavel className="mr-3 text-primary" />
                    <div>
                      <span className="font-medium">Judge:</span>{" "}
                      {appearance.judge}
                    </div>
                  </div>
                </div>
                <div className="text-gray-700">
                  <div className="flex items-start">
                    <FaStickyNote className="mr-3 text-primary mt-1" />
                    <div>
                      <span className="font-medium">Notes:</span>{" "}
                      {appearance.notes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtAppearances;
