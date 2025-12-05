import React, { useState, useEffect, useRef } from 'react';
import { Upload, Save, Trash2, Home, Image as ImageIcon, Shield, LogIn, Edit, Plus, X } from 'lucide-react';

const ADMIN_PASSWORD = '1324';
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 30000; // 30 seconds

interface UpdateEntry {
    id: string;
    version: string;
    changes: string;
}

// Component for a single image uploader
const ImageUploader: React.FC<{
  title: string;
  image: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  aspectRatio?: string;
  icon?: React.ReactNode;
}> = ({ title, image, onFileSelect, onRemove, aspectRatio = 'aspect-[3/4]', icon }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleBoxClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-slate-200">{title}</h2>
      <div
        onClick={handleBoxClick}
        className={`relative group cursor-pointer ${aspectRatio} bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 hover:border-violet-500 hover:text-violet-400 transition-all`}
      >
        {image ? (
          <>
            <img src={image} alt="Preview" className="w-full h-full object-contain rounded-xl p-2" />
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="absolute top-2 right-2 p-1.5 bg-red-600/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
              aria-label="Remove image"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <div className="text-center">
            {icon || <ImageIcon size={48} className="mx-auto mb-2" />}
            <p>برای آپلود کلیک کنید</p>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

const LinkInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
        <input
            type="url"
            value={value}
            onChange={onChange}
            className="w-full h-10 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
    </div>
);


const AdminPanel: React.FC = () => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const [navbarLogo, setNavbarLogo] = useState<string | null>(null);
  const [compareBefore, setCompareBefore] = useState<string | null>(null);
  const [compareAfter, setCompareAfter] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  
  // Updates state
  const [updates, setUpdates] = useState<UpdateEntry[]>([]);
  const [editingUpdate, setEditingUpdate] = useState<UpdateEntry | null>(null);

  // Links state
  const [githubLink, setGithubLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [sourceLink, setSourceLink] = useState('');


  useEffect(() => {
    // Load images
    setBeforeImage(localStorage.getItem('manga_before'));
    setAfterImage(localStorage.getItem('manga_after'));
    setFavicon(localStorage.getItem('site_favicon'));
    setNavbarLogo(localStorage.getItem('navbar_logo'));
    setCompareBefore(localStorage.getItem('compare_before'));
    setCompareAfter(localStorage.getItem('compare_after'));

    // Load links
    setGithubLink(localStorage.getItem('global_github_link') || '');
    setTelegramLink(localStorage.getItem('global_telegram_link') || '');
    setInstagramLink(localStorage.getItem('global_instagram_link') || '');
    setYoutubeLink(localStorage.getItem('global_youtube_link') || '');
    setDownloadLink(localStorage.getItem('autotranslate_download_link') || '');
    setSourceLink(localStorage.getItem('autotranslate_source_link') || '');
    
    // Load updates
    const savedUpdates = localStorage.getItem('autotranslate_updates');
    if (savedUpdates) {
        try {
            setUpdates(JSON.parse(savedUpdates));
        } catch(e) {
            setUpdates([]);
        }
    }
  }, []);

  const showMessage = (msg: string) => {
      setMessage(msg);
      setTimeout(() => setMessage(''), 3000);
  };

  const handleFileSelect = (file: File, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = (key: string, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    localStorage.removeItem(key);
    setter(null);
    showMessage('تصویر حذف شد.');
  };

  const handleSave = () => {
    // Images
    if (beforeImage) localStorage.setItem('manga_before', beforeImage); else localStorage.removeItem('manga_before');
    if (afterImage) localStorage.setItem('manga_after', afterImage); else localStorage.removeItem('manga_after');
    if (favicon) localStorage.setItem('site_favicon', favicon); else localStorage.removeItem('site_favicon');
    if (navbarLogo) localStorage.setItem('navbar_logo', navbarLogo); else localStorage.removeItem('navbar_logo');
    if (compareBefore) localStorage.setItem('compare_before', compareBefore); else localStorage.removeItem('compare_before');
    if (compareAfter) localStorage.setItem('compare_after', compareAfter); else localStorage.removeItem('compare_after');

    // Links
    if (githubLink) localStorage.setItem('global_github_link', githubLink); else localStorage.removeItem('global_github_link');
    if (telegramLink) localStorage.setItem('global_telegram_link', telegramLink); else localStorage.removeItem('global_telegram_link');
    if (instagramLink) localStorage.setItem('global_instagram_link', instagramLink); else localStorage.removeItem('global_instagram_link');
    if (youtubeLink) localStorage.setItem('global_youtube_link', youtubeLink); else localStorage.removeItem('global_youtube_link');
    if (downloadLink) localStorage.setItem('autotranslate_download_link', downloadLink); else localStorage.removeItem('autotranslate_download_link');
    if (sourceLink) localStorage.setItem('autotranslate_source_link', sourceLink); else localStorage.removeItem('autotranslate_source_link');
    
    // Updates
    localStorage.setItem('autotranslate_updates', JSON.stringify(updates));
    
    showMessage('تغییرات با موفقیت ذخیره شدند!');
  };

  // --- Updates CRUD ---
  const handleAddUpdate = () => {
    const newUpdate: UpdateEntry = { id: Date.now().toString(), version: 'vX.Y.Z', changes: '- تغییر جدید' };
    setUpdates([...updates, newUpdate]);
    setEditingUpdate(newUpdate);
  };

  const handleUpdateChange = (id: string, field: 'version' | 'changes', value: string) => {
    setUpdates(updates.map(u => u.id === id ? { ...u, [field]: value } : u));
     if(editingUpdate?.id === id) {
        setEditingUpdate({...editingUpdate, [field]: value});
    }
  };

  const handleDeleteUpdate = (id: string) => {
    setUpdates(updates.filter(u => u.id !== id));
  };

  return (
    <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-violet-900/20 relative">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-white">پنل مدیریت - AutoTranslate</h1>
        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors">
          <Home size={20} />
          <span>بازگشت به هاب اصلی</span>
        </a>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">تصاویر صفحه اصلی</h2>
        <p className="text-slate-400 mb-8">
          دو تصویر مانگا (قبل و بعد از ترجمه) را برای نمایش در صفحه اصلی آپلود کنید.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <ImageUploader
            title="تصویر اصلی (انگلیسی)"
            image={beforeImage}
            onFileSelect={(file) => handleFileSelect(file, setBeforeImage)}
            onRemove={() => handleRemoveImage('manga_before', setBeforeImage)}
          />
          <ImageUploader
            title="تصویر ترجمه شده (فارسی)"
            image={afterImage}
            onFileSelect={(file) => handleFileSelect(file, setAfterImage)}
            onRemove={() => handleRemoveImage('manga_after', setAfterImage)}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-6">
        <h2 className="text-2xl font-bold text-white mb-2">تصاویر بخش مقایسه کیفیت</h2>
        <p className="text-slate-400 mb-8">
            دو تصویر (قبل و بعد) را برای اسلایدر تعاملی مقایسه در صفحه اصلی آپلود کنید.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
            <ImageUploader
                title="تصویر قبل از پردازش"
                image={compareBefore}
                onFileSelect={(file) => handleFileSelect(file, setCompareBefore)}
                onRemove={() => handleRemoveImage('compare_before', setCompareBefore)}
            />
            <ImageUploader
                title="تصویر بعد از پردازش"
                image={compareAfter}
                onFileSelect={(file) => handleFileSelect(file, setCompareAfter)}
                onRemove={() => handleRemoveImage('compare_after', setCompareAfter)}
            />
        </div>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-6">
        <h2 className="text-2xl font-bold text-white mb-2">مدیریت لینک‌ها</h2>
        <p className="text-slate-400 mb-8">
            لینک‌های دکمه‌ها و بخش‌های مختلف سایت را در اینجا مدیریت کنید.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LinkInput label="لینک گیت‌هاب (سراسری)" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
            <LinkInput label="لینک تلگرام (سراسری)" value={telegramLink} onChange={(e) => setTelegramLink(e.target.value)} />
            <LinkInput label="لینک اینستاگرام (سراسری)" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} />
            <LinkInput label="لینک یوتیوب (سراسری)" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
            <LinkInput label="لینک دانلود AutoTranslate" value={downloadLink} onChange={(e) => setDownloadLink(e.target.value)} />
            <LinkInput label="لینک سورس کد AutoTranslate" value={sourceLink} onChange={(e) => setSourceLink(e.target.value)} />
        </div>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-6">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-2xl font-bold text-white">مدیریت آپدیت‌ها</h2>
                <p className="text-slate-400 mt-2">آخرین تغییرات و آپدیت‌های مربوط به نسخه AutoTranslate را مدیریت کنید.</p>
            </div>
            <button onClick={handleAddUpdate} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                <Plus size={16}/>
                افزودن آپدیت
            </button>
        </div>
        <div className="space-y-4">
            {updates.map((update) => (
                <div key={update.id} className="bg-slate-800/50 p-4 rounded-lg">
                    {editingUpdate?.id === update.id ? (
                         <div className="space-y-3">
                            <input
                                type="text"
                                value={editingUpdate.version}
                                onChange={(e) => handleUpdateChange(update.id, 'version', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-bold"
                            />
                            <textarea
                                value={editingUpdate.changes}
                                onChange={(e) => handleUpdateChange(update.id, 'changes', e.target.value)}
                                rows={4}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono"
                            />
                            <button onClick={() => setEditingUpdate(null)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">ذخیره</button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-start">
                           <div>
                                <h3 className="font-bold text-lg text-slate-200">{update.version}</h3>
                                <div className="prose prose-sm prose-invert text-slate-400 mt-2" dangerouslySetInnerHTML={{ __html: update.changes.replace(/\n/g, '<br/>') }} />
                           </div>
                           <div className="flex gap-2">
                                <button onClick={() => setEditingUpdate(update)} className="p-2 text-slate-400 hover:text-white"><Edit size={16}/></button>
                                <button onClick={() => handleDeleteUpdate(update.id)} className="p-2 text-red-500 hover:text-red-400"><Trash2 size={16}/></button>
                           </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8 border-t border-slate-800 pt-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">لوگوی سایت (Favicon)</h2>
            <p className="text-slate-400 mb-8">
              لوگویی که در تب مرورگر نمایش داده می‌شود را تغییر دهید. (معمولا یک فایل مربع شکل)
            </p>
            <div className="max-w-xs">
              <ImageUploader
                title="آپلود Favicon"
                image={favicon}
                onFileSelect={(file) => handleFileSelect(file, setFavicon)}
                onRemove={() => handleRemoveImage('site_favicon', setFavicon)}
                aspectRatio="aspect-square"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">لوگوی نوار ناوبری</h2>
            <p className="text-slate-400 mb-8">
                لوگویی که در بالای صفحه کنار عنوان نمایش داده می‌شود.
            </p>
            <div className="max-w-xs">
              <ImageUploader
                title="آپلود لوگو"
                image={navbarLogo}
                onFileSelect={(file) => handleFileSelect(file, setNavbarLogo)}
                onRemove={() => handleRemoveImage('navbar_logo', setNavbarLogo)}
                aspectRatio="aspect-square"
              />
            </div>
          </div>
      </div>

      
      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-800">
        <button
          onClick={handleSave}
          className="flex-1 inline-flex items-center justify-center h-12 px-6 font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30"
        >
          <Save size={18} className="ml-2" />
          ذخیره تمام تغییرات
        </button>
      </div>
      
      {message && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-sm px-4 py-2 rounded-md transition-opacity duration-300">
          {message}
        </div>
      )}
    </div>
  )
}

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutEnd, setLockoutEnd] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (lockoutEnd > Date.now()) {
      const timer = setInterval(() => {
        const remaining = Math.ceil((lockoutEnd - Date.now()) / 1000);
        setTimeLeft(remaining > 0 ? remaining : 0);
        if (remaining <= 0) {
          setLockoutEnd(0);
          setError('');
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutEnd > Date.now()) return;

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      onLogin();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        setError(`تلاش بیش از حد. لطفا ${LOCKOUT_DURATION_MS / 1000} ثانیه صبر کنید.`);
        setLockoutEnd(Date.now() + LOCKOUT_DURATION_MS);
        setAttempts(0);
      } else {
        setError(`رمز عبور اشتباه است. ${MAX_LOGIN_ATTEMPTS - newAttempts} تلاش باقی مانده.`);
      }
    }
  };

  const isLocked = lockoutEnd > Date.now();

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-violet-900/20">
      <div className="text-center mb-6">
        <Shield size={48} className="mx-auto text-violet-400 mb-4" />
        <h1 className="text-3xl font-bold text-white">ورود به پنل مدیریت</h1>
        <p className="text-slate-400 mt-2">برای دسترسی به این بخش، رمز عبور را وارد کنید.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
          disabled={isLocked}
          className="w-full h-12 px-4 bg-slate-800 border border-slate-700 rounded-lg text-white text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLocked}
          className="mt-4 w-full inline-flex items-center justify-center h-12 px-6 font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30 disabled:bg-slate-700 disabled:shadow-none disabled:cursor-not-allowed"
        >
          <LogIn size={18} className="ml-2" />
          ورود
        </button>
        {error && <p className="text-red-400 text-center mt-4 text-sm">{isLocked ? `لطفا ${timeLeft} ثانیه صبر کنید.` : error}</p>}
      </form>
    </div>
  );
};


const AutoTranslateAdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAdminAuthenticated') === 'true'
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      {isAuthenticated ? <AdminPanel /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />}
    </div>
  );
};

export default AutoTranslateAdminPage;