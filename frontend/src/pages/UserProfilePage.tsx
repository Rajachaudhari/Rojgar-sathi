import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  Save,
  Edit2,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <User className="w-3.5 h-3.5 text-orange-400" />
            <span>Beneficiary ID: {user?.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {profile.name}
          </h1>
          <p className="text-xs text-slate-300">
            {user?.location.district}, {user?.location.state} • Mobile: +91 {user?.mobile}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition flex items-center space-x-1.5"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold p-4 rounded-2xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes updated and synchronized with Rojgar Sathi AI recommendation engine!</span>
        </div>
      )}

      {/* Main Profile Form / View */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Education */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Highest Education Completed</label>
            {isEditing ? (
              <select
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
              >
                <option value="No Formal Education">No Formal Education</option>
                <option value="8th Pass">8th Pass</option>
                <option value="10th Pass">10th Pass (Matric)</option>
                <option value="12th Pass">12th Pass (Higher Secondary)</option>
                <option value="ITI / Vocational Diploma">ITI / Vocational Diploma</option>
                <option value="Graduate / Post-Graduate">Graduate / Post-Graduate</option>
              </select>
            ) : (
              <p className="text-xs font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {profile.education}
              </p>
            )}
          </div>

          {/* Current Occupation */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Current Occupation / Employment Status</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.currentOccupation}
                onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
              />
            ) : (
              <p className="text-xs font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {profile.currentOccupation}
              </p>
            )}
          </div>

          {/* Traditional Occupation */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Traditional / Family Craft or Trade</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.traditionalOccupation || ''}
                onChange={(e) => setFormData({ ...formData, traditionalOccupation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
              />
            ) : (
              <p className="text-xs font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {profile.traditionalOccupation || 'None specified'}
              </p>
            )}
          </div>

          {/* Livelihood Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Employment Preference</label>
            {isEditing ? (
              <select
                value={formData.employmentPreference}
                onChange={(e: any) => setFormData({ ...formData, employmentPreference: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
              >
                <option value="wage_employment">Wage Employment (Salary Job)</option>
                <option value="self_employment">Self-Employment (Own Enterprise/Shop)</option>
                <option value="both">Both (Open to Any Good Livelihood)</option>
              </select>
            ) : (
              <p className="text-xs font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {profile.employmentPreference === 'self_employment'
                  ? 'Self-Employment / Shop'
                  : profile.employmentPreference === 'wage_employment'
                  ? 'Wage Employment / Job'
                  : 'Open to both Wage Job & Self-Employment'}
              </p>
            )}
          </div>
        </div>

        {/* Mobility and Accessibility Preferences */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mobility & Commuting Constraints
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-500 block">Can Travel Locally:</span>
              <strong className="text-slate-800">
                {profile.mobilityConstraints.canTravelLocally ? 'Yes' : 'No'}
              </strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-500 block">Max Commute Distance:</span>
              <strong className="text-slate-800">
                Up to {profile.mobilityConstraints.maxTravelDistanceKm} km
              </strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-500 block">Relocation Ready:</span>
              <strong className="text-slate-800">
                {profile.mobilityConstraints.canRelocate ? 'Yes' : 'Within District Only'}
              </strong>
            </div>
          </div>
        </div>

        {/* Existing & Technical Skills */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recorded Competencies & Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {profile.existingSkills.map((sk, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold px-3 py-1 rounded-xl"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
