import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Contact Nodal Officers & Helpdesk
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Reach out to the Rojgar Sathi Project Support Unit, District Welfare Officers, or the National Toll-Free Support Cell.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              National Helpdesk
            </h3>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-slate-800">Toll-Free Helpline</strong>
                <span>1800-11-2001 (Mon to Sat, 9:00 AM - 6:00 PM)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <strong className="block text-slate-800">Email Support</strong>
                <span>support@rojgarsathi.local</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Building2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Ministry Headquarters</strong>
                <span>Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">Message Submitted!</h3>
              <p className="text-xs text-slate-500">Your query has been routed to the District Welfare Cell.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm mb-2">Send a Grievance or Inquiry</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <input
                type="text"
                placeholder="District & State"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
              />
              <textarea
                rows={4}
                required
                placeholder="Describe your question or difficulty..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
