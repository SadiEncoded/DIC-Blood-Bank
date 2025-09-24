'use client';

const DonorEngagement = () => (
  <section className="bg-[#00234B] text-white py-20">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Become a Life Saver</h2>
      <p className="text-gray-300 mb-12 text-lg md:text-xl">
        Join our blood donor community and make a real difference. 
        Your donation can save multiple lives and strengthen our local community.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white text-[#00234B] rounded-xl p-6 shadow hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Save Lives</h3>
          <p>Each donation can help up to three patients in need.</p>
        </div>
        <div className="bg-white text-[#00234B] rounded-xl p-6 shadow hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Boost Health</h3>
          <p>Regular donation improves blood circulation and wellness.</p>
        </div>
        <div className="bg-white text-[#00234B] rounded-xl p-6 shadow hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
          <p>Be part of a supportive network saving lives together.</p>
        </div>
      </div>

      <a
        href="/register"
        className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-colors text-lg"
      >
        Register as a Donor
      </a>
    </div>
  </section>
);

export default DonorEngagement;
