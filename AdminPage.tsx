import React from 'react';
import { Settings, Edit, Zap } from 'lucide-react';

const AdminHubPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <Settings size={48} className="mx-auto text-violet-400 mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">پنل مدیریت</h1>
        <p className="text-slate-400 mb-12">
          لطفا صفحه‌ای که قصد مدیریت آن را دارید انتخاب کنید.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* AutoTranslate Admin Link */}
          <a href="/admin/autotranslate" className="flex-1 block p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all group backdrop-blur-sm">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <Zap />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white">مدیریت صفحه AutoTranslate</h2>
            <p className="text-slate-400">
              تغییر تصاویر سه‌بعدی، اسلایدر مقایسه و لوگوها.
            </p>
          </a>

          {/* Editor Admin Link */}
          <a href="/admin/editor" className="flex-1 block p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all group backdrop-blur-sm">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Edit />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white">مدیریت صفحه Editor</h2>
            <p className="text-slate-400">
              تغییر تصویر اصلی صفحه و تنظیمات عمومی سایت.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminHubPage;