import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Lock, MapPin, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: 22,
    gender: 'male',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert('Password must contain at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }
    const success = await register({
      name: formData.name || 'Beneficiary User',
      mobile: formData.mobile || '9876543210',
      email: formData.email,
      age: formData.age,
      gender: formData.gender as any,
      location: {
        state: formData.state,
        district: formData.district,
        isRural: true,
      },
      password: formData.password,
    });
    if (success) navigate('/assistant');
    else alert('Registration failed. Mobile/email may already be registered.');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Beneficiary Registration
        </h1>
        <p className="text-xs text-slate-500">
          Create your Rojgar Sathi account to access free NSQF vocational training and enterprise subsidies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Full Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Mobile Number</label>
            <input
              type="tel"
              required
              placeholder="10-digit number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Age</label>
            <input
              type="number"
              min="18"
              max="65"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">District</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900"
            >
              <option value="Varanasi">Varanasi</option>
              <option value="Patna">Patna</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Jaipur">Jaipur</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Confirm Password</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2 mt-4"
        >
          <span>Complete Registration & Speak to AI</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-2">
          <span className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-700 font-bold hover:underline">
              Login here
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
