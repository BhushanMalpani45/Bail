import jwt from "jsonwebtoken";

// Function to generate JWT token
export const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "180d" }); // Adjusted to 30 days (or keep your preferred duration)
};
