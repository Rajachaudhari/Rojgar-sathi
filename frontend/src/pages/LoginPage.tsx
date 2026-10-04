import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('9876543210');
  const [password, setPassword] = useState('demo');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('1234');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(identifier, password, false);
    if (success) navigate('/dashboard');
    else alert('Invalid mobile/email or password. For the demo account use 9876543210 / demo.');
  };

  const handleAdminQuickLogin = async () => {
    const success = await login('admin@rojgarsathi.local', 'admin', true);
    if (success) navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-7 h-7 text-orange-400" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Beneficiary Portal Login
        </h1>
        <p className="text-xs text-slate-500">
          Access your Rojgar Sathi skill assessment, course applications, and capital grants.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Toggle OTP or Password */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsOtpMode(false)}
            className={`flex-1 py-1.5 rounded-lg transition ${
              !isOtpMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOtpMode(true);
              setOtpSent(true);
            }}
            className={`flex-1 py-1.5 rounded-lg transition ${
              isOtpMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Mobile OTP Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Registered Mobile Number / Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
          </div>

          {!isOtpMode ? (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <a href="#forgot" className="text-[11px] text-blue-700 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Enter 4-Digit OTP</label>
              <input
                type="text"
                value={otpVal}
                onChange={(e) => setOtpVal(e.target.value)}
                maxLength={4}
                className="w-full tracking-widest text-center py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-slate-900"
              />
              <span className="text-[10px] text-emerald-600 font-semibold block text-center">
                Demo OTP sent: 1234
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2"
          >
            <span>Login to Beneficiary Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switchers */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Instant Demo Account Sign-in
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                login('9876543210', 'demo', false);
                navigate('/dashboard');
              }}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-slate-700"
            >
              Demo Beneficiary
            </button>
            <button
              onClick={handleAdminQuickLogin}
              className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-semibold"
            >
              Nodal Officer / Admin
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <span className="text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-700 font-bold hover:underline">
              Register as Beneficiary
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
