import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Edit, Github } from 'lucide-react';

const HomePage: React.FC = () => {
  const [githubLink, setGithubLink] = useState('https://github.com/Kthree-K3');

  useEffect(() => {
    const savedGithub = localStorage.getItem('global_github_link');
    if (savedGithub) {
      setGithubLink(savedGithub);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-violet-500 selection:text-white flex flex-col">
      <header className="absolute top-0 left-0 w-full z-10 p-4">
          <div className="container mx-auto flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center text-white font-bold">K3</div>
                <span className="text-xl font-bold text-white">Manga Translator</span>
            </div>
             <a 
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
          </div>
      </header>

      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="container mx-auto px-4 text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300"
          >
            ابزار مورد نیاز خود را انتخاب کنید
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-12"
          >
            چه به دنبال ترجمه سریع و تمام خودکار باشید و چه به ابزارهای حرفه‌ای برای ویرایش نیاز داشته باشید، ما راه حل مناسب شما را داریم.
          </motion.p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* AutoTranslate Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1"
            >
              <a href="/autotranslate" className="block h-full p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all group backdrop-blur-sm text-right">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Zap />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white">AutoTranslate Edition</h2>
                <p className="text-slate-400 mb-6">
                  سریع‌ترین راه برای ترجمه مانگا. ایده‌آل برای خوانندگان و گروه‌های ترجمه کوچک که به دنبال سرعت و سادگی هستند.
                </p>
                <span className="font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">ورود به صفحه محصول &rarr;</span>
              </a>
            </motion.div>

            {/* Editor Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
               className="flex-1"
            >
               <a href="/editor" className="block h-full p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all group backdrop-blur-sm text-right">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Edit />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white">Editor Edition</h2>
                <p className="text-slate-400 mb-6">
                  مجموعه ابزار کامل برای تایپیست‌ها و ویراستاران حرفه‌ای. کنترل کامل بر روی لایه‌ها، فونت‌ها و استایل‌ها.
                </p>
                <span className="font-semibold text-teal-400 group-hover:text-teal-300 transition-colors">ورود به صفحه محصول &rarr;</span>
              </a>
            </motion.div>
          </div>
        </div>
      </main>
      
      <footer className="w-full text-center p-6 text-slate-600">
        © 2024 K3 Team. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;