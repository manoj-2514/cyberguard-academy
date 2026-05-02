import PageLayout from './PageLayout';
import { Check, Shield, Star, Award, Zap } from 'lucide-react';

interface PricingPageProps {
  onStart: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onStart }) => {
  const plans = [
    { 
      name: "Starter", 
      price: "499", 
      users: "5-25 users", 
      description: "Ideal for small teams and startups looking to build a security foundation.",
      features: ["20+ Basic Simulations", "Standard Analytics", "Email Support", "Digital Certificates"], 
      current: false 
    },
    { 
      name: "Professional", 
      price: "999", 
      users: "26-100 users", 
      description: "Our most popular plan for growing companies with advanced needs.",
      features: ["Full Simulation Access", "AI-Driven Pedagogical Feedback", "Custom Reporting Dashboard", "Priority Support", "DPDP Act Compliance Track"], 
      current: true 
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      users: "100+ users", 
      description: "Tailored solutions for large organizations requiring scale and integration.",
      features: ["On-premise Deployment Options", "API Access", "Dedicated Customer Success Manager", "Custom Content Creation", "SLA & SSO Support"], 
      current: false 
    }
  ];

  const comparisons = [
    { feature: "Scenario Library", starter: "Basic", pro: "Full", enterprise: "Custom" },
    { feature: "AI Feedback", starter: false, pro: true, enterprise: true },
    { feature: "Compliance Tracks", starter: "Standard", pro: "All (Incl. DPDP)", enterprise: "All + Custom" },
    { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated Manager" },
    { feature: "Reporting", starter: "Basic", pro: "Advanced", enterprise: "Custom Analytics" },
    { feature: "Certifications", starter: true, pro: true, enterprise: true },
  ];

  return (
    <PageLayout maxWidth="xl" className="animate-fade-in">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[0.95]">
          Simple, <span className="text-blue-600">Transparent Pricing</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Choose the plan that fits your organization's size and security maturity. All prices in INR per user/month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-32">
        {plans.map((plan, i) => (
          <div key={i} className={`rounded-[3rem] p-12 flex flex-col relative transition-all duration-500 ${plan.current ? 'bg-blue-600 text-white shadow-3xl shadow-blue-900/40 scale-105 z-10' : 'bg-white text-slate-900 border border-slate-200 hover:border-blue-400 hover:shadow-2xl'}`}>
            {plan.current && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-950 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-black mb-4 uppercase tracking-[0.2em] opacity-80">{plan.name}</h3>
            <div className="mb-8 flex items-baseline gap-2">
              {plan.price !== "Custom" && <span className="text-3xl font-black">₹</span>}
              <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-xl font-bold opacity-70">/user</span>}
            </div>
            <p className={`text-sm mb-6 font-black uppercase tracking-widest ${plan.current ? 'text-blue-100' : 'text-blue-600'}`}>{plan.users}</p>
            <p className={`text-lg mb-12 leading-relaxed font-medium ${plan.current ? 'text-blue-50' : 'text-slate-500'}`}>{plan.description}</p>
            
            <div className="space-y-6 mb-12 flex-1">
              {plan.features.map((feat, j) => (
                <div key={j} className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${plan.current ? 'bg-white/20' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-base font-bold leading-tight">{feat}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={onStart}
              className={`w-full py-6 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl ${plan.current ? 'bg-white text-blue-600 hover:bg-slate-50' : 'bg-slate-950 text-white hover:bg-blue-600'}`}
            >
              {plan.price === "Custom" ? "Contact Sales" : `Choose ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="hidden lg:block mb-40">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Full Capability Matrix.</h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-10 text-xs font-black uppercase tracking-[0.3em] text-slate-500">Infrastructure Layer</th>
                <th className="p-10 text-xs font-black uppercase tracking-[0.3em] text-slate-900 text-center">Starter</th>
                <th className="p-10 text-xs font-black uppercase tracking-[0.3em] text-blue-600 text-center bg-blue-50/30">Professional</th>
                <th className="p-10 text-xs font-black uppercase tracking-[0.3em] text-slate-900 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisons.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-10 text-slate-900 font-black text-lg group-hover:text-blue-600 transition-colors">{row.feature}</td>
                  <td className="p-10 text-center text-slate-600 font-bold text-lg">
                    {typeof row.starter === 'boolean' ? (row.starter ? <Check className="mx-auto w-6 h-6 text-emerald-500" /> : <span className="text-slate-200">/</span>) : row.starter}
                  </td>
                  <td className="p-10 text-center text-blue-600 font-black text-lg bg-blue-50/10">
                    {typeof row.pro === 'boolean' ? (row.pro ? <Check className="mx-auto w-6 h-6 text-blue-600" /> : <span className="text-slate-200">/</span>) : row.pro}
                  </td>
                  <td className="p-10 text-center text-slate-600 font-bold text-lg">
                    {typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check className="mx-auto w-6 h-6 text-emerald-500" /> : <span className="text-slate-200">/</span>) : row.enterprise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-slate-100 pt-24 text-center">
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Security Certifications & Compliance</p>
        <div className="flex flex-wrap justify-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-blue-600" /> <span className="font-black text-lg">ISO 27001</span></div>
          <div className="flex items-center gap-3"><Star className="w-8 h-8 text-amber-500" /> <span className="font-black text-lg">SOC 2 Type II</span></div>
          <div className="flex items-center gap-3"><Award className="w-8 h-8 text-emerald-600" /> <span className="font-black text-lg">DPDP Compliant</span></div>
          <div className="flex items-center gap-3"><Zap className="w-8 h-8 text-purple-600" /> <span className="font-black text-lg">SSL Secure</span></div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PricingPage;
