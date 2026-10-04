import React, { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { useLanguage } from '../context/LanguageContext';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  Volume2,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

export const IVRSimulationPage: React.FC = () => {
  const { language } = useLanguage();
  const [callActive, setCallActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [dialedDigits, setDialedDigits] = useState<string>('');
  const [smsSent, setSmsSent] = useState<boolean>(false);
  const [callStep, setCallStep] = useState<number>(0);

  // Timer for active call
  useEffect(() => {
    let interval: any;
    if (callActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const startCall = () => {
    setCallActive(true);
    setCallStep(1);
    const welcome = 'नमस्ते! पीएम-अजय एआई आजीविका टेलीफोन सेवा में आपका स्वागत है। हिन्दी के लिए 1 दबाएं। For English, press 2.';
    setCurrentPrompt(welcome);
    aiService.speak(welcome, 'hi');
  };

  const endCall = () => {
    aiService.stopSpeaking();
    setCallActive(false);
    setCallStep(0);
    setCurrentPrompt('कॉल समाप्त। / Call ended.');
  };

  const handleKeyPress = (digit: string) => {
    setDialedDigits(prev => prev + digit);

    if (callStep === 1) {
      // Language selected
      if (digit === '1') {
        setCallStep(2);
        const p2 = 'हिन्दी का चयन हुआ। अपनी शिक्षा का स्तर बताएं: 10वीं पास के लिए 1 दबाएं, 12वीं के लिए 2 दबाएं, अन्य के लिए 3 दबाएं।';
        setCurrentPrompt(p2);
        aiService.speak(p2, 'hi');
      } else {
        setCallStep(2);
        const p2 = 'English selected. For 10th pass press 1, for 12th pass press 2, for Vocational/ITI press 3.';
        setCurrentPrompt(p2);
        aiService.speak(p2, 'en');
      }
    } else if (callStep === 2) {
      // Education selected -> Interest
      setCallStep(3);
      const p3 = 'धन्यवाद! किस क्षेत्र में रुचि है: सोलर एवं बिजली के लिए 1, सिलाई व गारमेंट के लिए 2, कंप्यूटर व सीएससी ऑपरेटर के लिए 3 दबाएं।';
      setCurrentPrompt(p3);
      aiService.speak(p3, 'hi');
    } else if (callStep === 3) {
      // Interest selected -> Generate recommendation & trigger SMS
      setCallStep(4);
      const p4 = 'आपकी योग्यता के अनुसार वाराणसी जिले में "सूर्यमित्र सोलर पीवी इंस्टॉलर" कोर्स 100% फ्री उपलब्ध है। विवरण आपके मोबाइल नंबर पर एसएमएस द्वारा भेज दिया गया है। धन्यवाद!';
      setCurrentPrompt(p4);
      aiService.speak(p4, 'hi');
      setTimeout(() => {
        setSmsSent(true);
      }, 3000);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Voice Response (IVR) Telephony Bridge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Toll-Free 1800-Rojgar Sathi Phone Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            For beneficiaries with basic 2G feature phones. Dial the toll-free helpline, hear voice prompts in your mother tongue, press keypad options, and receive course SMS alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Phone Keypad UI Simulation */}
        <div className="md:col-span-6 flex justify-center">
          <div className="w-full max-w-xs bg-slate-900 rounded-[40px] p-6 border-4 border-slate-700 shadow-2xl text-white space-y-5">
            {/* Screen */}
            <div className="bg-slate-800 rounded-2xl p-4 text-center space-y-1 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                {callActive ? 'Toll-Free Call Connected' : 'Toll-Free 1800-11-2001'}
              </span>
              <div className="text-xl font-black text-white">
                {callActive ? formatTime(callDuration) : '1800-11-2001'}
              </div>
              <div className="text-xs text-emerald-400 font-mono truncate h-4">
                {dialedDigits ? `Dialed: ${dialedDigits}` : ''}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: '1', sub: '' },
                { num: '2', sub: 'ABC' },
                { num: '3', sub: 'DEF' },
                { num: '4', sub: 'GHI' },
                { num: '5', sub: 'JKL' },
                { num: '6', sub: 'MNO' },
                { num: '7', sub: 'PQRS' },
                { num: '8', sub: 'TUV' },
                { num: '9', sub: 'WXYZ' },
                { num: '*', sub: '' },
                { num: '0', sub: '+' },
                { num: '#', sub: '' },
              ].map((k) => (
                <button
                  key={k.num}
                  disabled={!callActive}
                  onClick={() => handleKeyPress(k.num)}
                  className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 flex flex-col items-center justify-center font-bold text-base shadow-sm border border-slate-700 transition"
                >
                  <span>{k.num}</span>
                  {k.sub && <span className="text-[8px] text-slate-400 -mt-1">{k.sub}</span>}
                </button>
              ))}
            </div>

            {/* Call / End Call Buttons */}
            <div className="pt-2 flex justify-center space-x-4">
              {!callActive ? (
                <button
                  onClick={startCall}
                  className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 flex items-center justify-center shadow-lg shadow-emerald-600/40 text-white font-bold transition"
                  title="Call Toll-Free 1800-11-2001"
                >
                  <PhoneCall className="w-7 h-7" />
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 flex items-center justify-center shadow-lg shadow-red-600/40 text-white font-bold transition"
                  title="End Call"
                >
                  <PhoneOff className="w-7 h-7" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Audio Dialogue & SMS Receipt simulation */}
        <div className="md:col-span-6 space-y-6">
          {/* Live IVR Voice Prompt Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-orange-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Live Voice Synthesizer Transcript
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Step {callStep} of 4
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 min-h-24 flex items-center">
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                {currentPrompt || 'Click the green phone icon to dial the Rojgar Sathi IVR service.'}
              </p>
            </div>

            {callActive && (
              <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span>Audio stream playing through browser speech synthesizer</span>
              </div>
            )}
          </div>

          {/* Simulated SMS Summary Notification */}
          {smsSent && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 shadow-md space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                <Smartphone className="w-5 h-5 text-emerald-700" />
                <span>Simulated SMS Delivered to Mobile (+91 98765-43210)</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 font-mono text-xs text-slate-800 leading-relaxed shadow-inner">
                <p>
                  <strong>[GOVT OF INDIA - Rojgar Sathi]:</strong> Dear Beneficiary, based on your IVR call, your matched course is "Solar PV Installer (Suryamitra)" at District Skill Hub Varanasi. Course Fee: Free. Stipend: Rs 1500/mo. Report on 15 Oct with Aadhaar. Helpline: 1800-11-2001.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
