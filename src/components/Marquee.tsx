import React from "react";

const Marquee: React.FC = () => {
  return (
    <div className="relative overflow-hidden border border-gray-700 rounded-3xl py-3 bg-gradient-to-r from-black via-gray-900 to-black">
      {/* Fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>

      {/* Marquee content */}
      <div className="animate-marquee flex whitespace-nowrap">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex">
              {Array(6)
                .fill(null)
                .map((_, j) => (
                  <span
                    key={j}
                    className="mx-1 text-lg font-bold text-gray-200 glitch-text"
                  >
                    ✦ PERSONAL <span className="text-white">PORTFOLIO</span>
                  </span>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
