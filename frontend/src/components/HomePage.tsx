import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Brain, 
  Mail, 
  Lock, 
  Smartphone, 
  Globe, 
  Users, 
  BarChart3, 
  Award, 
  ChevronRight, 
  Star,
  ArrowRight,
  TrendingUp,
  Play
} from 'lucide-react';
import type { ViewType } from './Header';
import DashboardMockup from './DashboardMockup';
import PageLayout from './PageLayout';

interface HomePageProps {
  onNavigate: (view: ViewType) => void;
  onWatchDemo: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onWatchDemo }) => {
  const stats = [
    { value: "91%", label: "of cyberattacks start with a phishing email", detail: "Human error remains the biggest vulnerability." },
    { value: "$4.45M", label: "Average cost of a data breach", detail: "Proactive training reduces costs by up to 50%." },
    { value: "80%", label: "Employees feel unprepared", detail: "Bridging the gap between knowledge and action." }
  ];

  const differentiators = [
    { icon: <Brain className="w-6 h-6" />, title: "Realistic Scenarios", desc: "Interactive simulations based on real-world threat intelligence." },
    { icon: <Zap className="w-6 h-6" />, title: "AI-Driven Feedback", desc: "Personalized pedagogical feedback for every single answer." },
    { icon: <Globe className="w-6 h-6" />, title: "Indian Context", desc: "Tailored for local threats and DPDP Act compliance." },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Instant Savings", desc: "Drastically reduce the risk of costly security incidents." }
  ];

  const features = [
    { icon: <ShieldCheck />, title: "Scenario-based learning", desc: "Learn by doing in a safe, controlled environment." },
    { icon: <Brain />, title: "Adaptive AI", desc: "The platform evolves based on your performance and weak areas." },
    { icon: <Zap />, title: "Instant feedback", desc: "Understand the 'why' behind every correct or incorrect choice." },
    { icon: <Users />, title: "Local Examples", desc: "Scenarios specifically crafted for the Indian corporate landscape." },
    { icon: <BarChart3 />, title: "Detailed Tracking", desc: "Monitor team progress and identify systemic vulnerabilities." },
    { icon: <Award />, title: "Certification", desc: "Recognized certificates upon completion of module tracks." }
  ];

  const modulesPreview = [
    { category: "User Awareness", count: 8, icon: <Mail />, color: "bg-blue-500" },
    { category: "Network & Device", count: 6, icon: <Smartphone />, color: "bg-emerald-500" },
    { category: "Data & Compliance", count: 4, icon: <Lock />, color: "bg-amber-500" },
    { category: "Scenario Simulations", count: 2, icon: <Globe />, color: "bg-rose-500" }
  ];

  const steps = [
    { number: "01", title: "Sign up & Assess", desc: "Take a baseline assessment to identify your starting point." },
    { number: "02", title: "Choose Modules", desc: "Select from over 20+ specialized security training modules." },
    { number: "03", title: "Complete Training", desc: "Engage with realistic simulations and get AI feedback." },
    { number: "04", title: "Get Certificate", desc: "Earn your cybersecurity awareness credential." }
  ];

  const testimonials = [
    { quote: "The scenario-based approach actually kept our employees engaged. Best training we've had.", name: "Rahul S.", title: "IT Manager, TechCorp", rating: 5 },
    { quote: "AI feedback is a game changer. It explains the 'why', not just the 'what'.", name: "Ananya M.", title: "Security Lead, FinSafe", rating: 5 },
    { quote: "Finally, a platform that understands Indian phishing trends and compliance.", name: "Vikram P.", title: "HR Director, GlobalLogistics", rating: 5 }
  ];

  return (
    <PageLayout className="p-0 overflow-x-hidden">
      {/* 1. Hero Section: Left-Aligned Masterpiece */}
      <section className="section-spacing">
        {/* ... rest of the sections ... */}
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-blue-100 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                AI-Powered Cyber Defense
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tight animate-fade-in">
                Stop Threats with <br />
                <span className="text-blue-600">Realistic Simulations.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-2xl animate-fade-in">
                Empower your team with adaptive training tailored for the Indian corporate landscape. Build an unbreakable human firewall with AI-driven pedagogical feedback.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95"
                >
                  Start Training Now <ArrowRight className="w-6 h-6" />
                </button>
                <button 
                  onClick={onWatchDemo}
                  className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl text-xl font-black hover:border-blue-200 transition-all flex items-center justify-center gap-3"
                >
                  <Play className="w-4 h-4 fill-slate-900" /> Watch Demo
                </button>
              </div>
            </div>
            <div className="flex-1 relative w-full animate-fade-in lg:ml-12">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="relative group/hero">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-[3rem] blur opacity-20 group-hover/hero:opacity-40 transition duration-1000 group-hover/hero:duration-200"></div>
                <div className="relative bg-white rounded-[3rem] p-3 shadow-3xl border border-slate-100 overflow-hidden transform hover:-translate-y-2 transition-all duration-700">
                  <DashboardMockup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Section: Balanced & Precise */}
      <section className="section-spacing bg-slate-50 border-y border-slate-100">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {stats.map((stat, i) => (
              <div key={i} className="group animate-fade-in">
                <div className="text-6xl font-black text-blue-600 mb-4 tracking-tighter leading-none">{stat.value}</div>
                <div className="text-xl font-black text-slate-900 mb-3 uppercase tracking-widest text-[10px]">{stat.label}</div>
                <p className="text-slate-500 font-medium leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose: Vertically Centered Grid */}
      <section className="section-spacing">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 leading-[0.95] tracking-tight">
                Why Industry Leaders Choose <span className="text-blue-600">CyberGuard.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {differentiators.map((diff, i) => (
                  <div key={i} className="group">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      {diff.icon}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{diff.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{diff.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-3xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                      <Zap className="w-8 h-8 fill-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl tracking-tight">AI Simulation Engine</h4>
                      <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">Live Sandbox Performance</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 flex items-center gap-6 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                        <div className="w-10 h-10 bg-slate-700 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-slate-700 rounded w-3/4 mb-3"></div>
                          <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Capabilities: Equal Height Premium Cards */}
      <section className="section-spacing bg-slate-900 text-white">
        <div className="section-container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">6 Core Capabilities.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium">Engineered for maximum retention and measurable impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div key={i} className="bg-slate-800/30 p-10 rounded-[2.5rem] border border-slate-700/50 hover:bg-slate-800 transition-all group flex flex-col h-full">
                <div className="w-16 h-16 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {React.cloneElement(feat.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{feat.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed flex-1">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Modules Preview: Clean Grid & CTA */}
      <section className="section-spacing">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10 border-b border-slate-100 pb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">20 Modules. 4 Tracks.</h2>
              <p className="text-slate-600 text-xl font-medium">Comprehensive curriculum covering every aspect of digital safety.</p>
            </div>
            <button 
              onClick={() => onNavigate('modules')}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl shadow-blue-200 shrink-0 self-start md:self-end"
            >
              Explore All <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {modulesPreview.map((mod, i) => (
              <div key={i} onClick={() => onNavigate('modules')} className="group relative bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full">
                <div className={`w-16 h-16 ${mod.color} text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-current/20`}>
                  {React.cloneElement(mod.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{mod.category}</h3>
                <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-10">{mod.count} specialized units</p>
                <div className="mt-auto flex items-center text-blue-600 font-black text-sm group-hover:gap-3 transition-all">
                  View Full Track <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Journey Section: Linear Progress */}
      <section className="section-spacing bg-slate-50 border-y border-slate-100">
        <div className="section-container text-center">
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">The Training Lifecycle.</h2>
            <p className="text-slate-600 text-xl font-medium">Simple, effective, and results-driven training flow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-24 h-24 bg-white rounded-[2rem] border-4 border-slate-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-blue-500 transition-all group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <span className="text-3xl font-black text-blue-600">{step.number}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials: Premium Cards */}
      <section className="section-spacing">
        <div className="section-container">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Trust by Experts.</h2>
            <p className="text-slate-600 text-xl font-medium">See why security leaders choose CyberGuard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm relative group hover:shadow-3xl transition-all flex flex-col">
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 italic mb-10 leading-relaxed text-xl font-medium flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-6 border-t border-slate-100 pt-10">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">{t.name}</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section: High Contrast Impact */}
      <section className="section-spacing bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]"></div>
        <div className="section-container relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tight">
              Secure Your Team <br />
              <span className="text-blue-500">Today.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-16 leading-relaxed max-w-3xl mx-auto font-medium">
              Join 10,000+ professionals already mastering cybersecurity with CyberGuard Academy. Build your human firewall now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto bg-blue-600 text-white px-12 py-6 rounded-[2.5rem] text-2xl font-black hover:bg-blue-700 transition-all shadow-3xl shadow-blue-900/50 flex items-center justify-center gap-4 active:scale-95"
              >
                Start Free Training <ArrowRight className="w-8 h-8" />
              </button>
              <button 
                onClick={() => onNavigate('leaderboard')}
                className="w-full sm:w-auto bg-slate-900 text-white border border-slate-800 px-12 py-6 rounded-[2.5rem] text-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-4"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;
