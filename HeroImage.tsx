import React from 'react';

const HeroImage: React.FC = () => {
  return (
    <div className="h-full w-full relative mix-blend-luminosity opacity-40 md:opacity-100 hero-image-bg transition-all duration-500">
         <img 
            src="https://github.com/Rafael-bulezi/portfolio-repository/raw/refs/heads/main/hero%20image" 
            alt="Portrait" 
            className="w-full h-full object-cover object-[50%_50%] grayscale opacity-60 mask-image-gradient"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 60%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 60%)'
            }}
         />
    </div>
  );
};

export default HeroImage;