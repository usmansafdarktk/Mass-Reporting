import React from 'react';
import {
  FiUser,
  FiMail,
  FiLock,
  FiSmartphone,
  FiBell,
  FiSettings,
  FiGlobe,
  FiMoon,
  FiShield,
  FiDownload,
  FiTrash2,
  FiLogOut,
  FiInfo,
  FiBriefcase,
  FiMessageCircle,
  FiAlertTriangle,
} from 'react-icons/fi';

const OfficerSettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 pt-4 pb-10 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>

        {/* System Info */}
        <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <FiInfo /> System Info
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div className="space-y-2 border p-4 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-slate-800">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                <FiUser /> Account Info
              </h3>
              <p><strong>User ID:</strong> officer_9283</p>
              <p><strong>Role:</strong> Senior Enforcement Officer</p>
              <p><strong>Account Created:</strong> Feb 12, 2024</p>
              <p><strong>Last Login:</strong> May 18, 2025, 10:15 AM</p>
            </div>
            <div className="space-y-2 border p-4 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-slate-800">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                <FiBriefcase /> Organization Info
              </h3>
              <p><strong>Department:</strong> Municipal Affairs</p>
              <p><strong>Organization:</strong> Punjab Traffic Police</p>
            </div>
            <div className="space-y-2 border p-4 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-slate-800">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
                <FiSettings /> App Details
              </h3>
              <p><strong>App Version:</strong> v1.4.2</p>
              <p><strong>Region:</strong> Lahore</p>
              <p><strong>Device:</strong> Web (Browser)</p>
            </div>
          </div>
        </section>

        {/* Notification + UI Preferences */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <FiBell /> Notification Preferences
            </h2>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiMail /> Email Alerts</span>
                <input type="checkbox" defaultChecked className="accent-gray-800 w-5 h-5" />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Get email alerts for escalated reports or verification updates.</p>

              <label className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiAlertTriangle /> SMS Alerts</span>
                <input type="checkbox" className="accent-gray-800 w-5 h-5" />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive critical alerts like flagged submissions or policy breaches.</p>

              <label className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiMessageCircle /> In-app Notifications</span>
                <input type="checkbox" defaultChecked className="accent-gray-800 w-5 h-5" />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">See real-time updates, assignments, and feedback inside the dashboard.</p>
            </div>
          </section>

          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <FiSettings /> Language & UI Preferences
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiGlobe /> Language</span>
                <select className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-white">
                  <option>English</option>
                  <option>اردو</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Choose the dashboard interface language.</p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiMoon /> Theme</span>
                <select className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-white">
                  <option>System</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Match device theme or manually choose your preference.</p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiUser /> Tone</span>
                <select className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-white">
                  <option>Formal</option>
                  <option>Concise</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Adjust system messaging tone.</p>
            </div>
          </section>
        </div>

        {/* Account Settings + Privacy */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <FiUser /> Account Settings
            </h2>
            <div className="space-y-8 text-sm">

              <div className='flex flex-col gap-2'>
                <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2"><FiMail /> Email</span>
                    <input type="email" value="officer@municipal.gov.pk" readOnly className="flex-1 px-4 py-2 rounded-md border bg-gray-100 dark:border-gray-600 dark:bg-slate-800 text-black dark:text-white cursor-not-allowed" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Login email — cannot be changed without admin request.</p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiSmartphone /> Phone</span>
                <input type="tel" value="0301-1234567" className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Used for verification and contact.</p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiLock /> Password</span>
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm">Change Password</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Use a secure password and update regularly.</p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiShield /> Two-Factor Auth</span>
                <input type="checkbox" defaultChecked className="accent-gray-800 w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Protect your account with extra verification steps.</p>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.45)] dark:shadow-none">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <FiShield /> Privacy & Security
            </h2>
            <div className="space-y-8 text-sm">

              <div className='flex flex-col gap-2'>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-slate-600 text-white rounded hover:bg-gray-900 w-full">
                <FiLogOut /> Log Out All Devices
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">This will sign you out from all devices except the current session.</p>
              </div>

              <div className='flex flex-col gap-2'>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-slate-600 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-slate-500 w-full">
                <FiDownload /> Download Activity Logs
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">Download a ZIP file of actions and reports handled under your ID.</p>
              </div>

              <div className='flex flex-col gap-2'>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full">
                <FiTrash2 /> Delete My Account
              </button>
              <p className="text-xs text-red-500">This will permanently remove your officer profile and records.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OfficerSettingsPage;
