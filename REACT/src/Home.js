import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Timisoara');
  const [bedrooms, setBedrooms] = useState('2');
  const [maxFloor, setMaxFloor] = useState('5');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/search?location=${location}&bedrooms=${bedrooms}&maxFloor=${maxFloor}`);
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="flex items-center justify-between p-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-green-500">Aion</h1>
        <nav className="space-x-4">
          <a href="#">Home</a>
          <a href="#">Search</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      <section className="text-center py-16 px-4 bg-white">
        <h2 className="text-4xl font-bold mb-2">Find Your Perfect Home with Aion</h2>
        <p className="text-gray-600 mb-6">An AI-powered agent that finds you the best apartment deals across Romania</p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
          <select className="p-2 border rounded col-span-1">
            <option>Rent</option>
            <option>Buy</option>
          </select>
          <input placeholder="City or Area" value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 border col-span-2" />
          <input placeholder="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="p-2 border col-span-1" />
          <input placeholder="Max Floor" value={maxFloor} onChange={(e) => setMaxFloor(e.target.value)} className="p-2 border col-span-1" />
          <button onClick={handleSearch} className="bg-green-500 text-white py-2 col-span-2 md:col-span-1">Search with Aion</button>
        </div>
      </section>
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {loading && <p>Loading listings...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((listing, index) => (
              <div key={index} className="border p-4 shadow-md rounded-md bg-white">
                <img src={listing.image || 'https://via.placeholder.com/300'} alt="Apartment" className="mb-4 rounded w-full" />
                <h4 className="text-lg font-semibold">{listing.title}</h4>
                <p className="text-gray-600">{listing.price}</p>
                <a href={listing.link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">View Listing</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-white py-6 text-center text-gray-600 border-t">
        <p>© 2025 Aion · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a></p>
        <p className="text-sm mt-2">Powered by Aion AI</p>
      </footer>
    </main>
  );
}