import { FiCode, FiServer, FiSmartphone, FiTool } from "react-icons/fi";
import Carousel, { type CarouselItem } from "../bits/Components/Carousel/Carousel";
import BlurText from "../bits/TextAnimations/BlurText/BlurText";
import { useTranslation } from "react-i18next";

function WhatIUse() {
  const { t } = useTranslation();

  const frontendItems: CarouselItem[] = [
    {
      title: t("whatIUse.categories.frontend.technologies.react.title"),
      description: t("whatIUse.categories.frontend.technologies.react.description"),
      id: 1,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.frontend.technologies.nextjs.title"),
      description: t("whatIUse.categories.frontend.technologies.nextjs.description"),
      id: 2,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.frontend.technologies.typescript.title"),
      description: t("whatIUse.categories.frontend.technologies.typescript.description"),
      id: 3,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.frontend.technologies.tailwind.title"),
      description: t("whatIUse.categories.frontend.technologies.tailwind.description"),
      id: 4,
      icon: <img src="https://static.cdnlogo.com/logos/t/58/tailwind-css.svg" alt="Tailwind CSS" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.frontend.technologies.jest.title"),
      description: t("whatIUse.categories.frontend.technologies.jest.description"),
      id: 6,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" alt="Jest" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.frontend.technologies.graphql.title"),
      description: t("whatIUse.categories.frontend.technologies.graphql.description"),
      id: 7,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" alt="GraphQL" className="h-[24px] w-[24px]" />,
    },
  ];

  const backendItems: CarouselItem[] = [
    {
      title: t("whatIUse.categories.backend.technologies.nodejs.title"),
      description: t("whatIUse.categories.backend.technologies.nodejs.description"),
      id: 1,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.backend.technologies.nestjs.title"),
      description: t("whatIUse.categories.backend.technologies.nestjs.description"),
      id: 2,
      icon: <img src="https://static.cdnlogo.com/logos/n/57/nestjs.svg" alt="NestJS" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.backend.technologies.prisma.title"),
      description: t("whatIUse.categories.backend.technologies.prisma.description"),
      id: 3,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.backend.technologies.postgresql.title"),
      description: t("whatIUse.categories.backend.technologies.postgresql.description"),
      id: 4,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.backend.technologies.mongodb.title"),
      description: t("whatIUse.categories.backend.technologies.mongodb.description"),
      id: 5,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.backend.technologies.firebase.title"),
      description: t("whatIUse.categories.backend.technologies.firebase.description"),
      id: 6,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.backend.technologies.supabase.title"),
      description: t("whatIUse.categories.backend.technologies.supabase.description"),
      id: 7,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" alt="Supabase" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.backend.technologies.django.title"),
      description: t("whatIUse.categories.backend.technologies.django.description"),
      id: 8,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" className="h-[24px] w-[24px]" />,
    }
  ];

  const mobileItems: CarouselItem[] = [
    {
      title: t("whatIUse.categories.mobile.technologies.reactnative.title"),
      description: t("whatIUse.categories.mobile.technologies.reactnative.description"),
      id: 1,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Native" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.mobile.technologies.flutter.title"),
      description: t("whatIUse.categories.mobile.technologies.flutter.description"),
      id: 2,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter" className="h-[24px] w-[24px]" />,
    },
  ];

  const toolsItems: CarouselItem[] = [
    {
      title: t("whatIUse.categories.tools.technologies.git.title"),
      description: t("whatIUse.categories.tools.technologies.git.description"),
      id: 1,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.tools.technologies.github.title"),
      description: t("whatIUse.categories.tools.technologies.github.description"),
      id: 2,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.tools.technologies.docker.title"),
      description: t("whatIUse.categories.tools.technologies.docker.description"),
      id: 3,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.tools.technologies.vscode.title"),
      description: t("whatIUse.categories.tools.technologies.vscode.description"),
      id: 4,
      icon: <FiCode className="h-[24px] w-[24px] text-[#ead3c1]" />,
    },
    {
      title: t("whatIUse.categories.tools.technologies.postman.title"),
      description: t("whatIUse.categories.tools.technologies.postman.description"),
      id: 5,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" className="h-[24px] w-[24px]" />,
    },
    {
      title: t("whatIUse.categories.tools.technologies.swagger.title"),
      description: t("whatIUse.categories.tools.technologies.swagger.description"),
      id: 6,
      icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg" alt="Swagger" className="h-[24px] w-[24px]" />,
    },
  ];

  const carouselConfigs = [
    {
      title: t("whatIUse.categories.frontend.title"),
      items: frontendItems,
      icon: <FiCode className="h-6 w-6 text-[#ead3c1]" />,
    },
    {
      title: t("whatIUse.categories.backend.title"),
      items: backendItems,
      icon: <FiServer className="h-6 w-6 text-[#ead3c1]" />,
    },
    {
      title: t("whatIUse.categories.mobile.title"),
      items: mobileItems,
      icon: <FiSmartphone className="h-6 w-6 text-[#ead3c1]" />,
    },
    {
      title: t("whatIUse.categories.tools.title"),
      items: toolsItems,
      icon: <FiTool className="h-6 w-6 text-[#ead3c1]" />,
    },
  ];

  return (
    <section id="what-i-use" className="w-[80%] mx-auto">
      <section className="w-full max-w-7xl mx-auto py-20">
        <div className="text-left mb-16">
          <BlurText 
            text={t("whatIUse.sectionLabel")} 
            className="text-[#FCF7F8] text-2xl font-semibold mb-2" 
          />
          <h1 className="text-5xl font-semibold text-[#FCF7F8] leading-tight">
            {t("whatIUse.title")}
          </h1>
          <p className="text-red-100/60 leading-relaxed text-lg mt-4 max-w-2xl">
            {t("whatIUse.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-start">
          {carouselConfigs.map((config, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4 flex items-center gap-3">
                <div className="p-2 rounded-full border border-gray-700/50 text-[#FCF7F8]">
                  {config.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#FCF7F8]">
                  {config.title}
                </h3>
              </div>
              <Carousel
                items={config.items}
                baseWidth={280}
                baseHeight={240}
                autoplay={true}
                autoplayDelay={3000 + index * 500}
                pauseOnHover={true}
                loop={true}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default WhatIUse;