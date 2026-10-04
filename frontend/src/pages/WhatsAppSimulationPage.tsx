import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import {
  MessageSquare,
  Mic,
  Send,
  Play,
  Pause,
  CheckCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const WhatsAppSimulationPage: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'wa-1',
      sender: 'user',
      type: 'voice',
      duration: '0:14',
      transcript: 'नमस्ते, मैंने 10वीं पास की है और मुझे बिजली या सोलर का काम सीखना है। क्या वाराणसी में कोई मुफ्त कोर्स है?',
      time: '10:42 AM',
    },
    {
      id: 'wa-2',
      sender: 'bot',
      type: 'text',
      text: 'नमस्ते! Rojgar Sathi AI सहायक में आपका स्वागत है। आपकी 10वीं पास योग्यता और सोलर रुचि के आधार पर वाराणसी में "सूर्यमित्र सोलर पीवी इंस्टॉलर" कोर्स उपलब्ध है:\n\n• अवधि: 3 महीने (300 घंटे)\n• फीस: 100% फ्री (Rojgar Sathi)\n• स्टाइपेंड: ₹1,500/माह\n• केंद्र: District Skill Hub, शिवपुर, वाराणसी\n\nआवेदन करने के लिए नीचे दिए गए विकल्प पर क्लिक करें।',
      time: '10:42 AM',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const togglePlayAudio = (transcript: string) => {
    if (isPlayingAudio) {
      aiService.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      aiService.speak(transcript, 'hi');
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  const handleSendVoiceNote = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const newVoice = {
        id: `wa-${Date.now()}`,
        sender: 'user',
        type: 'voice',
        duration: '0:09',
        transcript: 'सिलाई और खुद की दुकान खोलने के लिए सरकारी अनुदान कैसे मिलेगा?',
        time: 'Just now',
      };

      const botReply = {
        id: `wa-${Date.now() + 1}`,
        sender: 'bot',
        type: 'text',
        text: 'PM Vishwakarma और Rojgar Sathi योजना के तहत सिलाई व्यवसाय के लिए ₹15,000 की आधुनिक टूलकिट और 5% रियायती ब्याज पर ₹1,00,000 का ऋण उपलब्ध है। अपने नजदीकी CSC केंद्र पर आधार कार्ड ले जाएं।',
        time: 'Just now',
      };

      setMessages(prev => [...prev, newVoice, botReply]);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Business API Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            WhatsApp Voice Note Integration Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Enabling beneficiaries to send voice recordings in WhatsApp. The backend speech-to-text model transcribes regional audio, extracts skills, and replies instantly with formatted cards.
          </p>
        </div>
      </div>

      {/* Simulated WhatsApp Phone Frame */}
      <div className="max-w-md mx-auto bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700">
        <div className="bg-[#0b141a] rounded-[36px] overflow-hidden flex flex-col h-[580px] text-white">
          {/* WhatsApp Chat Header */}
          <div className="bg-[#202c33] p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white shadow-xs">
                PM
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h3 className="font-bold text-sm text-white">Rojgar Sathi Assistant</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                </div>
                <p className="text-[10px] text-emerald-400">Official Govt Channel • Online</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Messages Scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0b141a] bg-opacity-95">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-md ${
                      isUser
                        ? 'bg-[#005c4b] text-white rounded-tr-none'
                        : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700'
                    }`}
                  >
                    {m.type === 'voice' ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => togglePlayAudio(m.transcript || '')}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                          <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full w-2/3"></div>
                          </div>
                          <span className="text-[10px] text-slate-300 font-mono">{m.duration}</span>
                        </div>
                        <div className="bg-black/20 p-2 rounded-xl text-[11px] text-emerald-200">
                          <strong>AI Transcript:</strong> "{m.transcript}"
                        </div>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    )}

                    <div className="flex items-center justify-end space-x-1 mt-1 text-[10px] text-slate-400">
                      <span>{m.time}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-sky-400" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isRecording && (
              <div className="flex justify-end">
                <div className="bg-[#005c4b] text-white text-xs px-4 py-2.5 rounded-2xl animate-pulse flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  <span>Recording voice note (Speech-to-Text streaming)...</span>
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp Bottom Bar */}
          <div className="bg-[#202c33] p-3 flex items-center space-x-2 border-t border-slate-700">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden"
            />
            <button
              onClick={handleSendVoiceNote}
              className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] active:scale-95 flex items-center justify-center text-white shadow-md transition"
              title="Hold to Record Voice Note"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
