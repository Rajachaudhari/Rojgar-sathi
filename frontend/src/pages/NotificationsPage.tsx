import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, GraduationCap, Briefcase, Landmark, CheckCircle2, ArrowRight } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications } = useAuth();

  const getIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-emerald-600" />;
      case 'scheme':
        return <Landmark className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Beneficiary Alerts & Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Real-time alerts on new batch seats, job interview invitations, and grant disbursements.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition flex items-start space-x-3.5 ${
              !n.read ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-100'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white shadow-2xs shrink-0">
              {getIcon(n.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{n.title}</h3>
                <span className="text-[10px] text-slate-400 font-medium">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>

              {n.actionUrl && (
                <div className="pt-1">
                  <Link
                    to={n.actionUrl}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                  >
                    <span>View Opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
