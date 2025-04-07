import React, { useEffect, useState } from 'react';
import { DocumentTextIcon, IdentificationIcon, UserCircleIcon, BanknotesIcon, BriefcaseIcon, ClipboardDocumentIcon, EyeIcon } from '@heroicons/react/24/outline'; // Import icons
import useStore from '../../../userStore';
import axios from 'axios';

const DocumentDetailModal = ({ client, onClose }) => {
  const [showDocuments, setShowDocuments] = useState(false);
  const { clients } = useStore();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(documents)


  // Dummy document links
  const documentLinks = {
    firDocuments: {clients} ,
    policeReport: "https://example.com/police_report.pdf",
    chargeSheet: "https://example.com/charge_sheet.pdf",
    courtOrders: "https://example.com/court_orders.pdf",
    bailDocuments: "https://example.com/bail_documents.pdf",
    witnessStatements: "https://example.com/witness_statements.pdf",
    medicalReports: "https://example.com/medical_reports.pdf",
    forensicReports: "https://example.com/forensic_reports.pdf",
    evidenceRecords: "https://example.com/evidence_records.pdf",
    chargesComplaints: "https://example.com/charges_complaints.pdf",
    characterCertificates: "https://example.com/character_certificates.pdf",
    legalNotices: "https://example.com/legal_notices.pdf",
    statementsByAccused: "https://example.com/statements_by_accused.pdf",
    affidavits: "https://example.com/affidavits.pdf",
    summonsWarrants: "https://example.com/summons_warrants.pdf",
  };

  const handleToggleDocuments = () => {
    setShowDocuments(!showDocuments);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.post('http://localhost:3000/prisoner/getDocument',{prisonerId: "66c9913f6cdba09d94e14405"});
        setDocuments(response.data.documents);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl relative max-h-[80vh] overflow-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{client.data.name} - {client.data.case_id}</h2>

        <button
          onClick={handleToggleDocuments}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showDocuments ? "Hide Documents" : "View Documents"}
        </button>

        {showDocuments && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Documents</h3>
            <ul className="mt-4 list-disc list-inside pl-4">
              {Object.entries(documentLinks).map(([key, url]) => (
                <li key={key} className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Render icon based on document type */}
                    {key === "firDocuments" && <DocumentTextIcon className="w-6 h-6 text-gray-500" />}
                    {key === "policeReport" && <IdentificationIcon className="w-6 h-6 text-gray-500" />}
                    {key === "chargeSheet" && <UserCircleIcon className="w-6 h-6 text-gray-500" />}
                    {key === "courtOrders" && <DocumentTextIcon className="w-6 h-6 text-gray-500" />}
                    {key === "bailDocuments" && <BanknotesIcon className="w-6 h-6 text-gray-500" />}
                    {key === "witnessStatements" && <ClipboardDocumentIcon className="w-6 h-6 text-gray-500" />}
                    {key === "medicalReports" && <UserCircleIcon className="w-6 h-6 text-gray-500" />}
                    {key === "forensicReports" && <DocumentTextIcon className="w-6 h-6 text-gray-500" />}
                    {key === "evidenceRecords" && <DocumentTextIcon className="w-6 h-6 text-gray-500" />}
                    {key === "chargesComplaints" && <IdentificationIcon className="w-6 h-6 text-gray-500" />}
                    {key === "characterCertificates" && <UserCircleIcon className="w-6 h-6 text-gray-500" />}
                    {key === "legalNotices" && <ClipboardDocumentIcon className="w-6 h-6 text-gray-500" />}
                    {key === "statementsByAccused" && <DocumentTextIcon className="w-6 h-6 text-gray-500" />}
                    {key === "affidavits" && <IdentificationIcon className="w-6 h-6 text-gray-500" />}
                    {key === "summonsWarrants" && <UserCircleIcon className="w-6 h-6 text-gray-500" />}
                    <span className="ml-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-all duration-300 flex items-center gap-1"
                  >
                    <EyeIcon className="w-4 h-4 inline" /> View File
                  </a>
                </li>
              ))}

              <ul>
                {documents.map(doc => (
                  <li key={doc._id}>
                    <p><strong>File Name:</strong> {doc.fileName}</p>
                    <p><strong>File Path:</strong> {doc.filePath}</p>
                    <p><strong>Upload Date:</strong> {new Date(doc.uploadDate).toLocaleString()}</p>
                    <p><strong>ID:</strong> {doc._id}</p>
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentDetailModal;
