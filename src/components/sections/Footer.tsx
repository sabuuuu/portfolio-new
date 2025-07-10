import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="text-[#FCF7F8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Divider */}
        <div className="border-t border-gray-800 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} Sabrina Yf. {t('footer.text')}
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-200 transition-colors duration-200 text-sm"
              aria-label={t('footer.backToTop')}
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;