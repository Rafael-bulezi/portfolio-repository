import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CapabilitiesProps {
  onNavigate?: (page: string, category?: string) => void;
}

const Capabilities: React.FC<CapabilitiesProps> = ({ onNavigate }) => {
  const items = [
    {
      title: "AI Media",
      desc: "Generative Video & Image",
      category: "AI Media"
    },
    {
      title: "Video Editing",
      desc: "Post Production & Motion",
      category: "Video Editing"
    },
    {
      title: "Web Design",
      desc: "UI/UX & Interactive Systems",
      category: "Web Design"
    },
    {
      title: "Graphic Design",
      desc: "Brand Identity & Visuals",
      category: "Graphic Design"
    }
  ];

  const handleClick = (category: string) => {
    if (onNavigate) {
      onNavigate('capabilities');
    }
  };

  return (
    <section id="capabilities" className="border-t border-lines">
      <div className="grid grid-cols-1 md:grid-cols-6">
        {/* Label Column */}
        <div className="md:col-span-1 border-r border-lines p-6 hidden md:block">
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 sticky top-24">Capabilities</span>
        </div>
        
        {/* Content Columns */}
        <div className="md:col-span-5">
          {items.map((item, i) => (
            <div 
                key={i} 
                onClick={() => handleClick(item.category)}
                className="group border-b border-lines hover:bg-white/5 transition-colors duration-300 cursor-pointer"
            >
              <div className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <h3 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                  {item.title}
                </h3>
                <div className="flex items-center gap-4 text-zinc-500 group-hover:text-white transition-colors">
                  <span className="text-xs uppercase tracking-widest">{item.desc}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;