import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const lawyerId = localStorage.getItem("id");
      if (!lawyerId) {
        console.error("Lawyer ID not found");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/lawyer/cases",
          { lawyerId },
          { withCredentials: true }
        );
        if (
          response.data.status_code === 200 &&
          Array.isArray(response.data.data)
        ) {
          setClients(response.data.data);
          setFilteredClients(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredClients(
      clients.filter(
        (client) =>
          client.case_id?.toLowerCase().includes(term.toLowerCase()) ||
          client.name?.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Clients</h1>
        <p className="text-lg text-gray-600">
          Search for clients and view their case details.
        </p>
      </div>

      {/* Search */}
      <div className="flex mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by Case ID or Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-3 w-full md:w-80 lg:w-96"
          />
          <button
            onClick={handleSearchChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaSearch className="w-5 h-5 mr-2" />
            <span className="font-semibold">Search</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.length === 0 ? (
          <p className="text-center text-gray-600">No clients found.</p>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client._id}
              onClick={() => openModal(client)}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2 text-left">
                {client.name}
              </h2>
              <p className="text-gray-700 mb-1 text-left">
                <strong>Case ID:</strong> {client.case_id}
              </p>
              <p className="text-gray-700 mb-1 text-left">
                <strong>Offense(s):</strong>{" "}
                {client.offense_id && client.offense_id.length > 0
                  ? client.offense_id.map((o) => o.offense_name).join(", ")
                  : "N/A"}
              </p>

              <p className="text-gray-700 mb-1 text-left">
                <strong>Email:</strong> {client.email_id}
              </p>
              <p className="text-gray-700 mb-1 text-left">
                <strong>Phone:</strong> {client.phone_no}
              </p>
              <p className="text-gray-700 mb-1 text-left">
                <strong>Address:</strong> {client.address}
              </p>
              <p
                className={`text-sm mb-2 text-left ${
                  client.case_status ? "text-green-500" : "text-red-500"
                }`}
              >
                <strong>Status:</strong>{" "}
                {client.case_status ? "Open" : "Closed"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full overflow-y-auto max-h-[90vh] relative z-50">
            <h2 className="text-2xl font-bold mb-4">Client Details</h2>
            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Name:</strong> {selectedClient.name}
              </p>
              <p>
                <strong>Case ID:</strong> {selectedClient.case_id}
              </p>
              {/* <p><strong>Prison ID:</strong> {selectedClient.prison_id}</p> */}
              <p>
                <strong>Email:</strong> {selectedClient.email_id}
              </p>
              <p>
                <strong>Phone:</strong> {selectedClient.phone_no}
              </p>
              <p>
                <strong>Address:</strong> {selectedClient.address}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedClient.case_status ? "Open" : "Closed"}
              </p>

              {/* Offense */}
              {selectedClient.offense_id?.length > 0 && (
                <>
                  <h3 className="font-semibold mt-4">Offenses:</h3>
                  <ul className="list-disc pl-5">
                    {selectedClient.offense_id.map((offense, i) => (
                      <li key={i}>
                        {offense.offense_name} (
                        {offense.acts_included?.join(", ")})
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Family Background */}
              {selectedClient.family_background && (
                <>
                  <h3 className="font-semibold mt-4">Family Background:</h3>
                  <p>
                    <strong>Father:</strong>{" "}
                    {selectedClient.family_background.father_name}
                  </p>
                  <p>
                    <strong>Mother:</strong>{" "}
                    {selectedClient.family_background.mother_name}
                  </p>
                  <p>
                    <strong>Marital Status:</strong>{" "}
                    {selectedClient.family_background.marital_status}
                  </p>

                  {/* Siblings */}
                  {selectedClient.family_background.siblings?.length > 0 && (
                    <>
                      <h4 className="font-medium mt-2">Siblings:</h4>
                      <ul className="list-disc pl-5">
                        {selectedClient.family_background.siblings.map(
                          (sib, i) => (
                            <li key={i}>
                              {sib.name} - {sib.relationship}, {sib.occupation}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}

                  {/* Children */}
                  {selectedClient.family_background.children?.length > 0 && (
                    <>
                      <h4 className="font-medium mt-2">Children:</h4>
                      <ul className="list-disc pl-5">
                        {selectedClient.family_background.children.map(
                          (child, i) => (
                            <li key={i}>
                              {child.name}, Age: {child.age}, {child.occupation}
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </>
              )}

              {/* Past Records */}
              {selectedClient.past_records?.length > 0 && (
                <>
                  <h3 className="font-semibold mt-4">Past Records:</h3>
                  <ul className="list-disc pl-5">
                    {selectedClient.past_records.map((record, i) => (
                      <li key={i}>
                        Court: {record.court_name} | Status: {record.status} |
                        Duration: {record.sentence_duration}
                        {record.acts_subjected?.length > 0 && (
                          <> | Acts: {record.acts_subjected.join(", ")}</>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Documents */}
              {selectedClient.documents?.length > 0 && (
                <>
                  <h3 className="font-semibold mt-4">Uploaded Documents:</h3>
                  <ul className="list-disc pl-5">
                    {selectedClient.documents.map((doc, i) => (
                      <li key={i}>
                        {doc.fileName} (Uploaded:{" "}
                        {new Date(doc.uploadDate).toLocaleDateString()}) <br />
                        <a
                          href={`http://localhost:3000/${doc.filePath}`}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
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
      )}
    </div>
  );
};

export default Clients;
