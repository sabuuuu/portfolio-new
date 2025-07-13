import { Github } from 'lucide-react';
import BlurText from '../bits/TextAnimations/BlurText/BlurText';
import { useTranslation } from 'react-i18next';
import PortfolioProjects from '../reusable/PortfolioProjects';

const Project = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="mt-16 w-[80%]">
      <div className="mb-20">
        <BlurText text={t('project.sectionLabel')} className="text-[#FCF7F8] text-2xl font-semibold mb-2" />
        <h1 className="text-5xl font-semibold text-[#FCF7F8] leading-tight">{t('project.title')}</h1>
        <p className="text-gray-400 text-base mt-2">
          {t('project.description')}
        </p>
      </div>
      
      <div>
        <PortfolioProjects />
      </div>
      
      <div>
        <a 
          href="https://github.com/sabuuuu" 
          target="_blank" 
          className="flex items-center justify-center gap-2 mt-6 w-full px-6 py-4 bg-[#0e0e0e] text-[#FCF7F8] rounded-xl border border-gray-700/50 hover:bg-[#0e0e0e]/50 transition-colors duration-300"
        >
          {t('project.cta')} <Github size={16} />
        </a>
      </div>
    </section>
  );
};

export default Project;