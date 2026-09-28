import { 
  Phone, 
  Mail, 
  NotepadTextDashed, 
  MapPin, 
  Calendar, 
  User, 
  Target, 
  Briefcase, 
  GraduationCap,
  ExternalLink 
} from "lucide-react";

const PapperCV = ({ lang, cvData }: { lang?: { id?: string; flag?: string; country?: string } | null, cvData: any }) => {

  // Lấy dữ liệu ngôn ngữ (Mặc định là 'vi')
  const langKey = (lang?.id === "zh" ? "cn" : lang?.id) || "vi";
  const t = cvData[langKey] || cvData.vi;

  return (
    <div className="cv-container w-[1024px] max-w-none bg-white dark:bg-slate-800 rounded-3xl overflow-hidden flex flex-row border border-gray-200 dark:border-slate-700 shrink-0">
      
      {/* Cột trái (Sidebar) */}
      <div className="w-[35%] bg-slate-800 dark:bg-slate-900 text-white p-8 flex flex-col gap-8 shrink-0">
        
        {/* Avatar & Name */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-40 h-40 rounded-full border-4 border-white/30 overflow-hidden bg-slate-300">
            <img 
              src="/avatar.png" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-wide mb-1">DƯ BẢO NHÀN</h1>
            <h2 className="text-lg font-semibold tracking-wider text-white/80">{t.sidebar.role}</h2>
            <p className="text-sm font-medium text-white/70">(REACT.JS , NEXT.JS)</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 text-sm font-medium text-white/90">
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-white/70" />
            <span>{t.sidebar.phone}</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-white/70" />
            <span>{t.sidebar.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <NotepadTextDashed className="w-5 h-5 text-white/70" />
            <span className="break-all">linkedin.com/in/nhan-du-mohick/</span>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-white/70" />
            <span>{t.sidebar.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-white/70" />
            <span>{t.sidebar.dob}</span>
          </div>
          <div className="flex items-center gap-4">
            <User className="w-5 h-5 text-white/70" />
            <span>{t.sidebar.gender}</span>
          </div>
        </div>

        {/* Ngôn ngữ lập trình */}
        <div>
          <h3 className="text-xl font-bold border-b border-white/20 pb-2 mb-4 uppercase">{t.sidebar.programming_langs_title}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-white/90 font-medium">
            {t.sidebar.programming_langs.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Công cụ */}
        <div>
          <h3 className="text-xl font-bold border-b border-white/20 pb-2 mb-4 uppercase">{t.sidebar.tools_title}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-white/90 font-medium">
            {t.sidebar.tools.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Chứng chỉ */}
        <div>
          <h3 className="text-xl font-bold border-b border-white/20 pb-2 mb-4 uppercase">{t.sidebar.certs_title}</h3>
          <div className="space-y-3 text-sm text-white/90">
            {t.sidebar.certs.map((cert: {name: string, date: string}, idx: number) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="font-semibold">{cert.name}</span>
                <span className="text-white/70 text-xs bg-white/10 px-2 py-1 rounded-md">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cột phải (Nội dung) */}
      <div className="w-[65%] p-12 text-slate-800 dark:text-slate-200">
        
        {/* Header hiển thị ngôn ngữ đã chọn */}
        {lang?.flag && lang?.country && (
          <div className="mb-8 flex justify-end">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-slate-200 dark:border-slate-600">
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.country}</span>
            </div>
          </div>
        )}

        {/* Mục tiêu nghề nghiệp */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-5">
            <div className="bg-indigo-500 dark:bg-indigo-600 text-white p-2 rounded-xl shadow-md">
              <Target className="w-6 h-6" />
            </div>
            {t.main.career_goal_title}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <strong className="text-slate-900 dark:text-white text-base block mb-1">{t.main.short_term_title}</strong> 
              {t.main.short_term_desc}
            </p>
            <p className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <strong className="text-slate-900 dark:text-white text-base block mb-1">{t.main.long_term_title}</strong> 
              {t.main.long_term_desc}
            </p>
          </div>
        </section>

        {/* Dự án */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-6">
            <div className="bg-indigo-500 dark:bg-indigo-600 text-white p-2 rounded-xl shadow-md">
              <Briefcase className="w-6 h-6" />
            </div>
            {t.main.projects_title}
          </h3>

          {/* Dự án 1 */}
          <div className="mb-8 relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-900/50">
            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-2 ring-4 ring-white dark:ring-slate-800"></div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-2 gap-2">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white uppercase tracking-tight">
                {t.main.project_1.name} <span className="text-indigo-600 dark:text-indigo-400 text-sm normal-case bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md ml-2">(ReactJS + Express)</span>
              </h4>
              <span className="text-sm font-bold text-slate-500 shrink-0 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full">8/2025 - 4/2026</span>
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-400 mb-4">{t.main.project_1.role}</p>
            
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.goal}:</strong> {t.main.project_1.goal}</p>
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.arch}:</strong> {t.main.project_1.arch}</p>
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.features}:</strong> {t.main.project_1.features}</p>
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.tech}:</strong> {t.main.project_1.tech}</p>
              <div className="pt-2 flex flex-wrap gap-4 font-medium">
                <a href="https://github.com/Mohick/do-an-cuoi-ky" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  {t.main.project_1.source} <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href="https://poetic-licorice-4780d2.netlify.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  {t.main.project_1.demo} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Dự án 2 */}
          <div className="relative pl-6 border-l-2 border-emerald-200 dark:border-emerald-900/50">
            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-2 ring-4 ring-white dark:ring-slate-800"></div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-2 gap-2">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white uppercase tracking-tight">
                {t.main.project_2.name} <span className="text-emerald-600 dark:text-emerald-400 text-sm normal-case bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md ml-2">(PiOne)</span>
              </h4>
              <span className="text-sm font-bold text-slate-500 shrink-0 bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full">4/2026 - 7/2026</span>
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-400 mb-4">{t.main.project_2.role}</p>
            
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.goal}:</strong> {t.main.project_2.goal}</p>
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.features}:</strong> {t.main.project_2.features}</p>
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.result}:</strong> {t.main.project_2.result}</p>
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.tech}:</strong> {t.main.project_2.tech}</p>
              <p><strong className="text-slate-900 dark:text-white">{t.main.labels.tools}:</strong> {t.main.project_2.tools}</p>
            </div>
          </div>
        </section>

        {/* Học vấn */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-5">
            <div className="bg-indigo-500 dark:bg-indigo-600 text-white p-2 rounded-xl shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            {t.main.education_title}
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">Web Design</h4>
              <span className="text-sm font-bold text-slate-500 bg-slate-200/50 dark:bg-slate-700/50 px-3 py-1 rounded-full">8/2024 - 8/2026</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-medium">{t.main.education_school}</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PapperCV;
