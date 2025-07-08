import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const Switch = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const handleToggle = () => {
    i18n.changeLanguage(isEnglish ? 'fr' : 'en');
  };

  return (
    <section
      className="w-18 h-8 bg-[#121212] shadow-inner rounded-full flex items-center px-1 relative cursor-pointer select-none border border-gray-600 transition-all duration-300 hover:bg-[#1a1a1a]"
      onClick={handleToggle}
      aria-label="Switch language"
    >
      <input
        type="checkbox"
        className="peer hidden"
        checked={!isEnglish}
        readOnly
        aria-checked={!isEnglish}
        tabIndex={-1}
      />
      <span className={`absolute left-2 text-sm font-semibold transition-all duration-500 z-10 ${isEnglish ? 'text-gray-500 opacity-60' : 'text-gray-300'}`}>Fr</span>
      <span className={`absolute right-2 text-sm font-semibold transition-all duration-500 z-10 ${isEnglish ? 'text-gray-300' : 'text-gray-500 opacity-60'}`}>En</span>
      <div
        className={`w-6 h-6 flex justify-center items-center text-white rounded-full duration-500 transform shadow-lg hover:shadow-xl z-20 ${!isEnglish ? 'translate-x-10' : ''}`}
        style={{
          background: 'linear-gradient(135deg, #5d1a2f, #2d000f)',
          border: '2px solid #6d1e3f',
        }}
      >
        <Globe size={14} />
      </div>
    </section>
  );
};

export default Switch;