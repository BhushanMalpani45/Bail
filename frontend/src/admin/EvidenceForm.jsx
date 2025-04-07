import React from "react";

const EvidenceForm = ({ data, updateData }) => {
  const handleInputChange = (e, type) => {
    const { value } = e.target;
    if (value.trim() === "") return;
    const updatedArray = [...data[type], value];
    updateData({ ...data, [type]: updatedArray });
    e.target.value = "";
  };

  const handleFIRChange = (e) => {
    const { name, value } = e.target;
    const updatedFIR = {
      ...data.firCopy,
      [name]: value,
    };
    updateData({ ...data, firCopy: updatedFIR });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    updateData({ ...data, attachments: files });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Evidence Documentation</h2>

      {[
        { label: "Physical Evidence", key: "physicalEvidence" },
        { label: "Documentary Evidence", key: "documentaryEvidence" },
        { label: "Digital Evidence", key: "digitalEvidence" },
        { label: "Witness Statements", key: "statements" },
        { label: "Medical Reports", key: "medicalReports" },
      ].map(({ label, key }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Enter ${label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputChange(e, key);
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <ul className="mt-2 list-disc list-inside text-gray-700 text-sm">
            {data[key].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">FIR Copy Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Station File Number</label>
            <input
              type="text"
              name="stationFileNumber"
              value={data.firCopy.stationFileNumber}
              onChange={handleFIRChange}
              placeholder="Station File Number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filed By</label>
            <input
              type="text"
              name="filedBy"
              value={data.firCopy.filedBy}
              onChange={handleFIRChange}
              placeholder="Filed By"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Officer In Charge</label>
            <input
              type="text"
              name="officerInCharge"
              value={data.firCopy.officerInCharge}
              onChange={handleFIRChange}
              placeholder="Officer In Charge"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Attachments</label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {data.attachments.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-gray-700 text-sm">
            {data.attachments.map((file, index) => (
              <li key={index}>{file.name || file}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EvidenceForm;
