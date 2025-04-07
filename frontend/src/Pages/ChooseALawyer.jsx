import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets.js";

const dummyLawyers = [
  {
    _id: 1,
    name: "Alice Johnson",
    specialization: "General Practice",
    type: "lawyer",
    experience: "5",
    location: "Pune",
    contactDetails: { phone: "9223344006", email: "john.deo@gmail.com" },
  },
  {
    _id: 2,
    name: "Robert Wilson",
    specialization: "Civil Rights",
    type: "lawyer",
    experience: "7",
    location: "Mumbai",
    contactDetails: { phone: "8976985425", email: "amit.kumar@example.com" },
  },
  {
    _id: 3,
    name: "Jessica Taylor",
    specialization: "Criminal Law",
    type: "lawyer",
    experience: "10",
    location: "Thane",
    contactDetails: { phone: "9564137985", email: "kumar@example.com" },
  },
];

const ChooseLawyer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [isLawyer, setIsLawyer] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/lawyer/getAll");
        console.log("Fetched Data:", response.data.data);

        let fetchedLawyers = response.data.status && Array.isArray(response.data.data)
          ? response.data.data
          : [];

        // Merge dummy data into lawyers with missing values
        fetchedLawyers = fetchedLawyers.map((lawyer, index) => {
          const fallback = dummyLawyers[index % dummyLawyers.length]; // Get a dummy lawyer

          return {
            _id: lawyer._id || fallback._id,
            name: lawyer.name || fallback.name,
            specialization:
              lawyer.specialization && lawyer.specialization.trim() !== ""
                ? lawyer.specialization
                : fallback.specialization,
            type: lawyer.type && lawyer.type.trim() !== "" ? lawyer.type : fallback.type,
            experience:
              lawyer.experience && lawyer.experience.toString().trim() !== ""
                ? lawyer.experience
                : fallback.experience,
            location:
              lawyer.location && lawyer.location.trim() !== "" ? lawyer.location : fallback.location,
            contactDetails: {
              phone:
                lawyer.contactDetails?.phone && lawyer.contactDetails.phone.trim() !== ""
                  ? lawyer.contactDetails.phone
                  : fallback.contactDetails.phone,
              email:
                lawyer.contactDetails?.email && lawyer.contactDetails.email.trim() !== ""
                  ? lawyer.contactDetails.email
                  : fallback.contactDetails.email,
            },
          };
        });

        // Ensure at least 3 lawyers
        while (fetchedLawyers.length < 3) {
          fetchedLawyers.push(dummyLawyers[fetchedLawyers.length]);
        }

        setLawyers(fetchedLawyers);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        setLawyers(dummyLawyers); // Use dummy data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSwitch = () => setIsLawyer(!isLawyer);

  const filteredLawyers = lawyers.filter((lawyer) => {
    const name = lawyer.name?.toLowerCase() || "";
    const specialization = lawyer.specialization?.toLowerCase() || "";
    const location = lawyer.location?.toLowerCase() || "";
    const type = lawyer.type?.toLowerCase() || "lawyer";

    return (
      (name.includes(searchTerm.toLowerCase()) ||
        specialization.includes(searchTerm.toLowerCase()) ||
        location.includes(searchTerm.toLowerCase())) &&
      type === (isLawyer ? "lawyer" : "probono")
    );
  });

  const handleWhatsAppClick = (phoneNumber) => {
    if (!phoneNumber) return;
    const formattedNumber = phoneNumber.replace(/\s+/g, "");
    const whatsappUrl = `https://wa.me/${formattedNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const prisonerId = localStorage.getItem("id");
  console.log(prisonerId);

  const handleApply = async (lawyerId) => {
    try {
      const response = await axios.post(`http://127.0.0.1:3000/lawyer/apply/${lawyerId}`, {
        prisonerId,
      });
  
      alert(response.data.message);
    } catch (err) {
      console.error("Error applying:", err);
      alert("Error applying to lawyer");
    }
  };
  

  return (
    <div className="bg-white border border-primary p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold text-primary mb-6">Lawyers</h2>

      <div className="flex gap-x-2 items-center pb-2">
        <h3 className="text-primary">Pro Bono</h3>
        <div
          onClick={toggleSwitch}
          className={`w-8 h-4 flex items-center mt-1 rounded-full cursor-pointer ${
            isLawyer ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-3 h-3 rounded-full shadow-md transform duration-300 ease-in-out ${
              isLawyer ? "translate-x-4" : "translate-x-1"
            }`}
          ></div>
        </div>
        <h3 className="text-primary">Lawyers</h3>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, specialization, or location..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p className="text-md text-gray-500 mt-4">Loading lawyers...</p>}

      {!loading && (
        <ul className="space-y-6">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer, index) => (
              <li
                key={lawyer._id || index}
                className="p-4 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <p className="text-xl font-semibold">{lawyer.name}</p>
                    <p className="text-md text-gray-700">
                      Specialization: {lawyer.specialization}
                    </p>
                    <p className="text-md text-gray-700">
                      Type: {lawyer.type.charAt(0).toUpperCase() + lawyer.type.slice(1)}
                    </p>
                    <p className="text-md text-gray-700">
                      Experience: {lawyer.experience} years
                    </p>
                    <p className="text-md text-gray-700">
                      Location: {lawyer.location}
                    </p>
                    <p className="text-md text-gray-700">
                      Phone: {lawyer.contactDetails.phone}
                    </p>
                    <p className="text-md text-gray-700">
                      Email: {lawyer.contactDetails.email}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:flex md:items-center">
                    <button className="bg-[#00008B] text-white text-lg px-6 py-2 rounded-full hover:bg-primary-light transition duration-300" onClick={()=>{handleApply(lawyer._id)}}>
                      Apply
                    </button>
                    {lawyer.contactDetails?.phone && (
                      <div className="p-3">
                        <img
                          className="cursor-pointer w-10 h-10 rounded-full border-4 border-gray-300 shadow-lg object-cover"
                          src={assets.wp}
                          alt="Connect with WhatsApp"
                          onClick={() => handleWhatsAppClick(lawyer.contactDetails.phone)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-md text-gray-500 mt-4">No lawyers found matching your search criteria.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ChooseLawyer;
