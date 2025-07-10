import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/card';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink 
} from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: t('contact.socialLinks.github.name'),
      username: t('contact.socialLinks.github.username'),
      url: 'https://github.com/sabuuuu',
      icon: Github,
      color: 'hover:text-gray-400 hover:bg-gray-800/20',
      description: t('contact.socialLinks.github.description')
    },
    {
      name: t('contact.socialLinks.linkedin.name'),
      username: t('contact.socialLinks.linkedin.username'),
      url: 'https://www.linkedin.com/in/yafasabrina00',
      icon: Linkedin,
      color: 'hover:text-blue-400 hover:bg-blue-800/20',
      description: t('contact.socialLinks.linkedin.description')
    },
    {
      name: t('contact.socialLinks.email.name'),
      username: t('contact.socialLinks.email.username'),
      url: 'mailto:yafasabb@gmail.com',
      icon: Mail,
      color: 'hover:text-red-400 hover:bg-red-800/20',
      description: t('contact.socialLinks.email.description')
    },
    {
      name: t('contact.socialLinks.instagram.name'),
      username: t('contact.socialLinks.instagram.username'),
      url: 'https://instagram.com/sabriina.yf',
      icon: Instagram,
      color: 'hover:text-pink-400 hover:bg-pink-800/20',
      description: t('contact.socialLinks.instagram.description')
    }
  ];

  return (
    <section id="contact" className="w-[80%]">
      <section className="w-full max-w-7xl mx-auto py-20">
        <div className="text-left mb-16">
          <p className="text-[#ead3c1] text-xl mb-2">{t('contact.sectionLabel')}</p>
          <h1 className="text-5xl font-semibold text-[#FCF7F8] leading-tight">{t('contact.title')}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#FCF7F8] mb-4">
                {t('contact.socialHeading')}
              </h2>
              <p className="text-red-100/60 leading-relaxed text-lg">
                {t('contact.description1')}
              </p>
              <p className="text-red-100/60 leading-relaxed">
                {t('contact.description3')}
              </p>
            </div>
          </div>

          {/* Social Media Cards */}
          <div className="space-y-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <Card 
                  key={index} 
                  className={`border-0 bg-gradient-to-br from-[#1a1a1a]/30 to-[#0a0a0a]/20 relative overflow-hidden transition-all duration-300 hover:from-[#1a1a1a]/40 hover:to-[#0a0a0a]/30 cursor-pointer group ${social.color}`}
                >
                  <CardContent className="p-6 relative z-10">
                    <a 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-black/40 group-hover:bg-black/60 transition-colors duration-200">
                          <IconComponent className="w-6 h-6 text-[#ead3c1]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#FCF7F8] group-hover:text-current transition-colors duration-200">
                            {social.name}
                          </h3>
                          <p className="text-[#ead3c1]/80 text-sm mb-1">
                            {social.username}
                          </p>
                          <p className="text-red-100/60 text-xs">
                            {social.description}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-[#ead3c1]/60 group-hover:text-current transition-colors duration-200" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;