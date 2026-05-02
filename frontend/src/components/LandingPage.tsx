import React, { useState } from 'react';
import { 
  Shield, 
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
  ChevronDown, 
  ChevronRight, 
  Star,
  Check,
  ArrowRight,
  TrendingUp,
  Play
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const modules = [
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

  const plans = [
    { name: "Starter", price: "499", users: "5-25 users", features: ["Basic Simulations", "Standard Reporting", "Email Support"], current: false },
    { name: "Professional", price: "999", users: "26-100 users", features: ["Advanced AI Feedback", "Custom Scenarios", "Priority Support", "Detailed Analytics"], current: true },
    { name: "Enterprise", price: "Custom", users: "100+ users", features: ["Full Platform Access", "API Integration", "Dedicated Success Manager", "On-prem Options"], current: false }
  ];

  const faqs = [
    { q: "How long does each module take?", a: "Each module is designed to be completed in 15-20 minutes, making it perfect for busy professionals." },
    { q: "Can we track employee progress?", a: "Yes, the Enterprise and Professional plans include a detailed dashboard to monitor completion rates and scores." },
    { q: "Are the scenarios updated?", a: "We update our scenario library monthly to reflect the latest threat landscape and phishing trends." },
    { q: "Does it support mobile devices?", a: "Absolutely. CyberGuard Academy is fully responsive and works on any modern browser." },
    { q: "Is it compliant with Indian laws?", a: "Yes, our modules are specifically updated to include training on the DPDP Act and other local regulations." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">CyberGuard <span className="text-blue-600">Academy</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#modules" className="hover:text-blue-600 transition-colors">Modules</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <button 
              onClick={onStart}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-sm active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-6 border border-blue-100 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                AI-POWERED CYBERSECURITY TRAINING
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Master Security with <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Realistic Simulations</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Empower your team with adaptive training tailored for the Indian landscape. Spot threats, analyze risks, and build an unbreakable human firewall.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={onStart}
                  className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group"
                >
                  Start Training Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl text-lg font-bold hover:border-blue-200 transition-all flex items-center justify-center gap-2">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 fill-slate-900 ml-0.5" />
                  </div>
                  Watch Demo
                </button>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Trusted by leading Indian enterprises</span>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-2xl">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl overflow-hidden group">
                <img 
                  src="/cybersecurity_hero_modern_1777539464552.png" 
                  alt="Cybersecurity Simulation" 
                  className="rounded-[2rem] w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Statement / Stats */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The True Cost of Human Vulnerability</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Traditional training is boring and ineffective. Real-world threats don't wait for your team to be ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="text-5xl font-black text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg font-bold text-slate-900 mb-3">{stat.label}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Solution Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Why Choose <span className="text-blue-600">CyberGuard?</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {differentiators.map((diff, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all group">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {diff.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{diff.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{diff.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 fill-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Interactive Simulation Engine</h4>
                      <p className="text-slate-400 text-sm">Powered by Adaptive AI</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-800">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-400 uppercase tracking-widest">Learning Progress</span>
                      <span className="text-blue-400">92% Engagement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">6 Standout Capabilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Designed for maximum retention and measurable security impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div key={i} className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {React.cloneElement(feat.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Modules Overview */}
      <section id="modules" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">20 Modules Across 4 Categories</h2>
              <p className="text-slate-600 text-lg">Comprehensive curriculum covering every aspect of digital safety.</p>
            </div>
            <button 
              onClick={onStart}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shrink-0 self-start md:self-end"
            >
              Explore All Modules <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod, i) => (
              <div key={i} className="group relative bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 ${mod.color} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform`}></div>
                <div className={`w-14 h-14 ${mod.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-current/20`}>
                  {React.cloneElement(mod.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{mod.category}</h3>
                <p className="text-slate-500 text-sm font-bold mb-6">{mod.count} specialized modules</p>
                <div className="flex items-center text-blue-600 text-sm font-bold group-hover:gap-2 transition-all">
                  View Track <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How It Works */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">4 Step User Journey</h2>
            <p className="text-slate-600 text-lg">Simple, effective, and results-driven training flow.</p>
          </div>
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-500 transition-all group-hover:scale-110">
                    <span className="text-2xl font-black text-blue-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">3 User Success Stories</h2>
            <p className="text-slate-600 text-lg">See why cybersecurity leaders trust us for their team awareness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 italic mb-8 leading-relaxed text-lg">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Pricing */}
      <section id="pricing" className="py-24 bg-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e3a8a_0%,transparent_50%)] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-4">3 Transparent Plans</h2>
            <p className="text-slate-400 text-lg">Choose the right scale for your organization.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div key={i} className={`rounded-[2.5rem] p-10 flex flex-col ${plan.current ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/50 scale-105 z-10' : 'bg-slate-800 text-slate-100 border border-slate-700/50'}`}>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-widest">{plan.name}</h3>
                <div className="mb-6 flex items-baseline gap-1">
                  {plan.price !== "Custom" && <span className="text-2xl font-bold">₹</span>}
                  <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-lg opacity-70">/user/mo</span>}
                </div>
                <p className={`text-sm mb-8 font-bold ${plan.current ? 'text-blue-100' : 'text-slate-400'}`}>{plan.users}</p>
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.current ? 'bg-white/20' : 'bg-slate-700'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={onStart}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${plan.current ? 'bg-white text-blue-600 hover:bg-slate-100' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">5 Common Questions</h2>
            <p className="text-slate-600">Everything you need to know about our training methodology.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors group"
                >
                  <span className="font-bold text-slate-900 text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-slide-down">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Trust & Credibility */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Trusted by 50+ Indian organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60">
              <div className="h-8 w-24 bg-slate-300 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-slate-300 rounded animate-pulse"></div>
              <div className="h-8 w-28 bg-slate-300 rounded animate-pulse"></div>
              <div className="h-8 w-36 bg-slate-300 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {["ISO 27001", "SOC 2 Type II", "DPDP Compliant", "GDPR Ready"].map((badge, i) => (
              <div key={i} className="bg-white px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="py-24 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-indigo-900/40 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]">
              Don't wait for a breach to <br className="hidden md:block" /> 
              <span className="text-blue-500">start training your team.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              Every day without proper security awareness is a risk. Join 10,000+ professionals already mastering cybersecurity with CyberGuard Academy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 active:scale-95"
              >
                Start Free Training <ArrowRight className="w-6 h-6" />
              </button>
              <button className="w-full sm:w-auto bg-slate-800 text-white border border-slate-700 px-10 py-5 rounded-2xl text-xl font-black hover:bg-slate-700 transition-all flex items-center justify-center gap-3">
                Schedule a Demo
              </button>
            </div>
            <p className="mt-8 text-slate-500 text-sm font-medium">No credit card required for free modules.</p>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="py-20 bg-slate-950 text-slate-300 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Product</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Simulations</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Learning Tracks</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">AI Feedback</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">For Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Resources</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security Whitepapers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">DPDP Guide</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1 rounded-md">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">CyberGuard Academy</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">© 2026 CyberGuard Academy. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Users className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Shield className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
