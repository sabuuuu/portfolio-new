import { useState } from 'react'
import Navbar, {
    NavBody, 
    NavItems, 
    MobileNav, 
    MobileNavHeader, 
    MobileNavMenu, 
    MobileNavToggle,
    NavbarLogo
} from './components/sections/Navbar'
import Switch from './components/reusable/Switch'
import Footer from './components/sections/Footer'
import Home from './pages/Home'
import { useTranslation } from 'react-i18next'


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navItems = [
    { name: t("navbar.about"), link: "#about" },
    { name: t("navbar.projects"), link: "#projects" },
    { name: t("navbar.contact"), link: "#contact" }
  ];
  return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <Switch />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle 
              isOpen={isOpen} 
              onClick={() => setIsOpen(!isOpen)} 
            />
          </MobileNavHeader>
          
          <MobileNavMenu 
            isOpen={isOpen}
          >
            {navItems.map((item, idx) => (
              <a 
                key={idx} 
                href={item.link}
                className="text-neutral-600 dark:text-neutral-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
        <main className="flex-grow ">
          <Home/>
        </main>
        <Footer />
      </div>
  )
}

export default App
