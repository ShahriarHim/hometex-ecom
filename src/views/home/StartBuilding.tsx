"use client";

import { MoveRight } from "lucide-react";

export const StartBuilding = () => {
  // Hometex product categories showcase
  const gridData = [
    {
      image: "/images/catagories/Bed.jpg",
      text1: "Bed Linen",
      text2: "Shop Now",
    },
    {
      image: "/images/catagories/Bathing.jpg",
      text1: "Bath Essentials",
      text2: "Shop Now",
    },
    {
      image: "/images/catagories/Pillow.jpg",
      text1: "Pillows & Cushions",
      text2: "Shop Now",
    },
    {
      image: "/images/catagories/Curtainssss.jpg",
      text1: "Curtains",
      text2: "Shop Now",
    },
    {
      image: "/images/designSix/Handmade_Rugs.png",
      text1: "Handmade Rugs",
      text2: "Shop Now",
    },
    {
      image: "/images/catagories/Table.jpg",
      text1: "Table Linens",
      text2: "Shop Now",
    },
    {
      image: "/images/designSix/bathrobes.png",
      text1: "Bath Robes",
      text2: "Shop Now",
    },
    {
      image: "/images/designSix/Summer_Quilt_Banner.png",
      text1: "Quilts & Comforters",
      text2: "Shop Now",
    },
  ];

  return (
    <section className="max-w-[1360px] mx-auto px-4 py-8 mb-5">
      {/* First Section - Banner */}
      <div className="relative mb-20">
        <div className="bg-white rounded-lg p-6 md:p-12 shadow-lg relative z-10 min-h-[400px] flex flex-col justify-center">
          <div className="flex flex-col md:flex-row justify-between items-center h-full gap-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent max-w-full md:max-w-[70%] leading-tight text-center md:text-left">
              DISCOVER COMFORT
              <br />
              IN EVERY CORNER
            </h1>
            <button className="bg-yellow-600 text-black px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors text-xl whitespace-nowrap">
              Get Started
            </button>
          </div>
        </div>
        {/* Decorative black background strip */}
        <div
          className="absolute bg-yellow-600 h-32 -bottom-6 -left-4 -right-4 z-0"
          style={{ top: "70%" }}
        />
      </div>

      {/* Second Section - Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gridData.map((item, index) => (
          <div
            key={index}
            // Use precise background color #17b4cd with opacity ~0.23 (3b hex)
            className="bg-yellow-600 relative rounded overflow-hidden group h-[120px]"
          >
            <div className="flex h-full w-full">
              {/* Image Side - Fixed to 50% width */}
              <div className="w-1/2 h-full flex items-center justify-center p-2">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <img src={item.image} alt={item.text1} className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Text Side - Fixed to 50% width */}
              <div className="w-1/2 px-3 flex flex-col justify-center">
                <p className="text-gray-900 font-semibold">{item.text1}</p>
              </div>
            </div>

            {/* Hover Poster/Overlay - Using CSS Group Hover */}
            <div className="absolute inset-0 bg-yellow-400/95 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <div className="text-center">
                <p className="text-white text-xl font-bold mb-1">{item.text2}</p>
                <MoveRight className="text-white w-6 h-6 mx-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
