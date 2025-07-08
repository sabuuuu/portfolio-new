/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, lazy, Suspense } from 'react'
import { Mail, Linkedin, FileText, ArrowDown, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SplitText from '../bits/TextAnimations/SplitText/SplitText'
const Particles = lazy(() => import('../bits/Backgrounds/Particles/Particles'))

function Hero() {
  // Destructure i18n here to get the current language
  const { t, i18n } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true)
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])


  const resumePath = i18n.language === 'fr' ? '/fr.pdf' : '/en.pdf';

  const socialLinks = [
    {
      icon: Mail,
      label: t('hero.social_links.email_label'),
      href: 'mailto:yafasabb@gmail.com',
      color: 'hover:text-pink-300'
    },
    {
      icon: Github,
      label: t('hero.social_links.github_label'),
      href: 'https://github.com/sabuuuu',
      color: 'hover:text-blue-300'
    },
    {
      icon: Linkedin,
      label: t('hero.social_links.linkedin_label'),
      href: 'https://www.linkedin.com/in/yafasabrina00/',
      color: 'hover:text-rose-300'
    },
    {
      icon: FileText,
      label: t('hero.social_links.resume_label'),
      href: resumePath,
      color: 'hover:text-red-300'
    }
  ]

  const scrollToNext = () => {
    const nextSection = document.getElementById('about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative -mt-20 w-full h-screen flex items-center justify-center overflow-hidden">
      {showParticles && (
        <div className="absolute inset-0 w-full h-full">
          <Suspense fallback={null}>
            <Particles     
              particleColors={['#ffffff', '#ffffff']}
              particleCount={400}
              particleSpread={10}
              speed={0.05}
              particleBaseSize={60}
              moveParticlesOnHover={true}                
              alphaParticles={false}
              disableRotation={false} 
            />
          </Suspense>
        </div>
      )}
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <SplitText
                text={t('hero.greeting')}
                className="text-lg font-medium text-[#FCF7F8] tracking-wide"
                splitType="chars"
                delay={40}
                duration={0.5}
                ease="power3.out"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              
              <h1 className="text-5xl md:text-6xl font-bold text-[#FCF7F8] leading-tight">
                {t('hero.title')}
              </h1>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.href}
                    // Add download attribute for the resume link
                    download={link.icon === FileText ? `Resume-YafaSabrina-${i18n.language}.pdf` : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-5 rounded-xl border border-[#FCF7F8]/20 text-[#FCF7F8] transition-all duration-300 hover:border-[#FCF7F8] hover:scale-105 `}
                    aria-label={link.label}
                  >
                    <Icon size={24} />
                  </a>
                )
              })}
            </div>
          </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="text-[#FCF7F8] text-lg leading-relaxed space-y-6 max-w-4xl">
            <p className="text-xl">
              {t('hero.description_1')}
            </p>
            <p>
              {t('hero.description_2')}
            </p>
          </div>
        </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button 
          onClick={scrollToNext}
          className="flex flex-col items-center text-rose-300 hover:text-white transition-colors duration-300 group"
          aria-label={t('hero.scroll_aria_label')}
        >
          <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {t('hero.scroll_indicator')}
          </span>
          <ArrowDown size={24} className="animate-bounce" />
        </button>
      </div>
    </section>
  )
}

export default Hero