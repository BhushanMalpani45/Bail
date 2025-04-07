import React from "react";
import { CheckCircle } from "lucide-react";

const SubmitSuccess = () => {
  return (
    <div className="text-center py-12">
      <CheckCircle className="mx-auto text-green-500" size={64} />
      <h2 className="text-2xl font-semibold mt-4">Submission Successful</h2>
      <p className="text-gray-600 mt-2">Your information has been submitted successfully.</p>
    </div>
  );
};

export default SubmitSuccess;
