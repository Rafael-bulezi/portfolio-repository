import React from 'react';

const CapabilitiesDetail: React.FC = () => {
  const details = [
    {
      id: "01",
      title: "AI Media",
      subtitle: "Generative Video & Image",
      description: "Pushing the boundaries of content creation through fine-tuned diffusion models and procedural generation pipelines.",
      bgClass: "bg-card"
    },
    {
      id: "02",
      title: "Video Editing",
      subtitle: "Post Production & Motion",
      description: "Crafting narratives through precise rhythm, color grading, and dynamic motion graphics that capture attention.",
      bgClass: "bg-dark"
    },
    {
      id: "03",
      title: "Web Design",
      subtitle: "UI/UX & Interactive Systems",
      description: "Building responsive, accessible, and highly performant web experiences using modern frameworks and design systems.",
      bgClass: "bg-card"
    },
    {
      id: "04",
      title: "Graphic Design",
      subtitle: "Brand Identity & Visuals",
      description: "Translating core brand values into cohesive visual languages, logotypes, and marketing collateral.",
      bgClass: "bg-dark"
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {details.map((detail) => (
        <section 
            key={detail.id} 
            className={`min-h-[80vh] md:min-h-screen relative flex flex-col justify-center px-6 py-24 md:pl-[16.666%] border-t border-lines ${detail.bgClass}`}
        >
            <div className="absolute top-12 right-6 md:right-12 text-[10px] font-bold tracking-widest uppercase text-zinc-600">
                {detail.id} / Capability
            </div>

            <div className="max-w-4xl z-10">
                {/* Changed text-[#CCFF00] to text-[#FF0000] */}
                <span className="block text-xs font-bold tracking-[0.2em] uppercase text-[#FF0000] mb-6">
                    {detail.subtitle}
                </span>
                <h2 className="font-display text-6xl md:text-9xl uppercase tracking-tighter text-white mb-8 leading-[0.85]">
                    {detail.title}
                </h2>
                <p className="text-xl md:text-3xl font-light text-zinc-400 leading-normal md:w-3/4">
                    {detail.description}
                </p>
            </div>
            
            {/* Decorative background number */}
            <div className="absolute bottom-0 right-0 font-display text-[20vw] leading-none text-white/5 select-none pointer-events-none">
                {detail.id}
            </div>
        </section>
      ))}
    </div>
  );
};

export default CapabilitiesDetail;