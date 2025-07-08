import { useState, useEffect, lazy, Suspense } from 'react'
import { Github, Linkedin, FileText, ArrowDown } from 'lucide-react'
import SplitText from '../bits/TextAnimations/SplitText/SplitText'
const Particles = lazy(() => import('../bits/Backgrounds/Particles/Particles'))

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true)
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/yourusername',
      color: 'hover:text-pink-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-rose-300'
    },
    {
      icon: FileText,
      label: 'Resume',
      href: '/resume.pdf',
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
                text="Hi, I'm Yafa Sabrina"
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
                Software
                <span className="block">
                  Developer
                </span>
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
                I'm a passionate software developer with over 3 years of experience crafting 
                digital solutions that bridge the gap between innovative design and robust functionality. 
                I specialize in building scalable web applications using modern technologies like React, 
                Node.js, and cloud platforms.
              </p>
              <p>
                My journey in tech started with a curiosity about how things work under the hood, 
                and has evolved into a deep commitment to creating user-centered experiences that 
                not only look beautiful but perform exceptionally. I believe in writing clean, 
                maintainable code and staying current with industry best practices.
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
          aria-label="Scroll to next section"
        >
          <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Scroll Down
          </span>
          <ArrowDown size={24} className="animate-bounce" />
        </button>
      </div>
    </section>
  )
}

export default Hero