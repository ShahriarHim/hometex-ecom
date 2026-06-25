"use client";

import Link from "next/link";

export const SaleSection = () => {
  return (
    <section className="max-w-[1360px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-lg overflow-hidden">
        {/* First Card - Clothes Big Discount */}
        <div className="bg-[#b0e9ff] relative overflow-hidden transition-all duration-300 hover:shadow-lg flex items-stretch min-h-[400px]">
          {/* Image on left */}
          <div className="w-1/2 relative">
            <img src="/images/22L.png" alt="Clothes Promo" className="w-full h-full object-cover" />
          </div>
          {/* Content on right */}
          <div className="w-1/2 flex flex-col items-center justify-center p-4 text-center">
            <h2
              className="text-3xl font-bold mb-3 italic text-[#ff1493]"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Clothes
            </h2>
            <span className="bg-[#FFEB3B] text-gray-800 px-3 py-1 text-sm font-medium rounded mb-3">
              Save to 40% Off
            </span>
            <p className="text-gray-900 text-2xl font-bold mb-4">Big Discount</p>
            <Link
              href="/products"
              className="border-2 border-gray-800 text-gray-800 px-6 py-2 text-sm font-semibold hover:bg-gray-800 hover:text-white transition-colors uppercase tracking-wide"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Second Card - End of Season Sale */}
        <div className="bg-[#E91E63] relative overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="text-center text-white">
            <p className="text-sm uppercase tracking-[0.4em] font-medium">End Of Season</p>
            <div className="mx-auto mb-6">
              <h2
                className="text-white leading-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "100px",
                  transform: "scaleX(0.68)",
                  marginRight: "0.05em",
                }}
              >
                SALE
              </h2>
            </div>
            <div className="border border-white px-6 py-3 mb-8 inline-block">
              <p className="text italic">Save To 50% Off On First order</p>
            </div>
            <div>
              <Link
                href="/products"
                className="bg-[#FFEB3B] text-gray-900 px-10 py-3 text-sm font-bold hover:bg-yellow-300 hover:text-[#E91E63] transition-colors uppercase tracking-wide inline-block border-2 border-gray-800"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Third Card - Sunglasses New Arrivals */}
        <div className="bg-[#FFE066] relative overflow-hidden transition-all duration-300 hover:shadow-lg flex items-stretch min-h-[400px]">
          {/* Content on left */}
          <div className="w-1/2 flex flex-col items-center justify-center p-4 text-center">
            <h2
              className="text-3xl mb-3 italic bg-pink-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Sunglasses
            </h2>
            <span className="bg-[#b0e9ff] text-gray-800 px-3 py-1 text-sm font-medium rounded mb-3">
              Buy 1 Get 1 Free
            </span>
            <p className="text-gray-900 text-2xl font-bold mb-4">New Arrivals</p>
            <Link
              href="/products"
              className="border-2 border-gray-800 text-gray-800 px-6 py-2 text-sm font-semibold hover:bg-gray-800 hover:text-white transition-colors uppercase tracking-wide"
            >
              Shop Now
            </Link>
          </div>
          {/* Image on right */}
          <div className="w-1/2 relative">
            <img
              src="/images/11L.png"
              alt="Sunglasses Promo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
