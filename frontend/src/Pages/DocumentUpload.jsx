import React from "react";

const DocumentUpload = () => {
  const uploadedDocuments = [
    { id: 1, name: "Contract Agreement", date: "Aug 20, 2024" },
    { id: 2, name: "Witness Statement", date: "Aug 22, 2024" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Document Upload</h1>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div class="md:flex">
          <div class="w-2/3 ">
            <div class="relative border-dotted h-48 rounded-lg  border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
              <div class="absolute">
                <div class="flex flex-col items-center">
                  <i class="fa fa-folder-open fa-4x text-blue-700"></i>
                  <span class="block text-gray-400 font-normal">
                    Attach you files here
                  </span>
                </div>
              </div>

              <input type="file" class="h-full w-full opacity-0" name="" />
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Uploaded Documents</h2>
      {/* <ul>
        {uploadedDocuments.map((doc) => (
          <li key={doc.id} className="mb-2 p-2 bg-gray-100 rounded">
            <div className="font-bold">{doc.name}</div>
            <div>Uploaded on: {doc.date}</div>
          </li>
        ))}
      </ul> */}
      <ul className="space-y-4">
        {uploadedDocuments.map((doc, index) => (
          <li key={index} className={`flex justify-between items-center p-4 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 border-blue-500`}>
            <span>{doc.name}</span>
            <div className="bg-[#00008B] text-white px-4 py-1 rounded hover:bg-[#1E3A55] transition duration-300 rpunded-xl">{doc.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentUpload;
