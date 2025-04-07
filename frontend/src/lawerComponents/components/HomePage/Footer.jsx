// src/components/Footer.js
const Footer = ({id}) => {
  return (
    
    <footer  id={id} style={{ backgroundColor: '#03346E' }} className="text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          {/* Contact Information */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p className="mb-1">
              Email: <a href="mailto:support@example.com" className="hover:underline">support@example.com</a>
            </p>
            <p>
              Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mb-6 lg:mb-0">
            {/* Facebook */}
            <a href="" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12.072C22 6.029 17.971 2 12 2S2 6.029 2 12.072c0 5.243 4.027 9.556 9.257 10.66v-7.56H7.897v-3.1h3.36v-2.19c0-3.313 1.988-5.095 4.89-5.095 1.398 0 2.598.104 2.947.151v3.42h-2.025c-1.594 0-1.898.759-1.898 1.865v2.45h3.796l-.495 3.1h-3.3v7.548C17.973 21.628 22 17.314 22 12.072z"/>
              </svg>
            </a>

            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.6 10.6 0 0 1-3.04.832A4.96 4.96 0 0 0 22.4 1.76a10.68 10.68 0 0 1-3.127 1.19A4.925 4.925 0 0 0 15.72 0c-2.707 0-4.92 2.211-4.92 4.92 0 .386.045.764.129 1.126A13.975 13.975 0 0 1 1.675 2.12a4.92 4.92 0 0 0 1.522 6.558A4.91 4.91 0 0 1 .96 8.56v.062a4.918 4.918 0 0 0 3.952 4.82A4.969 4.969 0 0 1 2 12.83a4.934 4.934 0 0 0 4.594 3.42A9.87 9.87 0 0 1 .56 17.16a13.905 13.905 0 0 0 7.548 2.21c9.056 0 14.006-7.49 14.006-13.986 0-.213-.005-.425-.014-.637A10.072 10.072 0 0 0 23 3z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7 19H4v-9h3v9zm-1.5-10.18c-.9 0-1.5-.61-1.5-1.35 0-.77.6-1.35 1.5-1.35.9 0 1.5.61 1.5 1.35 0 .74-.6 1.35-1.5 1.35zm11.5 10.18h-3v-4.56c0-1.09-.04-2.5-1.53-2.5-1.53 0-1.77 1.2-1.77 2.43v4.63h-3v-9h2.88v1.23h.04c.4-.75 1.39-1.55 2.86-1.55 3.07 0 3.64 2.02 3.64 4.64v5.68z"/>
              </svg>
            </a>
          </div>

          {/* Copyright Notice */}
          <div>
            <p className="text-gray-400 text-sm">&copy; 2024 BailBridgers. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
