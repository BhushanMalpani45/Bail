import React, { useState } from "react";
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle, FaUpload } from 'react-icons/fa';

const DocumentUpload = () => {
  const [clients] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { id: 1, clientId: 1, name: "Contract Agreement", date: "Aug 20, 2024" },
    { id: 2, clientId: 2, name: "Witness Statement", date: "Aug 22, 2024" },
  ]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const requiredDocuments = [
    "Affidavit of the accused",
    "Surety Bond",
    "Bail Application Form",
    "Proof of Residence",
    "Character Certificate",
    "Medical Report (if applicable)",
    "Copy of FIR/Chargesheet"
  ];

  const handleClientChange = (event) => {
    setSelectedClient(Number(event.target.value));
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (selectedClient && files.length > 0) {
      setUploading(true);
      setError(null);

      // Create a FormData object to send the files
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('clientId', selectedClient);

      try {
        const response = await axios.post('http://localhost:3000/lawyer/uploadDocument', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true // Assuming credentials are needed
        });

        if (response.data.status_code === 200) {
          // Assuming the response contains the uploaded documents
          const newDocuments = response.data.documents.map((file, index) => ({
            id: uploadedDocuments.length + index + 1,
            clientId: selectedClient,
            name: file.name,
            date: new Date().toLocaleDateString(),
          }));
          setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
        } else {
          setError("Failed to upload documents. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while uploading documents.");
      } finally {
        setUploading(false);
        setFiles([]);
      }
    }
  };

  const uploadedDocumentNames = uploadedDocuments
    .filter(doc => doc.clientId === selectedClient)
    .map(doc => doc.name);

  const missingDocuments = requiredDocuments.filter(doc => !uploadedDocumentNames.includes(doc));
  const uploadedDocumentsList = uploadedDocuments.filter(doc => doc.clientId === selectedClient);

  return (
    <div className="p-6">
      {/* Heading Section */}
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Document Upload</h1>
        <p className="text-lg text-gray-600 mt-2">Manage client documents efficiently for their bail application.</p>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
        {/* Required Documents Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            Required Documents for Bail Application:
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {requiredDocuments.map((doc, index) => (
              <li key={index} className="bg-gray-50 p-2 rounded-lg shadow-sm flex items-center">
                <FaCheckCircle className="text-gray-500 mr-2" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* Client Selection */}
        <div className="mb-6">
          <label className="block text-base font-medium mb-2 text-gray-800">Select Client:</label>
          <select
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedClient || ''}
            onChange={handleClientChange}
          >
            <option value="" disabled>Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col space-y-4">
          
          <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div class="md:flex">
          <div class="w-full ">
            <div class="relative border-dotted h-48 rounded-lg  border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
              <div class="absolute">
                <div class="flex flex-col items-center">
                  <i class="fa fa-folder-open fa-4x text-blue-700"></i>
                  <span class="block text-gray-400 font-normal">
                    Attach you files here
                  </span>
                </div>
              </div>

              <input type="file" multiple onChange={handleFileChange} class="h-full w-full opacity-0" name="" />
            </div>
          </div>
        </div>
      </div>
          <button
            className="bg-primary text-white px-6 py-3 rounded-lg flex items-center justify-start hover:bg-blue-700 transition-colors duration-300"
            onClick={handleUpload}
            disabled={!selectedClient || files.length === 0 || uploading}
          >
            <FaUpload className="mr-2" />
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      {/* Documents Not Uploaded Section */}
      {selectedClient !== null && (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <FaExclamationCircle className="text-red-500 mr-2" />
              Documents Not Uploaded
            </h2>
            <ul className="space-y-4">
              {missingDocuments.length > 0 ? (
                missingDocuments.map((doc, index) => (
                  <li key={index} className="bg-red-50 border border-red-200 text-red-600 rounded-lg shadow-sm p-4 flex items-center">
                    <FaExclamationCircle className="text-red-500 mr-2" />
                    {doc}
                  </li>
                ))
              ) : (
                <p className="text-gray-700">All required documents have been uploaded.</p>
              )}
            </ul>
          </div>

          {/* Uploaded Documents Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Uploaded Documents
            </h2>
            <ul className="space-y-4">
              {uploadedDocumentsList.length > 0 ? (
                uploadedDocumentsList.map((doc) => (
                  <li key={doc.id} className="bg-green-50 border border-green-200 text-green-600 rounded-lg shadow-sm p-4 flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <div>
                      <div className="font-semibold text-base">{doc.name}</div>
                      <div className="text-gray-700 text-sm">Uploaded on: {doc.date}</div>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-700">No documents have been uploaded yet.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentUpload;
