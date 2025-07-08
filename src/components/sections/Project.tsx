import { Card, CardContent } from '../ui/card';
import { Github, ExternalLink } from 'lucide-react';

const Project = () => {
  const projects = [
    {
      id: 1,
      title: "Example Project",
      description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and music taste.",
      image: "/api/placeholder/400/300",
      tech: ["React", "TypeScript", "Tailwind"],
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      id: 2,
      title: "Example Project",
      description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and music taste.",
      image: "/api/placeholder/400/300",
      tech: ["React", "Node.js", "MongoDB"],
      links: {
        github: "#",
        live: "#"
      }
    }
  ];

  return (
    <div className="mt-16 w-[80%]">
      <div className="mb-9">
        <p className="text-[#ead3c1] text-xl">My work</p>
        <h1 className="text-5xl font-semibold text-[#FCF7F8] leading-tight">Projects</h1>
      </div>
      <div className=" mx-auto">
        {projects.map((project, index) => (
          <div key={project.id} className="mb-32 last:mb-0">
            <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative group bg-[#0e0e0e] rounded-xl ">
                  <Card className="relative overflow-hidden border-gray-700/50 shadow-2xl h-96">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover rounded-xl "
                      />
                  </Card>
                </div>
              </div>

              <div className={`relative z-10 ${
                index % 2 === 1 
                  ? 'lg:col-start-1 lg:-mr-20' 
                  : 'lg:-ml-20'
              }`}>
                <div className="space-y-6">
                  <div className={`space-y-4 ${index % 2 === 1 ? 'text-left' : 'text-right'}`}>
                    <h2 className="text-2xl font-bold text-[#FCF7F8]">
                      {project.title}
                    </h2>
                  </div>
                  
                  <Card className="bg-[#0e0e0e] backdrop-blur-sm border-gray-700/50 shadow-2xl">
                    <CardContent className="p-6">
                      <p className={`text-gray-300 leading-relaxed ${index % 2 === 1 ? 'text-left' : 'text-right'}`}>
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>

                  <div className={`flex flex-wrap gap-3 ${index % 2 === 1 ? 'justify-start' : 'justify-end'}`}>
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-sm font-medium text-red-200/80 bg-[#0e0e0e] rounded-full border border-red-900/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex gap-4 ${index % 2 === 1 ? 'justify-start' : 'justify-end'}`}>
                    <a 
                      href={project.links.github}
                      className="p-2 text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                      aria-label="View on GitHub"
                    >
                      <Github size={24} />
                    </a>
                    <a 
                      href={project.links.live}
                      className="p-2 text-gray-300 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                      aria-label="View live project"
                    >
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="mt-12 w-full px-6 py-4 bg-[#0e0e0e] text-[#FCF7F8] rounded-xl border border-gray-700/50 hover:bg-[#0e0e0e]/50 transition-colors duration-300">
          More projects on GitHub
        </button>
      </div>
    </div>
  );
};

export default Project;