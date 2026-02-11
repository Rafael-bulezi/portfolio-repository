import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, X, Maximize, Minimize, Play, Pause, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';

// Declare GSAP on window to satisfy TS if needed
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

interface ProjectData {
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
  client?: string;
  role?: string;
  gallery?: string[];
}

interface ProjectDetailProps {
  project: ProjectData;
  onBack: () => void;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showFullScreen, setShowFullScreen] = useState(false);
  const [heroUIVisible, setHeroUIVisible] = useState(true);
  
  // Video Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Category Logic
  const isVideoCategory = project.category === 'AI Media' || project.category === 'Video Editing';
  const isGraphicDesign = project.category === 'Graphic Design';
  const isWebDesign = project.category === 'Web Design';

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);

      // Standard Reveal Animation
      const items = document.querySelectorAll('.animate-up');
      gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );

      // Video Specific Animations
      if (isVideoCategory && videoRef.current && heroRef.current) {
         // Parallax Effect
         gsap.fromTo(videoRef.current, 
            { scale: 1.1, y: 0 },
            { 
              scale: 1.2,
              y: 100,
              ease: "none",
              scrollTrigger: {
                 trigger: heroRef.current,
                 start: "top top",
                 end: "bottom top",
                 scrub: true
              }
            }
         );
      }
    }
  }, [isVideoCategory]);

  // Handle Play/Pause
  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
        videoRef.current.play();
        setHeroUIVisible(false); // Auto-hide elements when playing
    } else {
        videoRef.current.pause();
        // We don't auto-show on pause, we let the user decide via the Eye icon,
        // but we ensure the Eye icon becomes visible because !isPlaying is true.
    }
  };

  // Toggle UI Visibility (Manual)
  const toggleUI = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeroUIVisible(!heroUIVisible);
  };

  // Handle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Handle Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(curr);
      if (dur > 0) {
        setProgress((curr / dur) * 100);
      }
    }
  };

  // Handle Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
        const newTime = (val / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
        setProgress(val);
        setCurrentTime(newTime);
    }
  };

  const handleLoadedMetadata = () => {
      if (videoRef.current) {
          setDuration(videoRef.current.duration);
      }
  };

  // Gallery Logic
  let rawGallery = project.gallery || [
    project.image,
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  ];

  let displayGallery = rawGallery;

  if (isVideoCategory) {
    displayGallery = [rawGallery[0]];
  } else if (isGraphicDesign) {
    displayGallery = [rawGallery[0]];
  }

  // Video Source Logic
  let videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-a-fan-32630-large.mp4";
  
  if (project.title === "Neon Nights") {
    videoSrc = "https://github.com/Rafael-bulezi/portfolio-repository/raw/refs/heads/main/upscaled-video.avi";
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-dark text-white relative z-50">
      
      {/* Full Screen Image Modal (Only for non-video categories) */}
      {showFullScreen && !isVideoCategory && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-10 animate-fade-in">
            <button 
                onClick={() => setShowFullScreen(false)}
                className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors z-50 p-2 bg-black/50 rounded-full"
            >
                <X size={32} />
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain shadow-2xl" 
                />
            </div>
        </div>
      )}

      {/* Hero Section */}
      <div 
        ref={heroRef}
        onClick={isVideoCategory ? togglePlay : undefined}
        className={`relative w-full h-screen overflow-hidden group ${isVideoCategory ? 'cursor-pointer' : ''}`}
      >
        
        {/* Conditional Hero Background */}
        {isVideoCategory ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted={isMuted}
                    playsInline 
                    // @ts-ignore
                    webkit-playsinline="true"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform opacity-60"
                    poster={project.image}
                    key={videoSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                >
                    <source src={videoSrc} />
                </video>
                
                {/* Paused "PLAY" Overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-sm transition-all duration-300">
                        <button 
                            onClick={togglePlay}
                            className="font-display text-[15vw] md:text-[12vw] uppercase tracking-tighter text-white hover:text-[#E5D94D] transition-colors cursor-pointer drop-shadow-2xl hover:scale-105 transform duration-300"
                        >
                            Play
                        </button>
                    </div>
                )}

                {/* Hide/Unhide Elements Toggle (Only visible when Paused) */}
                {!isPlaying && (
                    <button 
                        onClick={toggleUI}
                        className="absolute top-24 right-6 md:right-12 z-50 bg-black/20 backdrop-blur-md border border-white/10 p-3 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 group/toggle"
                        title={heroUIVisible ? "Hide Elements" : "Show Elements"}
                    >
                        {heroUIVisible ? <EyeOff size={24} /> : <Eye size={24} />}
                        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest bg-black px-2 py-1 rounded opacity-0 group-hover/toggle:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {heroUIVisible ? "Hide UI" : "Show UI"}
                        </span>
                    </button>
                )}
                
                {/* Minimalist Controls - Appear on Hover */}
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-6 pt-24 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end pointer-events-auto"
                >
                    <div className="flex items-center gap-4 w-full">
                        {/* Play/Pause Button */}
                        <button 
                            onClick={togglePlay}
                            className="text-white hover:text-[#E5D94D] transition-colors focus:outline-none"
                        >
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        </button>

                        {/* Progress Bar */}
                        <div className="flex-1 relative h-6 flex items-center group/track">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="0.1"
                                value={progress}
                                onChange={handleSeek}
                                className="absolute w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full group-hover/track:[&::-webkit-slider-thumb]:w-3 group-hover/track:[&::-webkit-slider-thumb]:h-3 transition-all"
                            />
                            <div 
                                className="h-1 bg-white rounded-full pointer-events-none"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        {/* Time & Volume */}
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono font-bold text-zinc-300 min-w-[60px] text-right">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                            
                            <button 
                                onClick={toggleMute}
                                className="text-white hover:text-[#E5D94D] transition-colors focus:outline-none"
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
        )}
        
        {/* Gradient Overlay for Text Readability - Hidden if UI is toggled off */}
        <div className={`absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none transition-opacity duration-500 ${!heroUIVisible ? 'opacity-0' : 'opacity-100'}`} />

        {/* Content Container */}
        <div className={`absolute inset-0 flex flex-col justify-between p-6 md:p-12 pb-12 pt-32 z-20 pointer-events-none ${isVideoCategory ? 'group-hover:opacity-0 transition-opacity duration-300' : ''}`}>
            
            {/* Top Area: Title & Category */}
            <div className={`transition-all duration-500 transform ${!heroUIVisible ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <div className="max-w-5xl animate-up pointer-events-auto">
                     <div className="flex items-center gap-4 mb-6">
                        <span className="bg-[#E5D94D] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                            {project.category}
                        </span>
                        <span className="px-3 py-1 border border-white/30 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                            Case Study
                        </span>
                     </div>
                     <h1 className="font-display text-[10vw] md:text-8xl lg:text-9xl uppercase leading-[0.85] text-white tracking-tighter drop-shadow-lg">
                        {project.title}
                     </h1>
                </div>
            </div>

            {/* Bottom Area: Controls & Stats - Hide on Hover for Video Category to show player controls */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 w-full pointer-events-auto">
                
                {/* Buttons */}
                <div className="animate-up">
                    {/* Web Design: View Live Site */}
                    {isWebDesign && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); window.open('#', '_blank'); }}
                            className={`bg-[#E5D94D] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-3 cursor-pointer pointer-events-auto ${!heroUIVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <span>View Live Site</span>
                            <ArrowUpRight size={14} />
                        </button>
                    )}

                    {/* Graphic Design: Toggle UI Visibility */}
                    {isGraphicDesign && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); setHeroUIVisible(!heroUIVisible); }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer pointer-events-auto shadow-lg relative z-50"
                            title={heroUIVisible ? "Hide Info" : "Show Info"}
                        >
                            {heroUIVisible ? <Maximize size={24} /> : <Minimize size={24} />}
                        </button>
                    )}
                </div>

                {/* Stats Grid - Hide if UI not visible */}
                <div className={`transition-all duration-500 transform ${!heroUIVisible ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                    <div className="flex items-center gap-0 md:gap-0 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden text-white animate-up">
                        
                        <div className="flex flex-col px-6 py-4 border-r border-white/10 min-w-[120px]">
                            <span className="font-display text-2xl md:text-3xl leading-none">{project.year}</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 mt-1">Year</span>
                        </div>

                        <div className="flex flex-col px-6 py-4 border-r border-white/10 min-w-[120px]">
                            <span className="font-display text-2xl md:text-3xl leading-none">01</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 mt-1">Version</span>
                        </div>

                        <div className="flex flex-col px-6 py-4 min-w-[140px]">
                            <span className="font-display text-2xl md:text-3xl leading-none truncate max-w-[120px]">
                                {project.role ? project.role.split(' ')[0] : 'Lead'}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 mt-1">Role</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Detail Content Section */}
      <div className="relative bg-dark z-10 -mt-2">
         <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
         
         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 p-6 md:p-24">
             <div className="md:col-span-5 flex flex-col gap-12 sticky top-24 self-start">
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-4">The Brief</span>
                    <p className="text-2xl md:text-3xl font-light text-light leading-relaxed">
                        {project.description || "Leading the design direction for a digital-first rebrand, focusing on immersive interaction patterns and a brutalist typographic system."}
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8 border-t border-lines pt-8 text-light">
                     <div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Client</span>
                         <a 
                             href="#" 
                             onClick={(e) => { e.preventDefault(); window.open('#', '_blank'); }}
                             className="font-sans text-lg flex items-center gap-2 hover:text-[#E5D94D] transition-colors group/client cursor-pointer"
                         >
                            {project.client || "Confidential"}
                            <ArrowUpRight size={16} className="text-zinc-500 group-hover/client:text-[#E5D94D] transition-colors" />
                         </a>
                     </div>
                     <div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Services</span>
                         <span className="font-sans text-lg">UI/UX, Dev</span>
                     </div>
                 </div>
             </div>

             <div className="md:col-span-7 flex flex-col gap-8">
                 {displayGallery.map((img, idx) => (
                     <div key={idx} className="group relative overflow-hidden rounded-sm">
                         <img 
                            src={img} 
                            alt={`Detail ${idx}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                         />
                         <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Fig {idx + 1}
                         </div>
                     </div>
                 ))}
                 
                 <div 
                    onClick={onBack}
                    className="mt-16 pt-16 border-t border-lines flex justify-between items-center cursor-pointer group text-light"
                 >
                     <div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2">Next Step</span>
                         <span className="font-display text-4xl md:text-6xl uppercase text-zinc-700 group-hover:text-black transition-colors">Back to Work</span>
                     </div>
                     <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                     </div>
                 </div>
             </div>

         </div>
      </div>
    </div>
  );
};

export default ProjectDetail;