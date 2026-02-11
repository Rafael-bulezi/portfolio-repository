import React, { useEffect, useRef } from 'react';
import { ProjectData } from '../App';
import { ArrowUpRight } from 'lucide-react';

interface AdditionalWorkProps {
  filter?: string | null;
  onProjectClick?: (project: ProjectData) => void;
}

const AdditionalWork: React.FC<AdditionalWorkProps> = ({ filter, onProjectClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const works = [
    // AI Media
    {
      title: "Neural Dreams",
      category: "AI Media",
      year: "2023",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
      description: "An exploration into the subconscious mind of artificial intelligence. We generated over 10,000 distinct imagery sets using custom diffusion models.",
      client: "TechArt Global",
      role: "Creative Director"
    },
    {
      title: "Synthetic Horizons",
      category: "AI Media",
      year: "2023",
      image: "https://images.unsplash.com/photo-1684369175836-3a65c92c8427?q=80&w=2670&auto=format&fit=crop",
      description: "Landscapes that never existed. This project pushes the boundaries of procedural generation to create hyper-realistic environments for virtual production.",
      client: "Metaverse Corp",
      role: "AI Specialist"
    },
    // Video Editing
    {
      title: "Rhythm of City",
      category: "Video Editing",
      year: "2023",
      image: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=2574&auto=format&fit=crop",
      description: "A fast-paced, rhythmic visual journey through Tokyo's nightlife. Edited to match a high-BPM techno track, emphasizing the chaotic beauty of the city.",
      client: "Travel Japan",
      role: "Editor"
    },
    {
      title: "Neon Nights",
      category: "Video Editing",
      year: "2022",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop",
      description: "Commercial spot for a new energy drink brand. Heavy use of motion graphics and neon overlays.",
      client: "Volt Energy",
      role: "Motion Designer"
    },
    // Graphic Design
    {
      title: "Vertex Identity",
      category: "Graphic Design",
      year: "2022",
      image: "https://images.unsplash.com/photo-1611532736597-a51e16c58906?q=80&w=2670&auto=format&fit=crop",
      description: "Complete brand overhaul for a fintech startup. The logo represents stability and growth through geometric precision.",
      client: "Vertex Finance",
      role: "Brand Lead"
    },
    {
      title: "Bold Typography",
      category: "Graphic Design",
      year: "2022",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
      description: "Experimental poster series exploring the limits of legibility in modern typography.",
      client: "Type Foundry",
      role: "Designer"
    },
    // Web Design
    {
      title: "Lumina Interface",
      category: "Web Design",
      year: "2023",
      image: "https://images.unsplash.com/photo-1481487484168-9b930d55208d?q=80&w=2670&auto=format&fit=crop",
      description: "A dashboard interface designed for light control systems in smart homes. Clean, accessible, and responsive.",
      client: "Lumina Smart",
      role: "UX/UI Designer"
    },
    {
      title: "Nexus Dashboard",
      category: "Web Design",
      year: "2022",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      description: "Data visualization platform for enterprise analytics. Focused on dark mode usability and real-time data updates.",
      client: "Nexus Data",
      role: "Frontend Dev"
    }
  ];

  // If filter is active, show only that category.
  // If no filter, we will iterate through all unique categories.
  const uniqueCategories = Array.from(new Set(works.map(w => w.category)));
  const categoriesToShow = filter ? [filter] : uniqueCategories;

  // Scroll to section when filter changes (if not null)
  useEffect(() => {
    if (filter && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filter]);

  return (
    <section ref={sectionRef} className="border-t border-lines bg-dark min-h-screen">
       <style>{`
         @keyframes slideUpFade {
           0% { opacity: 0; transform: translateY(40px); }
           100% { opacity: 1; transform: translateY(0); }
         }
         .animate-slide-up {
           animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
           opacity: 0;
         }
       `}</style>
       <div className="grid grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-1 border-r border-lines p-6 hidden md:block">
            <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 sticky top-24">Archive</span>
        </div>
        
        <div className="md:col-span-5 p-6 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <h3 className="font-display text-4xl uppercase text-white">
                    {filter ? `${filter} Projects` : 'Archive'}
                </h3>
                {filter && (
                     <span className="text-xs font-mono text-zinc-500">Showing {works.filter(w => w.category === filter).length} results</span>
                )}
            </div>
            
            <div className="flex flex-col gap-16">
                {categoriesToShow.map((category) => {
                     const categoryWorks = works.filter(w => w.category === category);
                     return (
                        <div key={`${category}-${filter || 'all'}`}>
                            {/* Sub Header if no filter active */}
                            {!filter && (
                                 <h4 className="font-display text-2xl uppercase text-zinc-400 mb-6 border-b border-lines pb-2 inline-block">
                                    {category}
                                 </h4>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                                {categoryWorks.map((work, index) => (
                                    <div 
                                      key={`${work.title}-${index}`} 
                                      className="group cursor-pointer animate-slide-up relative"
                                      style={{ animationDelay: `${index * 100}ms` }}
                                      onClick={() => onProjectClick && onProjectClick(work)}
                                    >
                                        <div className="aspect-video overflow-hidden mb-4 bg-card relative">
                                             <img 
                                                src={work.image} 
                                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                                                alt={work.title} 
                                            />
                                            {/* View Case Overlay Button */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                <div className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <span className="text-xs font-bold uppercase tracking-widest">View Case</span>
                                                    <ArrowUpRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-start border-t border-lines pt-4">
                                            <div>
                                                <h4 className="font-stencil text-2xl uppercase text-white group-hover:text-[#8B0000] transition-colors">{work.title}</h4>
                                                <span className="text-sm uppercase tracking-widest text-zinc-500 font-stencil">{work.category}</span>
                                            </div>
                                            <span className="text-xs font-mono text-zinc-600">{work.year}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                     );
                })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalWork;