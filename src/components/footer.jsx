function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Built with <span className="text-red-500">❤️</span> using React
            </p>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Privacy Policy
            </a>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
