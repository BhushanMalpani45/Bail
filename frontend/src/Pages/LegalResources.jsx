// src/components/LegalResources.jsx

import React from 'react';

const LegalResources = () => {
  // Placeholder for legal resources data
  const resources = [
    { name: 'Indian Penal Code', link: '#' },
    { name: 'Criminal Procedure Code', link: '#' },
    { name: 'Judicial Pronouncements on Bail', link: '#' },
  ];

  return (
    <div className="bg-white border-2 border-primary p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-primary mb-2">Legal Resources</h2>
      <ul className="list-disc list-inside text-primary">
        {resources.map((resource, index) => (
          <li key={index}>
            <a href={resource.link} className="text-primary hover:underline">
              {resource.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegalResources;
