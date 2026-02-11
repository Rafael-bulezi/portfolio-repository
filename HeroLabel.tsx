import React from 'react';

const HeroLabel: React.FC = () => {
  const firstName = "RAFAEL".split('');
  const lastName = "BULEZI".split('');

  return (
    <div className="hidden md:flex h-full w-full items-center justify-center select-none group cursor-pointer">
        {/* Container for alignment */}
        <div className="relative h-[80vh] flex items-center justify-center w-full">
            
            {/* Initials (Default View) - Blanka Font */}
            <div 
                className="absolute flex flex-col items-center justify-between h-[30vh] opacity-100 group-hover:opacity-0 transition-opacity duration-500"
            >
                 <span className="font-display text-6xl text-white animate-glow">R</span>
                 <div className="w-px h-12 bg-white/20 my-4"></div>
                 <span className="font-display text-6xl text-white animate-glow">B</span>
            </div>

            {/* Full Name (Hover View) - Vertical Blanka Text Stacked Vertically */}
            <div 
                className="absolute flex flex-col items-center justify-center gap-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
                {/* First Name Column */}
                <div className="flex flex-col items-center gap-1">
                    {firstName.map((char, index) => (
                        <span key={`f-${index}`} className="font-display text-4xl text-white animate-glow leading-none">
                            {char}
                        </span>
                    ))}
                </div>

                {/* Last Name Column */}
                <div className="flex flex-col items-center gap-1">
                    {lastName.map((char, index) => (
                        <span key={`l-${index}`} className="font-display text-4xl text-white animate-glow leading-none">
                            {char}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default HeroLabel;