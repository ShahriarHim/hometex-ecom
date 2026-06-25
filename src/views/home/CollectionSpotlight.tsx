"use client";

import { collectionSpotlight } from "@/data/migration-content";

export const CollectionSpotlight = () => {
  return (
    <section className="max-w-[1360px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop By Collections</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {collectionSpotlight.map((category, index) => {
          const roundedClass =
            index % 2 === 0
              ? "rounded-tl-[60px] rounded-br-[60px]"
              : "rounded-tr-[60px] rounded-bl-[60px]";

          return (
            <div
              key={category.id || index}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-40 h-40 overflow-hidden [perspective:1000px]">
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute w-full h-full">
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`w-full h-full object-cover ${roundedClass}`}
                    />
                  </div>
                  <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white flex items-center justify-center">
                    <div className="absolute w-full h-full">
                      <img
                        src={category.image}
                        alt={category.name}
                        className={`w-full h-full object-cover ${roundedClass}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span
                className="mt-2 font-bold transition-colors duration-300 group-hover:opacity-80"
                style={{ color: category.accent || "inherit" }}
              >
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
