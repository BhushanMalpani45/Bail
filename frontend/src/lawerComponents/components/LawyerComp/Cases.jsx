import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lawyerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/lawyer/${lawyerId}/cases`);
        setCases(res.data.data);
        setFilteredCases(res.data.data);
      } catch (error) {
        console.error("Failed to fetch cases", error);
      }
    };

    fetchCases();
  }, [lawyerId]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = cases.filter((item) => {
      const caseIdMatch = item._id.toLowerCase().includes(term.toLowerCase());
      const clientNameMatch = item.prisonerId?.name?.toLowerCase().includes(term.toLowerCase());
      return caseIdMatch || clientNameMatch;
    });
    setFilteredCases(filtered);
  };

  const handleSearchClick = () => {
    handleSearchChange({ target: { value: searchTerm } });
  };

  const openModal = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800 text-left">Cases</h1>
        <p className="text-lg text-gray-600 text-left">Here you can view and manage all the cases.</p>
      </div>

      <div className="flex mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by Case ID or Client Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-3 w-full md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaSearch className="w-5 h-5 mr-2" />
            <span className="font-semibold">Search</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.length === 0 ? (
          <p className="text-gray-600">No cases found.</p>
        ) : (
          filteredCases.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl hover:border-blue-500 cursor-pointer"
              onClick={() => openModal(item)}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Case ID: {item.caseId}
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Client Name:</span> {item.prisonerId?.name || "N/A"}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Case Title:</span> {item.title}
              </p>
              <p
                className={`text-sm mb-2 ${
                  item.status === "Open"
                    ? "text-green-500"
                    : item.status === "Closed"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                <span className="font-medium">Status:</span> {item.status}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedCase && (
        <Dialog open={isModalOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-50 relative">
            <Dialog.Title className="text-2xl font-bold mb-4">Case Details</Dialog.Title>
      
            <div className="space-y-2 text-gray-800 max-h-[70vh] overflow-y-auto">
                <p><strong>Case ID:</strong> {selectedCase._id}</p>
                <p><strong>Client Name:</strong> {selectedCase.prisonerId?.name || "N/A"}</p>
                <p><strong>Title:</strong> {selectedCase.title}</p>
                <p><strong>Description:</strong> {selectedCase.description}</p>
                <p><strong>Address:</strong> {selectedCase.address}</p>
                <p><strong>Phone:</strong> {selectedCase.phone_no}</p>
                <p><strong>Status:</strong> {selectedCase.status}</p>
                <p><strong>Date Filed:</strong> {new Date(selectedCase.dateFiled).toLocaleDateString()}</p>
                <p><strong>Court Name:</strong> {selectedCase.courtName}</p>
                <p><strong>Verdict:</strong> {selectedCase.verdict}</p>
                
                {selectedCase.legalProvisions?.length > 0 && (
                  <>
                    <h3 className="font-semibold mt-4">Legal Provisions:</h3>
                    <ul className="list-disc pl-5">
                      {selectedCase.legalProvisions.map((prov, i) => (
                        <li key={i}>
                          {prov.provisionName} - {prov.description || "No description"}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedCase.hearingDates?.length > 0 && (
                  <>
                    <h3 className="font-semibold mt-4">Hearings:</h3>
                    <ul className="list-disc pl-5">
                      {selectedCase.hearingDates.map((h, i) => (
                        <li key={i}>
                          {new Date(h.date).toLocaleDateString()} - {h.notes || "No notes"}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedCase.evidence?.length > 0 && (
                  <>
                    <h3 className="font-semibold mt-4">Evidence:</h3>
                    <ul className="list-disc pl-5">
                      {selectedCase.evidence.map((e, i) => (
                        <li key={i}>
                          {e.type} - {e.description} ({e.filePath})
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
      
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      
      )}
    </div>
  );
};

export default Cases;
