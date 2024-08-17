import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-20">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">Welcome to Eventure</h1>
          <p className="text-lg mb-8">Discover and join exciting community events near you!</p>
          <Link href="/events" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">
          Explore
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Why Choose Eventure?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold mb-2">Easy Event Discovery</h3>
              <p>Find events that match your interests with our intuitive search and filtering system.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p>Get event suggestions based on your preferences and past activities.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold mb-2">Engage with the Community</h3>
              <p>Join discussions, RSVP, and connect with like-minded individuals at events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold mb-2">Community Cleanup Drive</h3>
              <p>Join us in making our neighborhood cleaner and greener. Date: Aug 25, 2024.</p>
              <Link href="/events/1" className="text-blue-600 mt-4 inline-block">
                Learn More
              </Link>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-bold mb-2">Tech Meetup 2024</h3>
              <p>Network with industry leaders and learn about the latest tech trends. Date: Sep 10, 2024.</p>
              <Link href="/events/2" className="text-blue-600 mt-4 inline-block">
                Learn More
              </Link>
            </div>
      
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <p>Eventure made it so easy for me to find and join events that I care about!</p>
              <p className="mt-4 text-sm text-gray-600">- Alex P.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <p>I love how Eventure recommends events that match my interests.</p>
              <p className="mt-4 text-sm text-gray-600">- Jamie L.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-white">
              <p>The best platform for discovering local events and meeting new people.</p>
              <p className="mt-4 text-sm text-gray-600">- Chris M.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
