import PageLayout from './PageLayout';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <PageLayout maxWidth="xl" className="animate-fade-in">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
          Get in <span className="text-blue-600">Touch.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Have questions about our simulations or enterprise plans? Our security experts are here to help.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 mb-32">
        {/* Contact Info */}
        <div className="lg:w-1/3 space-y-8">
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-blue-100">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Email Us</h4>
                <p className="text-xl font-black text-slate-900 tracking-tight">hello@cyberguard.academy</p>
                <p className="text-sm text-slate-500 font-medium">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-emerald-100">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Call Us</h4>
                <p className="text-xl font-black text-slate-900 tracking-tight">+91 80 4567 8901</p>
                <p className="text-sm text-slate-500 font-medium">Mon-Fri, 9am - 6pm IST</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-amber-100">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Visit Us</h4>
                <p className="text-xl font-black text-slate-900 tracking-tight">Level 4, Cyber Plaza</p>
                <p className="text-sm text-slate-500 font-medium">HSR Layout, Bengaluru, KA</p>
              </div>
            </div>

            <div className="flex items-start gap-6 pt-10 border-t border-slate-100">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Live Chat</h4>
                <p className="text-xl font-black text-slate-900 tracking-tight">Available 24/7</p>
                <p className="text-sm text-slate-500 font-medium">For Professional & Enterprise plans</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-12 rounded-[3.5rem] text-white shadow-3xl shadow-blue-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h4 className="text-2xl font-black mb-4 flex items-center gap-3 tracking-tight relative z-10"><Clock className="w-6 h-6" /> Quick Response</h4>
            <p className="text-blue-50 leading-relaxed text-lg font-medium relative z-10">
              Our team of certified security analysts is standing by to help you architect the perfect training program for your workforce.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-2/3">
          <form className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium text-lg" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Work Email</label>
                <input type="email" placeholder="john@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium text-lg" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Company</label>
                <input type="text" placeholder="TechCorp India" className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-medium text-lg" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Expected Users</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all appearance-none cursor-pointer font-medium text-lg">
                    <option>5-25 users</option>
                    <option>26-100 users</option>
                    <option>100+ users</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                    <Send className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">How can we help?</label>
              <textarea rows={5} placeholder="Tell us about your organization's security training needs..." className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all resize-none font-medium text-lg"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-2xl hover:bg-blue-700 transition-all shadow-3xl shadow-blue-500/40 flex items-center justify-center gap-4 group active:scale-95">
              Send Message <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mt-8">By submitting this form, you agree to our Privacy Policy.</p>
          </form>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-[32rem] bg-slate-200 rounded-[4rem] overflow-hidden relative border border-slate-200 group shadow-inner">
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="bg-white/90 backdrop-blur-xl px-10 py-6 rounded-[2rem] shadow-3xl z-20 flex items-center gap-4 border border-white/20">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="font-black text-xl text-slate-900 tracking-tight">Cyber Plaza, HSR Layout, Bengaluru</span>
          </div>
        </div>
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"></div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
