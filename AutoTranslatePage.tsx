import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Download, 
  ChevronDown, 
  Github,
  CopyPlus,
  BrainCircuit,
  FileImage,
  Monitor,
  ShieldCheck,
  Wrench
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroScene } from './components/Scene';
import { CompareSlider } from './components/CompareSlider';

interface UpdateEntry {
    id: string;
    version: string;
    changes: string;
}

const UpdatesSection: React.FC<{ updates: UpdateEntry[] | null }> = ({ updates }) => {
    if (!updates || updates.length === 0) {
        return null;
    }

    return (
        <section id="updates" className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">آخرین آپدیت‌ها</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        جدیدترین تغییرات و بهبودهای نسخه AutoTranslate.
                    </p>
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto bg-slate-950/50 border border-slate-800 rounded-2xl p-8 space-y-6"
                >
                    {updates.map((update) => (
                        <div key={update.id}>
                             <h3 className="text-xl font-bold text-violet-400 mb-2">{update.version}</h3>
                             <ul className="list-disc list-inside space-y-1">
                                {update.changes.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                                     <li key={index} className="text-slate-300">{line.replace(/^- /, '')}</li>
                                ))}
                             </ul>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; items: string[] }> = ({ icon, title, items }) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-slate-800 text-violet-400 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-slate-400">
          <span className="text-violet-500 mt-1.5">&#8226;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);


const AutoTranslatePage: React.FC = () => {
  const [sceneImages, setSceneImages] = useState<string[]>([]);
  const [compareImages, setCompareImages] = useState<{before: string, after: string} | null>(null);
  const [downloadLink, setDownloadLink] = useState('https://github.com/Kthree-K3/K3-Manga-AutoTranslate/releases');
  const [sourceLink, setSourceLink] = useState('https://github.com/Kthree-K3/K3-Manga-AutoTranslate');
  const [updates, setUpdates] = useState<UpdateEntry[] | null>(null);

  useEffect(() => {
    // Load images
    const beforeUrl = localStorage.getItem('manga_before');
    const afterUrl = localStorage.getItem('manga_after');
    if (beforeUrl && afterUrl) {
      setSceneImages([beforeUrl, afterUrl]);
    }

    const compareBeforeUrl = localStorage.getItem('compare_before');
    const compareAfterUrl = localStorage.getItem('compare_after');
    if (compareBeforeUrl && compareAfterUrl) {
      setCompareImages({ before: compareBeforeUrl, after: compareAfterUrl });
    }

    // Load links
    const savedDownloadLink = localStorage.getItem('autotranslate_download_link');
    if (savedDownloadLink) {
      setDownloadLink(savedDownloadLink);
    }
    const savedSourceLink = localStorage.getItem('autotranslate_source_link');
    if (savedSourceLink) {
      setSourceLink(savedSourceLink);
    }
    
    // Load Updates
    const savedUpdates = localStorage.getItem('autotranslate_updates');
    if (savedUpdates) {
      try {
        setUpdates(JSON.parse(savedUpdates));
      } catch (error) {
        console.error("Failed to parse updates from localStorage", error);
      }
    }

  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;
    
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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-violet-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50"></div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full min-h-screen pt-24 pb-12 md:pt-0 md:pb-0 gap-8">
          
          {/* Left Side: 3D Manga Panel (Hidden on mobile) */}
          <div className="w-full md:w-6/12 h-[50vh] md:h-screen hidden md:block">
            <HeroScene images={sceneImages} />
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-6/12 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-center md:text-right bg-slate-950/30 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6">
                <Zap size={14} className="text-violet-400"/>
                AutoTranslate Edition
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-violet-400 drop-shadow-sm">
                دنیای مانگا را <br/>
                <span className="text-violet-500">به زبان خودت</span> بخوان
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                K3 Manga Translator قدرتمندترین ابزار برای ترجمه، پاک‌سازی و تایپ‌ست خودکار صفحات مانگا و کمیک با استفاده از هوش مصنوعی پیشرفته.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href="#download"
                  onClick={handleScrollClick}
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-violet-600 px-8 font-medium text-white shadow-lg shadow-violet-500/40 transition-all duration-300 hover:bg-violet-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <Download className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                  دانلود رایگان
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 z-10 hidden md:block"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>
      
      {/* Showcase Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-violet-600/5"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-6 text-right">
                <h3 className="text-3xl font-bold text-white">جادوی پشت صحنه</h3>
                <p className="text-slate-400 text-lg">
                    این برنامه یک خط تولید تمام عیار است که بدون دخالت دست کار می‌کند. وقتی شما یک پوشه را وارد می‌کنید، این مراحل طی می‌شود:
                </p>
                <ol className="space-y-4 text-slate-300">
                    <li className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-violet-500">
                        <h4 className="font-bold text-white mb-1">۱. استخراج و درک مطلب (Gemini & OCR)</h4>
                        ابتدا تمام متون انگلیسی توسط موتورهای قدرتمند (EasyOCR) استخراج می‌شوند. سپس تمام صفحات یکجا برای هوش مصنوعی گوگل (Gemini 2.5 Pro) ارسال می‌شوند تا با درک کامل داستان و شخصیت‌ها، ترجمه‌ای روان و پیوسته ارائه دهد.
                    </li>
                    <li className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-violet-500">
                        <h4 className="font-bold text-white mb-1">۲. پاکسازی و رندر (LaMa & Inpainting)</h4>
                        همزمان که ترجمه آماده می‌شود، هوش مصنوعی گرافیکی (LaMa) متون اصلی را از روی تصویر پاک می‌کند (Inpainting) و متن فارسی دقیقاً در جای مناسب با فونت و سایز استاندارد قرار می‌گیرد.
                    </li>
                    <li className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-violet-500">
                        <h4 className="font-bold text-white mb-1">۳. افزایش کیفیت (Waifu2x)</h4>
                        اگر مانگای شما قدیمی یا بی‌کیفیت است، نگران نباشید. موتور داخلی Waifu2x می‌تواند قبل از ترجمه، رزولوشن تصاویر را تا ۲ برابر افزایش دهد و نویزها را حذف کند.
                    </li>
                </ol>
            </div>
            <div className="flex-1 w-full max-w-lg">
                {compareImages ? (
                    <CompareSlider beforeImage={compareImages.before} afterImage={compareImages.after} />
                ) : (
                    <div className="relative aspect-[3/4] bg-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-violet-900/20 border border-slate-700 group">
                       <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-600 font-mono text-sm">
                            <div className="text-center space-y-4">
                                <div className="w-64 h-80 bg-slate-700/50 rounded-lg mx-auto flex items-center justify-center border border-slate-600 border-dashed">
                                    <span className="animate-pulse">تصویر پیش‌نمایش</span>
                                </div>
                                <p>حرکت موس برای مشاهده قبل/بعد</p>
                            </div>
                       </div>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">امکانات نسخه اتوماتیک</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              لیست قابلیت‌هایی که این ربات هوشمند در اختیار شما قرار می‌دهد:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureItem 
              icon={<CopyPlus />}
              title="پردازش دسته‌ای (Batch)"
              items={[
                "Drag & Drop: پشتیبانی از کشیدن و رها کردن چندین پوشه همزمان.",
                "مدیریت صف: پردازش نوبتی پوشه‌ها بدون فشار به سیستم.",
                "ادامه خودکار: در صورت قطعی اینترنت، برنامه خودکار تلاش مجدد می‌کند."
              ]}
            />
            <FeatureItem 
              icon={<BrainCircuit />}
              title="هوش مصنوعی متمرکز (Focus)"
              items={[
                "درک کانتکست: ادغام چندین چپتر برای درک بهتر داستان توسط AI.",
                "حالت تفکر (Thinking): زمان بیشتر به AI برای ترجمه‌های پیچیده.",
                "پروکسی داخلی: پشتیبانی از Endpointهای مختلف برای رفع تحریم."
              ]}
            />
            <FeatureItem 
              icon={<FileImage />}
              title="خروجی حرفه‌ای"
              items={[
                "رندر هوشمند: تنظیم خودکار اندازه فونت با فضای بالون.",
                "ذخیره پاکسازی: امکان دریافت خروجی خام (بدون متن) برای ادیتورها.",
                "پشتیبانی RTL: چینش صحیح متن فارسی در حباب‌های گفت‌وگو."
              ]}
            />
            <FeatureItem 
              icon={<Monitor />}
              title="نظارت و کنترل"
              items={[
                "گالری زنده: مشاهده وضعیت پردازش هر صفحه به صورت تصویری.",
                "لاگ دقیق: گزارش لحظه‌به‌لحظه از عملیات OCR و ترجمه.",
                "مدیریت منابع: قابلیت محدود کردن هسته‌های CPU درگیر."
              ]}
            />
            <FeatureItem 
              icon={<ShieldCheck />}
              title="مدیریت خطا و پایداری"
              items={[
                "تلاش مجدد هوشمند: سیستم Auto-Retry برای رفع خطاهای شبکه.",
                "تست اتصال: ابزار داخلی برای بررسی وضعیت API و اینترنت.",
                "ذخیره خودکار: ذخیره تنظیمات و پرامپت‌ها برای استفاده بعدی."
              ]}
            />
            <FeatureItem 
              icon={<Wrench />}
              title="ابزارهای جانبی"
              items={[
                "مدیریت پرامپت: امکان تعریف و ویرایش پرامپت‌های سفارشی.",
                "تنظیمات ایمنی: کنترل فیلترهای محتوایی گوگل (Safety Settings).",
                "سازگاری کامل: پشتیبانی از فرمت‌های JPG, PNG, BMP و WebP."
              ]}
            />
          </div>
        </div>
      </section>

      <UpdatesSection updates={updates} />

      {/* Download Section */}
      <section id="download" className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] -z-10"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-xl shadow-2xl"
          >
            <Zap className="w-16 h-16 text-violet-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6 text-white">آماده شروع هستید؟</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              همین حالا K3 Manga Translator را دانلود کنید و از خواندن مانگاهای مورد علاقه خود بدون محدودیت زبانی لذت ببرید.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <a 
                href={downloadLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-3"
              >
                <Download />
                دانلود برای ویندوز (x64)
              </a>
              <a 
                 href={sourceLink}
                 target="_blank"
                 rel="noreferrer"
                 className="w-full sm:w-auto px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                <Github />
                سورس کد
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              نسخه 2.0.1 | ویندوز 10/11 | کاملا رایگان
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-slate-950 py-12 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center text-white font-bold">K3</div>
                <span className="text-xl font-bold text-white">Manga Translator</span>
            </div>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
                پروژه‌ای برای علاقه‌مندان به مانگا و انیمه. طراحی شده با ❤️ و ☕️
            </p>
            <div className="flex justify-center gap-6 text-slate-400">
                <a href="#" className="hover:text-violet-500 transition-colors">قوانین استفاده</a>
                <a href="#" className="hover:text-violet-500 transition-colors">حریم خصوصی</a>
                <a href="#" className="hover:text-violet-500 transition-colors">گزارش باگ</a>
            </div>
            <div className="mt-8 text-slate-600 text-sm">
                © 2024 K3 Team. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default AutoTranslatePage;