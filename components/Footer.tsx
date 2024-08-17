const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Eventure</h2>
              <p className="text-sm">Connecting communities through events</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            © {new Date().getFullYear()} Eventure. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer