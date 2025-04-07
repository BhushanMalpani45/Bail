// src/components/HeroSection.js
const HeroSection = () => {
  return (
    <section className="relative h-screen bg-white text-center text-black" >
      <div className="absolute inset-0 bg-gray-200 opacity-70"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full p-4">
        <h1 className="text-4xl font-bold mb-4">Streamline Your Bail Process with the Bail Reckoner</h1>
        <p className="text-lg mb-8">A comprehensive digital solution for undertrial prisoners, legal aid providers, and judicial authorities.</p>
        <div className="flex space-x-4">
          <a href="/undertrial" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">Check Eligibility</a>
          <a href="/legal-aid" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">Manage Cases</a>
          <a href="/judicial" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">Evaluate Applications</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
