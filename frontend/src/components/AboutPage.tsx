import PageLayout from './PageLayout';
import { Target, Eye, Shield, Award, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    { icon: <Target className="w-8 h-8" />, title: "Our Mission", desc: "To democratize high-end cybersecurity training and empower every employee to become a proactive defender of their digital workspace." },
    { icon: <Eye className="w-8 h-8" />, title: "Our Vision", desc: "A world where human error is no longer the weakest link in the security chain, but the strongest line of defense." },
    { icon: <Shield className="w-8 h-8" />, title: "Core Values", desc: "Integrity, innovation, and an unwavering commitment to simplifying complex security concepts for the modern workforce." }
  ];

  const milestones = [
    { year: "2024", event: "Founded in Bengaluru with a vision to revolutionize security awareness." },
    { year: "2025", event: "Launched AI-driven simulation engine with localized Indian threat intelligence." },
    { year: "2026", event: "Trusted by 50+ leading Indian organizations and 10,000+ professionals." }
  ];

  return (
    <PageLayout maxWidth="xl" className="animate-fade-in p-0 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative -mt-16 py-32 md:py-48 bg-slate-900 overflow-hidden rounded-b-[4rem]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/cybersecurity_about_us_1777540445998.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Our Story, Our <span className="text-blue-500">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            We're on a mission to build an unbreakable human firewall through realistic, AI-powered simulations tailored for the Indian corporate landscape.
          </p>
        </div>
      </section>

      <div className="px-6 md:px-12 py-32">
        {/* Values Section */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {values.map((v, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:-translate-y-2 shadow-sm border border-blue-100">
                  {v.icon}
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Content */}
        <section className="mb-40 bg-slate-50 rounded-[4rem] p-12 md:p-24 border border-slate-100 shadow-inner">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.95]">
                Bridging the Gap Between <span className="text-blue-600">Knowledge and Action.</span>
              </h2>
              <div className="space-y-8 text-slate-600 leading-relaxed text-xl font-medium">
                <p>
                  Most cybersecurity training is viewed as a compliance checkbox. Employees watch a video, take a quiz, and forget it five minutes later. At CyberGuard Academy, we believe in learning by doing.
                </p>
                <p>
                  Our platform uses advanced AI to generate realistic, localized phishing scenarios, malware simulations, and social engineering attacks that reflect the actual threats Indian businesses face today.
                </p>
                <p>
                  With real-time pedagogical feedback, we don't just tell users they were wrong; we explain the psychology of the attack, the technical red flags, and the mindset they need to adopt to stay safe.
                </p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-8 w-full">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm text-center">
                <div className="text-5xl font-black text-blue-600 mb-4 tracking-tighter">50+</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Enterprises</div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm text-center">
                <div className="text-5xl font-black text-emerald-500 mb-4 tracking-tighter">10k+</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Learners</div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm text-center">
                <div className="text-5xl font-black text-amber-500 mb-4 tracking-tighter">92%</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Retention</div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm text-center">
                <div className="text-5xl font-black text-rose-500 mb-4 tracking-tighter">24/7</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="mb-40 max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Our Evolution.</h2>
          </div>
          <div className="space-y-20 relative">
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-slate-100 hidden md:block"></div>
            {milestones.map((m, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-12 items-start group relative">
                <div className="text-4xl font-black text-blue-200 group-hover:text-blue-600 transition-colors w-32 shrink-0 tracking-tighter leading-none">{m.year}</div>
                <div className="flex-1 relative">
                  <div className="hidden md:block absolute -left-[4.25rem] top-4 w-4 h-4 bg-white border-4 border-blue-600 rounded-full z-10 shadow-xl group-hover:scale-125 transition-transform"></div>
                  <p className="text-2xl text-slate-900 font-black tracking-tight mb-4">{m.event.split(' ')[0]} {m.event.split(' ')[1]} {m.event.split(' ')[2]}</p>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="bg-slate-950 rounded-[4rem] p-16 md:p-32 text-white relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Certifications & Compliance.</h2>
              <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">Our standards are set high to ensure your data and privacy are always protected.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-24">
              <div className="flex flex-col items-center gap-8 group">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-blue-400 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xl">
                  <Shield className="w-10 h-10" />
                </div>
                <div className="font-black text-lg uppercase tracking-widest text-slate-300">ISO 27001</div>
              </div>
              <div className="flex flex-col items-center gap-8 group">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-emerald-400 border border-white/10 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xl">
                  <Award className="w-10 h-10" />
                </div>
                <div className="font-black text-lg uppercase tracking-widest text-slate-300">SOC 2 Type II</div>
              </div>
              <div className="flex flex-col items-center gap-8 group">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-amber-400 border border-white/10 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-2xl">
                  <Zap className="w-10 h-10" />
                </div>
                <div className="font-black text-lg uppercase tracking-widest text-slate-300">DPDP Act</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
