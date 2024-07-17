import React from 'react';
import Navbar from './component/navbar';

const Home = () => {
  const catImageUrl = "https://storage.googleapis.com/pawpal/Kucing/2k.jpg";

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${catImageUrl})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative flex items-center min-h-screen p-4">
          <div className="text-left text-white p-8 rounded-lg max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md">PAWPAL</h1>
            <p className="mt-4 text-white drop-shadow-md">
              Pawpal is an innovative app designed specifically for cat lovers. PawPal is here to help you take better care of your feline friends by providing vital information about your cat's health and well-being.
            </p>
            <div className="mt-6 space-x-2">
              <button className="bg-yellow-500 text-black py-2 px-4 rounded-full">Cat Detection</button>
              <button className="bg-yellow-500 text-black py-2 px-4 rounded-full">Car Breeds</button>
              <button className="bg-yellow-500 text-black py-2 px-4 rounded-full">Cat Disease</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
