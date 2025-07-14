import { Github } from "lucide-react";
import farmconnectImage from "../../assets/farmconnect.png";
import savvyImage from "../../assets/savvy.png";
import BibTechImage from "../../assets/bib.png";
import WatchWaveImage from '../../assets/home.png'
import lifedropImage from "../../assets/lifedrop.png";
import eplanImage from "../../assets/login.png";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const CircularGallery = lazy(() => import("../bits/Components/CircularGallery/CircularGallery"))

interface PortfolioProject {
  image: string;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  link?: string;
  github?: string;
}

const portfolioProjects: PortfolioProject[] = [
  {
    image: farmconnectImage,
    titleKey: "project.projects.farmconnect.title",
    descriptionKey: "project.projects.farmconnect.description",
    tech: ["React.js", "NestJS", "Prisma", "Flutter"],
    link: "https://farmconnect-dev.tech-instinct.com/",
  },
  {
    image: savvyImage,
    titleKey: "project.projects.savvy.title",
    descriptionKey: "project.projects.savvy.description",
    tech: ["Next.js 14", "CRON", "Node-fetch"],
    link: "https://savvy-zeta.vercel.app/",
    github: "https://github.com/sabuuuu/savvy",
  },
  {
    image: BibTechImage,
    titleKey: "project.projects.bibliotech.title",
    descriptionKey: "project.projects.bibliotech.description",
    tech: ["React", "Vite", "Tailwind CSS"],
    link: "https://biblio-tech.onrender.com/",
    github: "https://github.com/sabuuuu/book-store",
  },
  {
    image: lifedropImage,
    titleKey: "project.projects.lifedrop.title",
    descriptionKey: "project.projects.lifedrop.description",
    tech: ["React Native", "Firebase", "JSON"],
    github: "https://github.com/sabuuuu/lifeDrop",
  },
  {
    image: eplanImage,
    titleKey: "project.projects.eplan.title",
    descriptionKey: "project.projects.eplan.description",
    tech: ["Django", "React.js", "Vite"],
    link: "https://e-plan-students.vercel.app/",
    github: "https://github.com/sabuuuu/e-plan",
  },
  {
    image: WatchWaveImage,
    titleKey: "project.projects.watchwave.title",
    descriptionKey: "project.projects.watchwave.description",
    tech: ["Python", "TF-IDF", "NLP", "Flask", "React"],
    link: "https://tvshows-frontend.vercel.app/",
    github: "https://github.com/sabuuuu/tvshows-frontend",
  },
];

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { t } = useTranslation();
  
  return (
    <Card className="w-[300px] md:w-[335px] bg-[#0e0e0e] border-gray-700/50 text-[#FCF7F8] shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={project.image}
          alt={t(project.titleKey)}
          className="w-full h-40 object-cover rounded-t-lg -mt-6"
        />
      </CardHeader>
      <CardContent className="p-4 -mt-6">
        <h3 className="text-lg font-semibold mb-2">{t(project.titleKey)}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">{t(project.descriptionKey)}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-700/50 text-[#FCF7F8] text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2 -mt-4">
        {project.link && (
          <Button
            asChild
            className="flex-1 h-10 px-4 bg-[#FCF7F8] text-[#0e0e0e] hover:bg-[#FCF7F8]/80 text-sm"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full h-full"
            >
              {t("project.ariaLabels.viewLive") || "Visit"}
            </a>
          </Button>
        )}
        {project.github && (
          <Button
            asChild
            variant="outline"
            className="flex-1 h-10 px-4 border-gray-700/50 text-[#FCF7F8] hover:bg-gray-700/50 text-sm"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full h-full"
            >
              <Github size={16} className="mr-1" /> {t("project.ariaLabels.viewGithub") || "GitHub"}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function PortfolioGallery() {
  return (
    <div className="h-[80vh] lg:-mt-20">
      <CircularGallery
        items={portfolioProjects}
        bend={1}
        scrollSpeed={2}
        scrollEase={0.08}
      >
        {(project: PortfolioProject) => <ProjectCard project={project} />}
      </CircularGallery>
    </div>
  );
}