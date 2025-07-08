import { Card, CardContent } from '../ui/card';
import { Github, ExternalLink } from 'lucide-react';
import BlurText from '../bits/TextAnimations/BlurText/BlurText';
import farmconnectImage from '../../assets/farmconnect.png';
import savvyImage from '../../assets/savvy.png';
import { useTranslation } from 'react-i18next';

const Project = () => {
  const { t } = useTranslation();
  
  const projects = [
    {
      id: 1,
      title: t('project.projects.farmconnect.title'),
      description: t('project.projects.farmconnect.description'),
      image: farmconnectImage,
      tech: ["React", "NestJS", "Prisma", "Flutter", "Tailwind CSS"],
      links: {
        github: "#",
        live: "https://farmconnect-dev.tech-instinct.com/"
      }
    },
    {
      id: 2,
      title: t('project.projects.savvy.title'),
      description: t('project.projects.savvy.description'),
      image: savvyImage,
      tech: ["Next.js", "CRON", "Node-fetch", "Tailwind CSS"],
      links: {
        github: "https://github.com/sabuuuu/savvy",
        live: "https://savvy-zeta.vercel.app/"
      }
    }
  ];

  return (
    <section id="projects" className="mt-16 w-[80%]">
      <div className="mb-9">
        <p className="text-[#ead3c1] text-xl">{t('project.sectionLabel')}</p>
        <h1 className="text-5xl font-semibold text-[#FCF7F8] leading-tight">{t('project.title')}</h1>
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
                      className={`
                        h-[95%] w-[97%]
                        absolute ${index % 2 === 0 ? 'bottom-0 left-0 rounded-tr-xl' : 'bottom-0 right-0 rounded-tl-xl'}
                        ${index % 2 === 0 ? 'origin-bottom-left' : 'origin-bottom-right'}
                        group-hover:scale-101 transition-transform duration-300
                      `}
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
                  <div className={`space-y-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <BlurText
                        text={project.title}
                        className="text-2xl font-bold text-[#FCF7F8] inline-block"
                        animateBy="words"
                        delay={150}
                        stepDuration={0.25}
                        threshold={0.2}
                        rootMargin="0px 0px -10% 0px"
                        direction="top"
                      />
                    </div>
                  </div>
                  
                  <Card className="bg-[#0e0e0e] backdrop-blur-sm border-gray-700/50 shadow-2xl">
                    <CardContent className="p-6">
                      <p className={`text-gray-300 leading-relaxed ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>

                  <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-sm font-medium text-red-200/80 bg-[#0e0e0e] rounded-full border border-red-900/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex gap-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <a 
                      href={project.links.github}
                      className="p-2 text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                      aria-label={t('project.ariaLabels.viewGithub')}
                    >
                      <Github size={24} />
                    </a>
                    <a 
                      href={project.links.live}
                      className="p-2 text-gray-300 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                      aria-label={t('project.ariaLabels.viewLive')}
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
        <a href="https://github.com/sabuuuu" target="_blank" className="flex  items-center justify-center gap-2 mt-12 w-full px-6 py-4 bg-[#0e0e0e] text-[#FCF7F8] rounded-xl border border-gray-700/50 hover:bg-[#0e0e0e]/50 transition-colors duration-300">
          {t('project.cta')} <Github size={16} />
        </a>
      </div>
    </section>
  );
};

export default Project;