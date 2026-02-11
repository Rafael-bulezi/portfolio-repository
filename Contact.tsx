import React from 'react';
import { Facebook, Instagram, ArrowRight } from 'lucide-react';

// Refined WhatsApp Icon (Solid/Bold style)
const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0012.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 004.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 00-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 01-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 01-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 015.275 2.188 7.412 7.412 0 012.184 5.279c-.002 4.114-3.349 7.462-7.466 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.71.88-.131.149-.261.168-.486.056-.224-.112-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.564-.131-.224-.014-.345.099-.458.101-.101.224-.262.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.113-.504-1.217-.69-1.666-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.429-.006-.15 0-.393.056-.599.28-.206.225-.785.767-.785 1.871 0 1.104.804 2.171.916 2.32.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.066-.056-.094-.206-.15-.43-.263" />
  </svg>
);

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center border-t border-lines relative overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img 
            src="https://images.unsplash.com/photo-1635776063328-153b13e3c245?q=80&w=2832&auto=format&fit=crop" 
            alt="Abstract Background" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark"></div>
      </div>

      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 py-20 relative z-10">
        
        {/* Main Text with Mix of Fonts */}
        <div className="flex flex-col items-center justify-center leading-none mb-10">
          <span className="font-display text-[10vw] md:text-[8vw] uppercase text-white tracking-tighter animate-glow">
            Feel Like
          </span>
          <span className="font-cursive text-[12vw] md:text-[10vw] text-white transform -rotate-2 -mt-2 md:-mt-6 pb-4 animate-glow">
            Collaborating?
          </span>
        </div>

        {/* CTA Button */}
        <a 
            href="mailto:rafaelbuleziofficial@gmail.com"
            className="group flex items-center gap-4 bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#8B0000] hover:text-white transition-all duration-300 mb-12 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(139,0,0,0.5)]"
        >
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </a>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">Contact Me</span>
          <a href="mailto:rafaelbuleziofficial@gmail.com" className="font-serif italic text-2xl md:text-3xl text-zinc-300 hover:text-white transition-colors hover-underline-animation">
            rafaelbuleziofficial@gmail.com
          </a>
          <a href="tel:+244952584360" className="font-sans text-xl text-zinc-500 hover:text-white transition-colors">
            +244 952 584 360
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full px-6 py-8 flex flex-col justify-center items-center gap-6 border-t border-lines bg-black/50 backdrop-blur-sm relative z-20">
        <div className="text-sm font-bold tracking-widest uppercase text-zinc-600 absolute left-6 bottom-8 hidden md:block">
          © 2026 RAFAEL BULEZI
        </div>
        
        {/* Centralised Icons with Colors */}
        <div className="flex gap-8 justify-center items-center">
          <a href="#" className="text-red-500 hover:text-red-400 transition-colors transform hover:scale-125 duration-300">
            <Instagram size={22} />
          </a>
          <a href="https://wa.me/244952584360" className="text-green-500 hover:text-green-400 transition-colors transform hover:scale-125 duration-300">
            <WhatsAppIcon size={22} />
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors transform hover:scale-125 duration-300">
            <Facebook size={22} />
          </a>
        </div>
        
        <div className="md:hidden text-sm font-bold tracking-widest uppercase text-zinc-600 mt-2">
            © 2026 RAFAEL BULEZI
        </div>
      </div>
    </section>
  );
};

export default Contact;