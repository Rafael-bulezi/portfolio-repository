import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectData } from '../App';

interface SelectedWorkProps {
  onNavigate?: (page: string) => void;
  onProjectClick?: (project: ProjectData) => void;
  showMoreLink?: boolean;
}

const SelectedWork: React.FC<SelectedWorkProps> = ({ onNavigate, onProjectClick, showMoreLink = false }) => {
  const projects = [
    {
      id: "01",
      title: "Nivora",
      subtitle: "E-Commerce Template",
      category: "Web Design",
      year: "2024",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
      description: "A revolutionary e-commerce template designed for high-end fashion brands. Nivora combines bold typography with subtle animations to create a luxury shopping experience.",
      client: "Nivora Fashion",
      role: "UI/UX Design"
    },
    {
      id: "02",
      title: "Grido",
      subtitle: "Design System",
      category: "Graphic Design",
      year: "2023",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
      description: "A comprehensive design system built for scalability. Grido provides a unified language for cross-platform development.",
      client: "Internal Project",
      role: "System Architect"
    }
  ];

  return (
    <section id="work" className="border-t border-lines">
      <div className="grid grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-1 border-r border-lines p-6 hidden md:block">
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 sticky top-24">Best Works</span>
        </div>
        
        <div className="md:col-span-5 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {projects.map((project, index) => (
                <div 
                    key={project.id} 
                    onClick={() => onProjectClick && onProjectClick(project)}
                    className={`border-b border-lines p-8 group cursor-pointer ${index === 0 ? 'md:border-r' : ''}`}
                >
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-card relative">
                    <img 
                    src={project.image} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    alt={project.title} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            View Case <ArrowUpRight size={12} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                    <h4 className="font-stencil text-2xl uppercase tracking-wide mb-1 text-white group-hover:text-[#8B0000] transition-colors">{project.title}</h4>
                    <span className="text-sm text-zinc-500 uppercase tracking-wider font-stencil">{project.subtitle}</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-600">{project.id}</span>
                </div>
                </div>
            ))}
          </div>

          {/* More Work Link */}
          {showMoreLink && (
            <div 
                onClick={() => onNavigate && onNavigate('work')}
                className="group border-b border-lines hover:bg-white/5 transition-colors duration-300 cursor-pointer"
            >
                <div className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h3 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                        More Works
                    </h3>
                    <div className="flex items-center gap-4 text-zinc-500 group-hover:text-white transition-colors">
                        <span className="text-xs uppercase tracking-widest">View Archive</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;