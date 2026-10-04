import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const ApplicationsPage: React.FC = () => {
  const { applications } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Document Verification':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Assessment / Interview':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Approved / Enrolled':
      case 'Placed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <FileText className="w-3.5 h-3.5 text-orange-400" />
            <span>Official Application History & Lifecycle</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Submitted Opportunity Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track real-time status of your course enrollment requests, employer job interviews, and Rojgar Sathi capital subsidy proposals.
          </p>
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                    {app.opportunityType.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Application ID: <strong>{app.id}</strong>
                  </span>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{app.opportunityTitle}</h3>
                <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{app.providerOrEmployer}</span>
                  {app.centerAddress && (
                    <>
                      <span>•</span>
                      <span>{app.centerAddress}</span>
                    </>
                  )}
                </div>
              </div>

              {app.remarks && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                  <strong>Latest Nodal Remarks:</strong> {app.remarks}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Submitted Date: {app.appliedDate}</span>
                </div>

                {app.nextActionDate && (
                  <span className="text-blue-700 font-semibold">
                    Expected Next Milestone: {app.nextActionDate}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No applications submitted yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore free NSQF skill training programs or high-matching local job vacancies and submit your application.
          </p>
          <Link
            to="/training"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            <span>Browse Training Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
