import React from 'react';

const BailOptions = () => {
  // Updated bail options data with additional content
  const bailOptions = [
    {
      name: 'Surety Bond',
      description: 'A third party, often a bail bondsman, pays the bail amount on behalf of the defendant, charging a fee for the service.',
      benefits: 'Convenient for defendants who cannot afford bail upfront.',
      considerations: 'Fees can be high, and the bondsman may require collateral.',
    },
    {
      name: 'Personal Bond',
      description: 'The defendant is released based on their promise to appear in court, without the need to pay bail upfront.',
      benefits: 'No financial cost to the defendant.',
      considerations: 'Requires a strong promise to appear; may not be available for all defendants.',
    },
    {
      name: 'Cash Bail',
      description: 'The full bail amount is paid in cash by the defendant or someone on their behalf, refundable after court appearances.',
      benefits: 'Straightforward process; refundable if all court appearances are made.',
      considerations: 'Requires full payment of the bail amount upfront.',
    },
    {
      name: 'Property Bond',
      description: 'The defendant or a third party pledges property (e.g., real estate) as collateral to secure bail, which can be forfeited if the defendant fails to appear in court.',
      benefits: 'Allows defendants without cash to use property as collateral.',
      considerations: 'Risk of losing property if the defendant does not appear in court.',
    },
    {
      name: 'Release on Recognizance (ROR)',
      description: 'The defendant is released without any bail amount, based solely on their written promise to return to court.',
      benefits: 'No financial burden on the defendant.',
      considerations: 'Typically granted only to low-risk defendants.',
    },
    {
      name: 'Immigration Bond',
      description: 'Specific to immigration cases, this bond allows a detained immigrant to be released while their case is pending.',
      benefits: 'Helps immigrants maintain their freedom while their case is resolved.',
      considerations: 'Specific to immigration cases and requires specialized processing.',
    },
    {
      name: 'Federal Bond',
      description: 'A type of bail for federal cases, which often requires a higher standard of surety or collateral.',
      benefits: 'Available for federal cases where higher bail amounts are required.',
      considerations: 'May involve more stringent requirements for surety or collateral.',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Bail Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bailOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl hover:border-blue-400"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-3">{option.name}</h3>
            <p className="text-gray-700 mb-4">{option.description}</p>
            <p className="text-green-700 font-semibold mb-1">Benefits:</p>
            <p className="text-gray-700 mb-4">{option.benefits}</p>
            <p className="text-red-700 font-semibold mb-1">Considerations:</p>
            <p className="text-gray-700">{option.considerations}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BailOptions;