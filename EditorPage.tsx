import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Github,
  Edit,
  Languages,
  CaseSensitive,
  Wand2,
  Undo,
  BrainCircuit,
  Package
} from 'lucide-react';
import { Navbar } from './components/Navbar';

const DEFAULT_HERO_IMAGE = 'https://i.imgur.com/5L8fH7I.png';

interface UpdateEntry {
    id: string;
    version: string;
    changes: string;
}

const UpdatesSection: React.FC<{ updates: UpdateEntry[] | null; accentColor: string }> = ({ updates, accentColor }) => {
    if (!updates || updates.length === 0) {
        return null;
    }

    return (
        <section id="updates" className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">آخرین آپدیت‌ها</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        جدیدترین تغییرات و بهبودهای نسخه Editor.
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
                             <h3 className={`text-xl font-bold text-${accentColor}-400 mb-2`}>{update.version}</h3>
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

const FeatureItemGroup: React.FC<{ icon: React.ReactNode; title: string; items: string[] }> = ({ icon, title, items }) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 h-full">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-slate-800 text-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-slate-400">
          <span className="text-teal-500 mt-1.5">&#8226;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const EditorPage: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [downloadLink, setDownloadLink] = useState('https://github.com/Kthree-K3/K3-Manga-Translator-Editor-edition/releases');
  const [sourceLink, setSourceLink] = useState('https://github.com/Kthree-K3/K3-Manga-Translator-Editor-edition');
  const [updates, setUpdates] = useState<UpdateEntry[] | null>(null);

  useEffect(() => {
    // Load image
    const customHeroImage = localStorage.getItem('editor_hero_image');
    if (customHeroImage) {
      setHeroImage(customHeroImage);
    }

    // Load links
    const savedDownloadLink = localStorage.getItem('editor_download_link');
    if (savedDownloadLink) {
      setDownloadLink(savedDownloadLink);
    }
    const savedSourceLink = localStorage.getItem('editor_source_link');
    if (savedSourceLink) {
      setSourceLink(savedSourceLink);
    }
    
    // Load Updates
    const savedUpdates = localStorage.getItem('editor_updates');
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

  // Use a different accent color for this page
  const accentColor = 'teal';

  return (
    <div className={`min-h-screen bg-slate-950 text-white selection:bg-${accentColor}-500 selection:text-white`}>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-${accentColor}-950/50`}></div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center w-full min-h-screen pt-24 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${accentColor}-500/10 border border-${accentColor}-500/20 text-${accentColor}-300 text-sm font-medium mb-6`}>
              <Edit size={14} className={`text-${accentColor}-400`} />
              Editor Edition
            </div>
            
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-${accentColor}-300 drop-shadow-sm`}>
              کنترل کامل <br/>
              برای <span className={`text-${accentColor}-400`}>ویراستاران حرفه‌ای</span>
            </h1>
            
            <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              K3 Manga Translator (Editor Edition) مجموعه ابزار کاملی است که برای تایپیست‌ها و ویراستاران حرفه‌ای طراحی شده و کنترل بی‌نظیری بر تمام جنبه‌های فرآیند ترجمه ارائه می‌دهد.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#download"
                onClick={handleScrollClick}
                className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-${accentColor}-600 px-8 font-medium text-white shadow-lg shadow-${accentColor}-500/40 transition-all duration-300 hover:bg-${accentColor}-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-${accentColor}-400 focus:ring-offset-2 focus:ring-offset-slate-900`}
              >
                <Download className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                دانلود نسخه Editor
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 w-full max-w-5xl mx-auto"
          >
            <div className="relative bg-slate-800/50 rounded-2xl p-2 border border-slate-700 shadow-2xl shadow-black/30">
                <img src={heroImage} alt="Editor UI Screenshot" className="rounded-xl w-full h-auto object-contain"/>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section id="how-it-works" className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">نحوه عملکرد برنامه</h2>
                <p className="text-slate-400 max-w-3xl mx-auto">
                    این برنامه یک ایستگاه کاری تمام‌عیار است که پروسه‌ی ترجمه مانگا را از صفر تا صد را پوشش می‌دهد. طراحی آن به گونه‌ای است که هر مترجم، فارغ از سطح دانش فنی، بتواند به صورت انفرادی و بدون نیاز به هیچ ابزار جانبی دیگری (مثل فتوشاپ)، یک چپتر کامل را با کیفیت مطلوب ترجمه و ادیت کند.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center text-right">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                     <h3 className="text-2xl font-bold text-teal-400 mb-3">هوش مصنوعی؛ مترجمی که داستان را می‌فهمد!</h3>
                     <p className="text-slate-300 leading-relaxed">
                        ساز و کار برنامه بر پایه هوش مصنوعی رایگان و قدرتمند Gemini بنا شده است. برخلاف مترجم‌های معمولی، این برنامه تمام صفحات مانگا را به صورت یکجا برای هوش مصنوعی ارسال می‌کند. با استفاده از پرامپت‌های تخصصی و قوی که در برنامه تعبیه شده، هوش مصنوعی ابتدا کل داستان، شخصیت‌ها و فضای مانگا را درک می‌کند و سپس یک ترجمه‌ی یکپارچه، روان و کاملاً منطبق با کانتکست (Context) داستان به شما تحویل می‌دهد.
                     </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                     <h3 className="text-2xl font-bold text-teal-400 mb-3">ویرایشگری فراتر از انتظار</h3>
                     <p className="text-slate-300 leading-relaxed">
                        پس از دریافت ترجمه، قدرت در دستان شماست. می‌توانید ترجمه‌ها را دانه به دانه روی تصویر قرار دهید و با ویرایشگر اختصاصی، کنترل همه چیز را به دست بگیرید. از تغییر نوع پس‌زمینه (سفید، شفاف، مات) گرفته تا تنظیم دقیق فونت، رنگ و سایز. حتی اگر متن روی بافت‌های پیچیده باشد، مدل هوش مصنوعی داخلی (LaMa) به کمک شما می‌آید تا نوشته‌های اصلی را به تمیزترین شکل ممکن پاک کنید.
                     </p>
                </motion.div>
            </div>
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} className="text-center max-w-2xl mx-auto p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                 <h3 className="text-2xl font-bold text-teal-400 mb-3">همیشه آماده ادامه کار</h3>
                 <p className="text-slate-300 leading-relaxed">
                    نگران زمان نباشید! در پایان کار (یا هر زمان که خسته شدید)، می‌توانید همه چیز را در قالب یک «فایل پروژه» ذخیره کنید تا در دفعات بعد، دقیقاً از همان نقطه‌ای که کار را رها کردید، با حفظ تمام لایه‌ها و تنظیمات، ادامه دهید.
                 </p>
            </motion.div>
        </div>
    </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">جعبه ابزار کامل شما</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              تمام این توضیحات، تنها بخشی از قدرت این نرم‌افزار است. در ادامه، لیست کامل قابلیت‌هایی که برای راحتی شما طراحی شده را مشاهده می‌کنید:
            </p>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
              <FeatureItemGroup 
                  icon={<Languages />}
                  title="روش‌های متنوع ترجمه"
                  items={[
                      "داشبورد ترجمه‌یِ تمام‌صفحه: (پیشنهادی) ترجمه یکجای تمام صفحات با درک داستان.",
                      "تشخیصِ خودکارِ بالون: کلیک روی بالون = شناسایی و ترجمه خودکار.",
                      "انتخابِ دستی: کشیدن کادر دور متن‌های آزاد برای ترجمه.",
                      "ورودِ دستی: باز کردن مستقیم ویرایشگر بدون هوش مصنوعی.",
                      "استخراجِ متن: خروجی گرفتن از متن اصلی و ترجمه در فایل txt."
                  ]}
              />
              <FeatureItemGroup 
                  icon={<CaseSensitive />}
                  title="ویرایشگرِ حرفه‌ای متن"
                  items={[
                      "۵ حالت پس‌زمینه: سفید، شفاف، مات، ماسک هوشمند و پاکسازی دستی.",
                      "متن‌های شیشه‌ای: ساخت متن توخالی با حاشیه رنگی برای SFX.",
                      "مدیریت فونت: افزودن فونت دلخواه به پوشه برنامه.",
                      "تنظیمات دقیق: کنترل رنگ متن، حاشیه، سایز، چیدمان و جهت.",
                      "سایز خودکار: تنظیم هوشمند اندازه متن با فضای بالون.",
                      "قفل تنظیمات: ثابت نگه داشتن استایل برای سرعت بیشتر."
                  ]}
              />
              <FeatureItemGroup 
                  icon={<Wand2 />}
                  title="ابزارهای گرافیکی و پاکسازی"
                  items={[
                      "ماسک و پاکسازی هوشمند (LaMa): حذف متن از بافت‌های پیچیده با AI.",
                      "پاکسازی دستی: ابزار دقیق برای تمیزکاری لکه‌های باقی‌مانده.",
                      "ابزار پاک‌کن: با قابلیت تغییر سایز و رنگ.",
                      "قطره‌چکان: نمونه‌برداری رنگ از صفحه برای تطبیق پس‌زمینه."
                  ]}
              />
              <FeatureItemGroup 
                  icon={<Undo />}
                  title="مدیریت و کنترل پروژه"
                  items={[
                      "Undo / Redo: بازگشت به عقب با Ctrl+Z و Ctrl+Y.",
                      "ذخیره‌یِ پروژه (KMT): ذخیره لایه‌ها برای ویرایش در آینده.",
                      "مدیریت آبجکت‌ها: جابجایی، چرخش، تغییر سایز و کپی.",
                      "حرکت دقیق: جابجایی پیکسلی با کلیدهای جهت‌نما.",
                      "وضعیت صفحات: نمایش رنگی صفحات (سبز: انجام شده, قرمز: مانده)."
                  ]}
              />
              <FeatureItemGroup 
                  icon={<BrainCircuit />}
                  title="هوش مصنوعی و تنظیمات"
                  items={[
                      "مدل‌های Gemini: انتخاب مدل (Flash, Pro) و تنظیم خلاقیت.",
                      "پروفایل‌های پرامپت: تعریف لحن‌های مختلف ترجمه.",
                      "افزایش کیفیت (Waifu2x): ارتقای رزولوشن تصویر نهایی.",
                      "شناسایی نام مانگا: درک بهتر کانتکست داستان.",
                      "پشتیبانی از پروکسی: تنظیم Endpoint برای رفع تحریم."
                  ]}
              />
              <FeatureItemGroup 
                  icon={<Package />}
                  title="امکانات جانبی"
                  items={[
                      "واترماک و لوگو: افزودن لوگو با تنظیم شفافیت.",
                      "Drag & Drop: بارگذاری راحت پوشه و فایل‌ها.",
                      "ناوبری سریع: جابجایی بین صفحات و زوم آسان."
                  ]}
              />
          </motion.div>
        </div>
      </section>

      <UpdatesSection updates={updates} accentColor={accentColor} />

      {/* Download Section */}
      <section id="download" className="py-24 relative overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-${accentColor}-600/20 rounded-full blur-[100px] -z-10`}></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-xl shadow-2xl"
          >
            <Edit className={`w-16 h-16 text-${accentColor}-500 mx-auto mb-6`} />
            <h2 className="text-4xl font-bold mb-6 text-white">کیفیت کار خود را متحول کنید</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
             نسخه Editor را دانلود کنید و کنترل کامل فرآیند ترجمه و ویرایش مانگا را در دست بگیرید.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <a 
                href={downloadLink}
                target="_blank"
                rel="noreferrer"
                className={`w-full sm:w-auto px-8 py-4 bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-${accentColor}-500/25 flex items-center justify-center gap-3`}
              >
                <Download />
                دانلود نسخه Editor
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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-slate-950 py-12 border-t border-white/5">
        <div className="container mx-auto px-4 text-center text-slate-600">
           © 2024 K3 Team. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default EditorPage;