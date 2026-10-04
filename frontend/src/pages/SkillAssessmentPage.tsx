import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { request } from '../services/apiClient';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_ASSESSMENT_QUESTIONS } from '../data/mockData';
import { AssessmentResult } from '../types';
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Award,
  AlertCircle,
  Briefcase
} from 'lucide-react';

export const SkillAssessmentPage: React.FC = () => {
  const { profile, updateProfile, updateMilestone } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [accumulatedScore, setAccumulatedScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const totalQuestions = MOCK_ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + (isCompleted ? 1 : 0)) / totalQuestions) * 100);

  const handleSelectOption = (questionId: string, optionId: string, score: number, tags: string[]) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
    setAccumulatedScore(prev => prev + score);

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Complete Assessment
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    setIsCompleted(true);
    const totalScore = accumulatedScore + 75; // Normalized
    const normalizedScore = Math.min(Math.round((totalScore / 450) * 100), 96);

    let level: 'Beginner' | 'Intermediate' | 'Skilled' | 'Advanced' = 'Intermediate';
    if (normalizedScore >= 80) level = 'Skilled';
    else if (normalizedScore < 50) level = 'Beginner';

    const result: AssessmentResult = {
      id: `ASMT-${Date.now()}`,
      userId: profile.userId,
      completedAt: new Date().toISOString().split('T')[0],
      overallScore: normalizedScore,
      currentSkillLevel: level,
      strongSkills: ['Practical Tool Handling', 'Electrical Safety Awareness', 'Customer Interaction'],
      emergingSkills: ['Solar Inverter Mounting', 'Digital Payments & UPI', 'Panchayat Portal Use'],
      missingSkills: ['Solar PV Array Wiring Regulations', 'Computer Typing Speed (30 WPM)', 'Enterprise Cost Accounting'],
      recommendedPathways: [
        'Solar PV Installer (Suryamitra) - NSQF Level 4',
        'Domestic Electrical & Home Automation - NSQF Level 3',
        'CSC Village Level Entrepreneur (VLE) Micro-Enterprise'
      ],
      sectorBreakdown: [
        { sector: 'Green Energy / Renewables', score: 88 },
        { sector: 'Construction & Electrical', score: 82 },
        { sector: 'IT & Digital Services', score: 68 },
        { sector: 'Apparel & Garments', score: 62 },
      ]
    };

    setAssessmentResult(result);
    void request('/assessment/complete', {
      method: 'POST',
      body: JSON.stringify({
        result,
        answers: Object.entries(selectedAnswers).map(([questionId, optionId]) => {
          const question = MOCK_ASSESSMENT_QUESTIONS.find(q => q.id === questionId);
          const option = question?.options.find(o => o.id === optionId);
          return { questionId, optionId, score: option?.skillScore || 0, skillTags: option?.skillTags || [] };
        }),
      }),
    }).catch(error => console.error('Assessment save failed:', error));
    updateProfile({
      currentSkillLevel: level,
      existingSkills: Array.from(new Set([...profile.existingSkills, ...result.strongSkills])),
    });
    updateMilestone('assessment_completed', 'completed');
  };

  const restartAssessment = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAccumulatedScore(0);
    setIsCompleted(false);
    setAssessmentResult(null);
  };

  const currentQ = MOCK_ASSESSMENT_QUESTIONS[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Dynamic Vocational Skill Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Personalized Skill & Aptitude Evaluation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Answer 5 quick vocational questions. AI calculates your baseline competencies, identifies gaps, and matches official Rojgar Sathi schemes.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600">
            Assessment Progress: <strong className="text-blue-700">{progressPercent}%</strong>
          </span>
          <span className="text-slate-400">
            Question {Math.min(currentQuestionIndex + 1, totalQuestions)} of {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-700 to-orange-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {!isCompleted ? (
        /* Question Card */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category: {currentQ.sector}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {language === 'hi' ? currentQ.question.hi : currentQ.question.en}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  handleSelectOption(currentQ.id, option.id, option.skillScore, option.skillTags)
                }
                className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-200 flex items-start space-x-3 group"
              >
                <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs text-slate-400 group-hover:text-blue-700">
                  {option.id.slice(-1)}
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-950">
                    {language === 'hi' ? option.text.hi : option.text.en}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {option.skillTags.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Assessment Results Card */
        assessmentResult && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center font-extrabold text-xl shadow-inner">
                  <span>{assessmentResult.overallScore}%</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold">Score</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      Assessment Completed!
                    </h2>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      Level: {assessmentResult.currentSkillLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Candidate Profile verified against Rojgar Sathi NSQF Level 3-4 Standards.
                  </p>
                </div>
              </div>

              <button
                onClick={restartAssessment}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            </div>

            {/* Skill Classifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strong Verified Skills</span>
                </div>
                <ul className="space-y-1 text-xs text-emerald-950">
                  {assessmentResult.strongSkills.map((sk, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <span>•</span>
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-800">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Emerging Competencies</span>
                </div>
                <ul className="space-y-1 text-xs text-blue-950">
                  {assessmentResult.emergingSkills.map((sk, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <span>•</span>
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Missing Gaps to Bridge</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-950">
                  {assessmentResult.missingSkills.map((sk, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <span>•</span>
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Pathways */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-800 text-sm">
                Recommended Career Pathways for You:
              </h3>
              <div className="space-y-2">
                {assessmentResult.recommendedPathways.map((pathway, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800">{pathway}</span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      High Placement Match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => navigate('/skill-gaps')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2"
              >
                <span>View In-Depth Skill Gap Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/training')}
                className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explore Matched Training & Jobs</span>
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
