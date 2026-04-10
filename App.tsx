import CustomCursor from './CustomCursor';
import Navigation from './Navigation';
import Hero from './Hero';
import Capabilities from './Capabilities';
import CapabilitiesDetail from './CapabilitiesDetail';
import SelectedWork from './SelectedWork';
import AdditionalWork from './AdditionalWork';
import Contact from './Contact';
import ScrollProgress from './ScrollProgress';
import ProjectDetail from './ProjectDetail';

// Define the shape of project data
export interface ProjectData {
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
  client?: string;
  role?: string;
  gallery?: string[];
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [workFilter, setWorkFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProject]);

  const handleNavigate = (page: string, category?: string) => {
    setCurrentPage(page);
    setSelectedProject(null); // Reset selected project when navigating pages
    if (page === 'work' && category) {
      setWorkFilter(category);
    } else {
      setWorkFilter(null);
    }
  };

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
    setCurrentPage('project-detail');
  };

  const renderContent = () => {
    // If a project is selected, show detail view regardless of 'currentPage' string
    if (currentPage === 'project-detail' && selectedProject) {
        return (
            <ProjectDetail 
                project={selectedProject} 
                onBack={() => setCurrentPage('work')} 
            />
        );
    }

    switch(currentPage) {
      case 'capabilities':
        return <CapabilitiesDetail />;
      case 'work':
        return (
          <>
            <SelectedWork 
                onProjectClick={handleProjectClick} 
                showMoreLink={false} 
            />
            <AdditionalWork 
                filter={workFilter} 
                onProjectClick={handleProjectClick}
            />
          </>
        );
      default: // home
        return (
          <>
            <Hero />
            <Capabilities onNavigate={handleNavigate} />
            <SelectedWork 
                onNavigate={handleNavigate} 
                onProjectClick={handleProjectClick}
                showMoreLink={true} 
            />
          </>
        );
    }
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      
      {/* Fixed Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg hidden md:block w-full h-full border-r border-lines" />
      
      {/* Mobile Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 hidden max-md:block w-full h-full" 
        style={{
          backgroundImage: 'linear-gradient(to right, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '25% 100%'
        }}
      />

      <Navigation 
        onNavigate={(page) => handleNavigate(page)} 
        currentPage={currentPage}
      />

      {/* Side Sticky Buttons (Right) - Hide on Project Detail to reduce clutter */}
      {currentPage !== 'project-detail' && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2">
            
            {/* Home Button (Visible on non-home pages) */}
            {currentPage !== 'home' && (
            <div 
                onClick={() => handleNavigate('home')}
                className="flex flex-col items-center gap-4 bg-white text-black py-6 px-2 rounded-l-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-colors cursor-pointer mb-2"
            >
                <span className="text-sm font-bold uppercase writing-vertical tracking-widest">Home</span>
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                    <ArrowUp size={18} />
                </div>
            </div>
            )}

            {/* Contact Button */}
            <a 
            href="#contact"
            onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-4 bg-white text-black py-6 px-2 rounded-l-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-zinc-200 transition-colors cursor-pointer"
            >
            <span className="text-sm font-bold uppercase writing-vertical tracking-widest">Contact</span>
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                <ArrowDown size={18} />
            </div>
            </a>
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {renderContent()}
        {currentPage !== 'project-detail' && <Contact />}
      </main>
    </>
  );
};

export default App;
