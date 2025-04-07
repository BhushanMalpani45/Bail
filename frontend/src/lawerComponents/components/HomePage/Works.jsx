import React from 'react';

const Works = ({ id }) => {
  const steps = [
    {
      id: 1,
      title: "Input Case Details",
      description: "Enter the relevant case details, including the nature of the offense, duration of imprisonment, and other necessary legal information.",
      icon: "📝",
    },
    {
      id: 2,
      title: "Receive AI-Generated Assessments",
      description: "Our AI analyzes the case and generates summaries, risk assessments, and bail eligibility reports.",
      icon: "🤖",
    },
    {
      id: 3,
      title: "Track Bail Applications and Compliance",
      description: "Monitor the status of bail applications and ensure compliance with bail conditions.",
      icon: "📊",
    },
    {
      id: 4,
      title: "Connect with Legal Aid or NGOs",
      description: "Get connected with legal aid providers or NGOs for assistance with bail-related needs.",
      icon: "🔗",
    },
  ];

  return (
    <section id={id}>
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>

  );
};

export default Works;
