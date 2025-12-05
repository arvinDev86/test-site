import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Send, Instagram, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [githubLink, setGithubLink] = useState('https://github.com/Kthree-K3');
  const [telegramLink, setTelegramLink] = useState<string | null>(null);
  const [instagramLink, setInstagramLink] = useState<string | null>(null);
  const [youtubeLink, setYoutubeLink] = useState<string | null>(null);

  useEffect(() => {
    // Disable body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const savedLogo = localStorage.getItem('navbar_logo');
    if (savedLogo) {
      setLogo(savedLogo);
    }
    const savedGithub = localStorage.getItem('global_github_link');
    if (savedGithub) {
      setGithubLink(savedGithub);
    }
    const savedTelegram = localStorage.getItem('global_telegram_link');
    if (savedTelegram) {
      setTelegramLink(savedTelegram);
    }
    const savedInstagram = localStorage.getItem('global_instagram_link');
    if (savedInstagram) {
      setInstagramLink(savedInstagram);
    }
    const savedYoutube = localStorage.getItem('global_youtube_link');
    if (savedYoutube) {
      setYoutubeLink(savedYoutube);
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;

    if (targetId === '/') return;

    if (!targetId.startsWith('#')) {
      if (e.currentTarget.target === '_blank') {
        window.open(targetId, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = targetId;
      }
      return;
    }
    
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { href: '#home', text: 'خانه' },
    { href: '#features', text: 'ویژگی‌ها' },
    { href: '#updates', text: 'آپدیت‌ها' },
    { href: '#download', text: 'دانلود' },
    { href: '#about', text: 'درباره ما' },
  ];
  
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const navContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <>
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 space-x-reverse rtl:space-x-reverse">
              {logo ? (
                  <img src={logo} alt="Site Logo" className="w-10 h-10 object-contain rounded-lg" />
              ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
                      <span className="text-white font-bold text-xl">K3</span>
                  </div>
              )}
              <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-white">
                  مترجم مانگا
              </span>
          </a>
          
          <div className="flex md:order-2 items-center space-x-1 rtl:space-x-reverse">
            {/* Social Icons for Desktop */}
            <div className="hidden md:flex items-center gap-3 ml-3">
              {youtubeLink && (
                <a 
                  href={youtubeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm p-2.5 text-center flex items-center transition-all"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              )}
              {instagramLink && (
                <a 
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-400 font-medium rounded-lg text-sm p-2.5 text-center flex items-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {telegramLink && (
                <a 
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm p-2.5 text-center flex items-center transition-all"
                  aria-label="Telegram"
                >
                  <Send size={18} />
                </a>
              )}
              <a 
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-600 font-medium rounded-lg text-sm p-2.5 text-center flex items-center transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    onClick={handleNavClick}
                    className="block py-2 px-3 rounded md:p-0 transition-colors text-gray-300 hover:text-violet-500"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-sm md:hidden"
          >
            <motion.ul
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map(link => (
                <motion.li key={link.href} variants={navItemVariants}>
                  <a 
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-3xl font-semibold text-slate-200 hover:text-violet-400 transition-colors"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

             {/* Social Links for Mobile Menu */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0 }}
                className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-6"
            >
                {githubLink && (
                  <a href={githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                      <Github size={28} />
                  </a>
                )}
                {telegramLink && (
                  <a href={telegramLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="Telegram">
                      <Send size={28} />
                  </a>
                )}
                {instagramLink && (
                  <a href={instagramLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors" aria-label="Instagram">
                      <Instagram size={28} />
                  </a>
                )}
                {youtubeLink && (
                  <a href={youtubeLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                      <Youtube size={28} />
                  </a>
                )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};