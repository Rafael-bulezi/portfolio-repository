import React from 'react';

const HeroContent: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-start select-none z-10 relative">
        <div className="">
            <h1 
                className="font-display text-huge uppercase tracking-wide text-white whitespace-nowrap animate-reveal"
                style={{ animationDelay: '0ms' }}
            >
              <span className="animate-glow">Design</span>
            </h1>
        </div>
        
        {/* Adjusted padding for AI to align 'A' over 'E' of Media. Media is at pl-24. */}
        <div className="w-full">
            <h1 
                className="font-display text-huge uppercase tracking-wide text-white pl-20 md:pl-56 whitespace-nowrap animate-reveal"
                style={{ animationDelay: '200ms' }}
            >
              <span className="animate-glow">AI</span>
            </h1>
        </div>

        <div className="w-full">
            <h1 
                className="font-display text-huge uppercase tracking-wide text-white pl-8 md:pl-24 whitespace-nowrap animate-reveal"
                style={{ animationDelay: '400ms' }}
            >
              <span className="animate-glow opacity-80">Media</span>
            </h1>
        </div>
      </div>
      
      <div 
        className="mt-12 md:mt-24 max-w-xl z-10 relative animate-reveal"
        style={{ animationDelay: '600ms' }}
      >
        <p className="text-lg md:text-2xl font-light text-light leading-relaxed font-sans">
          Creative Technologist | Blending strategy, code, and motion. Based in Luanda, Angola (GMT+1) — remote-ready for global impact. Focused on AI-driven media and high-performance web applications. Crafting graphic design and cinematic video to build immersive products.
        </p>
      </div>
    </>
  );
};

export default HeroContent;