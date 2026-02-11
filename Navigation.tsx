import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onNavigate, 
  currentPage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Home', value: 'home' },
    { label: 'Capabilities', value: 'capabilities' },
    { label: 'Work', value: 'work' },
    { label: 'Contact', value: 'contact' }
  ];

  const socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'WhatsApp', href: 'https://wa.me/244952584360' },
    { label: 'Facebook', href: '#' }
  ];

  // Conditional styling for the menu button based on current page
  const isWorkPage = currentPage === 'work';
  
  const buttonClasses = `rounded-full px-8 py-4 border transition-colors duration-300 cursor-pointer group flex items-center gap-3 ${
    isWorkPage 
      ? "bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] hover:bg-[#660000]" 
      : "bg-white/10 backdrop-blur-md text-[#FFFFFF] border-white/10 hover:bg-[#FFFFFF] hover:text-[#000000]"
  }`;

  return (
    <>
      <nav 
        className="fixed top-0 left-0 w-full z-[90] px-6 py-6 flex justify-between items-start mix-blend-difference"
        style={{ color: '#FFFFFF' }} // Force white for blend mode
      >
        <div className="w-1/4 hidden md:block">
           {/* Empty Left Block */}
        </div>
        <div className="md:hidden">
          <span 
            className="text-sm font-bold tracking-widest uppercase cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            RB.
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Menu Button */}
          <button 
            onClick={toggleMenu}
            className={buttonClasses}
          >
            <span className="text-sm font-bold uppercase tracking-widest group-hover:hidden">Menu</span>
            <span className="hidden group-hover:block">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[85] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full h-full flex flex-col relative">
            
            {/* Background Grid inside Menu */}
            <div className="absolute inset-0 pointer-events-none z-0 grid-bg hidden md:block w-full h-full border-r border-white/10 opacity-10" />

            {/* Menu Content */}
            <div className="flex-grow flex flex-col justify-center px-6 md:px-24 z-10">
                <div className="flex flex-col items-start gap-2">
                    {menuItems.map((item, index) => (
                        <button 
                            key={index}
                            onClick={() => {
                                if (item.value === 'contact') {
                                    setIsMenuOpen(false);
                                    setTimeout(() => {
                                        const contactSection = document.getElementById('contact');
                                        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }, 300);
                                } else {
                                    handleNavigation(item.value);
                                }
                            }}
                            className="group relative flex items-start gap-4 text-left w-full"
                        >
                            {/* Label Container with Hover Background */}
                            <div className="relative overflow-hidden">
                                {/* Red Hover Background */}
                                <div className="absolute inset-0 bg-[#8B0000] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out origin-bottom"></div>
                                
                                {/* Text with subtle scale animation on hover */}
                                <span className="relative z-10 block font-sans font-bold text-5xl md:text-8xl uppercase tracking-tighter px-2 py-1 text-white group-hover:text-black transition-all duration-300 transform group-hover:scale-105 origin-left leading-[0.9]">
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="w-full px-6 md:px-24 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-end z-10 bg-black">
                <div className="flex flex-col gap-4 mb-8 md:mb-0">
                    {socialLinks.map((link) => (
                         <a 
                            key={link.label}
                            href={link.href} 
                            className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                        >
                            {link.label}
                         </a>
                    ))}
                </div>
                
                <div className="flex items-center gap-2">
                    {/* Changed dot color to Red */}
                    <span className="w-2 h-2 rounded-full bg-[#8B0000]"></span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                        Made by Rafael Bulezi
                    </span>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;