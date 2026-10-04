import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, PhoneCall } from 'lucide-react';

export const HelpFaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is eligible for 100% free skill training and stipends under Rojgar Sathi?',
      a: 'Scheduled Caste (SC) individuals and rural/urban youth with annual family income up to ₹2.50 Lakh are eligible for 100% free government NSQF skill training with monthly stipends up to ₹1,500.',
    },
    {
      q: 'How does the AI Voice Assistant work?',
      a: 'You can tap the microphone button and talk naturally in Hindi, English, or your regional mother tongue. The AI extracts your education level, previous trade experience, and interests to diagnose skill gaps without needing you to fill long forms.',
    },
    {
      q: 'Are the training recommendations official?',
      a: 'Yes. Course recommendations connect to NSDC, PMKK, and MSDE certified skill training centers. The app provides advisory matching, while formal enrollment is verified with your local district center.',
    },
    {
      q: 'How can I get the ₹50,000 capital subsidy for self-employment?',
      a: 'Eligible SC beneficiaries can apply for the Rojgar Sathi income-generating asset subsidy (up to ₹50,000 or 50% of project cost) through their District Social Welfare Office. Our Self-Employment section outlines business project plans and equipment lists.',
    },
    {
      q: 'Can I use this without high-speed internet?',
      a: 'Yes. The application supports offline cached mode, CSC Gram Panchayat touch kiosk terminals, toll-free 1800 IVR phone dialer, and WhatsApp voice note processing.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Frequently Asked Questions (FAQ) & Assistance
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Clear answers about Rojgar Sathi entitlements, skill certifications, wage placements, and capital subsidies.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 transition"
            >
              <span>{f.q}</span>
              {openIndex === i ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openIndex === i && (
              <div className="p-4 text-xs text-slate-600 bg-white leading-relaxed border-t border-slate-200">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
