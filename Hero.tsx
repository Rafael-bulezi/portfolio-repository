import React from 'react';
import HeroLabel from './HeroLabel';
import HeroImage from './HeroImage';
import HeroContent from './HeroContent';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen relative flex flex-col md:flex-row w-full overflow-hidden">
      
      {/* Left Column: Label */}
      <div className="hidden md:block w-[16.666%] shrink-0 border-r border-lines relative z-20">
        <HeroLabel />
      </div>

      {/* Middle Column: Content */}
      {/* Changed width behavior to wrap content (w-auto) so the border sits at the end of content. */}
      {/* Added border-r to separate content from image visually at the 'Design' end point. */}
      <div className="flex flex-col justify-center px-6 pt-32 pb-12 relative z-10 w-auto shrink-0 border-r border-lines">
          <HeroContent />
      </div>

      {/* Right Column: Image */}
      {/* Set to flex-1 to occupy remaining space starting from where 'Design' ends */}
      <div className="hidden md:block flex-1 relative z-0 min-w-0">
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;