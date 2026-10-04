import { BeneficiaryProfile, LanguageCode } from '../types';
import { request } from './apiClient';

export interface AIResponse {
  message: string;
  suggestedReplies: string[];
  extractedProfileUpdates?: Partial<BeneficiaryProfile>;
  confidenceScore: number;
}

export const aiService = {
  /**
   * Conversational AI Assistant
   */
  async chat(
    userMessage: string,
    history: { sender: 'ai' | 'user'; text: string }[],
    currentProfile: Partial<BeneficiaryProfile>,
    language: LanguageCode = 'hi'
  ): Promise<AIResponse> {
    try {
      const res = await request<AIResponse>('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: userMessage,
          history,
          currentProfile,
          language,
        }),
      });
      return res;
    } catch {
      // Robust client-side fallback AI rule-engine with multilingual responses
      return this.localRuleEngine(userMessage, currentProfile, language);
    }
  },

  /**
   * Client-side fallback rule engine for instant interactive AI dialog
   */
  localRuleEngine(
    msg: string,
    profile: Partial<BeneficiaryProfile>,
    lang: LanguageCode
  ): AIResponse {
    const lower = msg.toLowerCase();
    const isHindi = lang === 'hi';

    // Education detection
    if (lower.includes('10th') || lower.includes('दसवीं') || lower.includes('matric') || lower.includes('दसवी')) {
      return {
        message: isHindi
          ? 'बहुत अच्छा! आपने 10वीं पास की है। क्या आप बिजली के काम (Electrical), सोलर पैनल, सिलाई या कंप्यूटर ऑपरेटर में से किसी काम में रुचि रखते हैं?'
          : 'Great! You have completed 10th pass. Would you be interested in Electrical, Solar Technician, Tailoring, or Computer Operator training?',
        suggestedReplies: isHindi
          ? ['सोलर और बिजली का काम', 'कंप्यूटर और डेटा एंट्री', 'सिलाई और गारमेंट', 'खुद का व्यवसाय शुरू करना']
          : ['Solar & Electrical', 'Computer & Data Entry', 'Tailoring & Garments', 'Start Own Business'],
        extractedProfileUpdates: { education: '10th Pass' },
        confidenceScore: 0.92,
      };
    }

    if (lower.includes('12th') || lower.includes('बारहवीं') || lower.includes('इण्टर')) {
      return {
        message: isHindi
          ? 'शानदार! 12वीं पास होने पर आपके लिए एनएसक्यूएफ लेवल 4-5 के तकनीकी प्रशिक्षण जैसे डेटा एंट्री, सीएससी ऑपरेटर, या सोलर सुपरवाइजर के बेहतरीन विकल्प हैं। क्या आपके पास पहले से कोई कार्य अनुभव है?'
          : 'Splendid! With 12th pass, you qualify for NSQF Level 4-5 technical training such as Data Entry, CSC Operator, or Solar Supervisor. Do you have any prior work experience?',
        suggestedReplies: isHindi
          ? ['हाँ, 1 साल का अनुभव है', 'नहीं, मैं फ्रेशर हूँ', 'पारंपरिक पारिवारिक काम किया है']
          : ['Yes, 1 year experience', 'No, I am a fresher', 'Done traditional family work'],
        extractedProfileUpdates: { education: '12th Pass' },
        confidenceScore: 0.95,
      };
    }

    // Skills detection
    if (lower.includes('solar') || lower.includes('सोलर') || lower.includes('बिजली') || lower.includes('electric')) {
      return {
        message: isHindi
          ? 'उत्कृष्ट! ग्रीन एनर्जी और सोलर सेक्टर में पीएम-अजय (Rojgar Sathi) के तहत सूर्यमित्र फ्री ट्रेनिंग उपलब्ध है जिसमें ₹1,500/माह स्टाइपेंड भी है। क्या आप अपने जिले के नजदीकी सेंटर पर क्लासरूम ट्रेनिंग लेना चाहेंगे?'
          : 'Excellent! In the Green Energy sector, Suryamitra free training with ₹1,500/month stipend is available under Rojgar Sathi. Would you like to attend classroom training at your district center?',
        suggestedReplies: isHindi
          ? ['हाँ, नजदीकी सेंटर दिखाएं', 'ट्रेनिंग के बाद नौकरी मिलेगी?', 'अपना काम शुरू करने में लोन मिलेगा?']
          : ['Show nearest center', 'Will I get job placement?', 'Can I get loan for self-employment?'],
        extractedProfileUpdates: {
          existingSkills: Array.from(new Set([...(profile.existingSkills || []), 'Electrical Repair', 'Solar Basics'])),
          interests: Array.from(new Set([...(profile.interests || []), 'Solar & Renewable Energy'])),
        },
        confidenceScore: 0.94,
      };
    }

    if (lower.includes('computer') || lower.includes('कंप्यूटर') || lower.includes('data entry') || lower.includes('टाइपिंग')) {
      return {
        message: isHindi
          ? 'बढ़िया चुनाव! कंप्यूटर और डिजिटल सेवा (CSC) ऑपरेटर बनने के बाद आप ग्राम स्तर पर खुद का डिजिटल सेवा केंद्र भी खोल सकते हैं। क्या आप 3 महीने की ट्रेनिंग के लिए तैयार हैं?'
          : 'Great choice! As a Computer & CSC Operator, you can also establish your own Digital Seva Kendra in your village. Are you ready for a 3-month training program?',
        suggestedReplies: isHindi
          ? ['हाँ, पूरी तरह तैयार हूँ', 'सीएससी केंद्र के लिए सरकारी सब्सिडी?', 'नजदीकी सेंटर कहाँ है?']
          : ['Yes, completely ready', 'Govt subsidy for CSC?', 'Where is nearest center?'],
        extractedProfileUpdates: {
          technicalSkills: Array.from(new Set([...(profile.technicalSkills || []), 'Computer Basics', 'Typing'])),
          interests: Array.from(new Set([...(profile.interests || []), 'IT & Digital Services'])),
        },
        confidenceScore: 0.91,
      };
    }

    if (lower.includes('सिलाई') || lower.includes('tailor') || lower.includes('कपड़े') || lower.includes('boutique')) {
      return {
        message: isHindi
          ? 'बहुत सुंदर! सिलाई और गारमेंट निर्माण में पीएम विश्वकर्मा और पीएम-अजय दोनों के तहत ₹15,000 की आधुनिक टूलकिट और 5% रियायती ब्याज पर ₹1 लाख का ऋण मिलता है। क्या आप अपनी खुद की दुकान खोलना चाहते हैं?'
          : 'Wonderful! In tailoring and boutique garments, both PM Vishwakarma and Rojgar Sathi provide ₹15,000 modern toolkit vouchers and ₹1 Lakh low-interest enterprise loans. Would you like to start your own boutique?',
        suggestedReplies: isHindi
          ? ['हाँ, खुद का काम शुरू करना चाहता हूँ', 'फैशन ट्रेनिंग कोर्स बताएं', 'पीएम विश्वकर्मा में कैसे अप्लाई करें?']
          : ['Yes, want self-employment', 'Tell me training courses', 'How to apply in PM Vishwakarma?'],
        extractedProfileUpdates: {
          traditionalOccupation: 'Tailoring & Crafts',
          existingSkills: Array.from(new Set([...(profile.existingSkills || []), 'Garment Stitching', 'Measurement'])),
          employmentPreference: 'self_employment',
        },
        confidenceScore: 0.93,
      };
    }

    // Default polite conversational prompt
    return {
      message: isHindi
        ? 'नमस्ते! मैं पीएम-अजय एआई आजीविका सहायक हूँ। आपकी शिक्षा, रुचि और कौशल के अनुसार मैं आपको मुफ्त प्रशिक्षण, रोजगार और सरकारी योजनाओं की सटीक सलाह दूँगा। कृपया बताएं, आपने कितनी पढ़ाई की है और किस तरह का काम सीखना या करना चाहते हैं?'
        : 'Namaste! I am your Rojgar Sathi — AI Livelihood Assistant. Based on your education, skills, and aspirations, I will guide you to free skill training, jobs, and government schemes. Please tell me about your education and what kind of trade or work you would like to pursue.',
      suggestedReplies: isHindi
        ? ['मैंने 10वीं पास की है', 'बिजली और सोलर का काम सीखना है', 'कंप्यूटर डेटा एंट्री कोर्स', 'खुद की दुकान के लिए लोन']
        : ['I completed 10th pass', 'Learn Solar & Electrical', 'Computer & Data Entry course', 'Loan for self-employment shop'],
      confidenceScore: 0.88,
    };
  },

  /**
   * Text-to-speech using browser Web Speech API
   */
  speak(text: string, lang: LanguageCode = 'hi'): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const voiceLang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    const matchVoice = voices.find(v => v.lang.startsWith(voiceLang) || v.lang.startsWith(lang));
    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    window.speechSynthesis.speak(utterance);
  },

  stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
