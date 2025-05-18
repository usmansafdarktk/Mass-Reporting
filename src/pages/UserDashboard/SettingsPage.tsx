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
} from 'react-icons/fi';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 pt-4 pb-10 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold mb-4">Settings</h1>

        {/* System Info - Full Width */}
        <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)]">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><FiInfo /> System Info</h2>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>User ID:</strong> usr_47x812</li>
            <li><strong>Role:</strong> Verified Reporter</li>
            <li><strong>Account Created:</strong> Jan 5, 2025</li>
            <li><strong>Last Login:</strong> May 18, 2025, 11:02 AM</li>
            <li><strong>App Version:</strong> v1.4.2</li>
          </ul>
        </section>

        {/* Notification Preferences + UI Preferences */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)]">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><FiBell /> Notification Preferences</h2>
            <div className="space-y-4 text-sm">
              <label className="flex items-center justify-between">
                <span>Email Alerts</span>
                <input type="checkbox" defaultChecked className="accent-blue-600 w-5 h-5" />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates and activity summaries via email.</p>

              <label className="flex items-center justify-between">
                <span>SMS Alerts</span>
                <input type="checkbox" className="accent-blue-600 w-5 h-5" />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Critical updates like verification and login alerts.</p>

              <label className="flex items-center justify-between">
                <span>In-app Notifications</span>
                <input type="checkbox" defaultChecked className="accent-blue-600 w-5 h-5" />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pop-up messages and badges inside your dashboard.</p>
            </div>
          </section>

          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)]">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><FiSettings /> Language & UI Preferences</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200"><FiGlobe /> Language</span>
                <select className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-white">
                  <option>English</option>
                  <option>اردو</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Interface language used across the app.</p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200"><FiMoon /> Theme</span>
                <select className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-white">
                  <option>System</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Switch manually or follow system color scheme.</p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200"><FiUser /> Tone</span>
                <select className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 dark:text-white">
                  <option>Formal</option>
                  <option>Casual</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tone used in chatbot and assistant responses.</p>
            </div>
          </section>
        </div>

        {/* Account Settings + Privacy */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)]">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><FiUser /> Account Settings</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiMail /> Email</span>
                <input type="email" value="user@example.com" readOnly className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-slate-800 text-black dark:text-white cursor-not-allowed" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">This is your verified login email.</p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiSmartphone /> Phone</span>
                <input type="tel" value="0300-0000000" className="flex-1 px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Used for 2FA and SMS alerts.</p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiLock /> Password</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Change Password</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Use a strong and unique password.</p>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiShield /> Two-Factor Auth</span>
                <input type="checkbox" defaultChecked className="accent-blue-600 w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Enhance security by enabling 2FA for logins.</p>
            </div>
          </section>

          <section className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border dark:border-gray-700 dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)]">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><FiShield /> Privacy & Security</h2>
            <div className="space-y-4 text-sm">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
                <FiLogOut /> Log Out All Devices
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">This will end all sessions except the current one.</p>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-slate-600 dark:text-white text-black rounded hover:bg-gray-400 dark:hover:bg-slate-500 w-full">
                <FiDownload /> Download My Data
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400">Download a copy of your reports and activity in ZIP format.</p>

              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full">
                <FiTrash2 /> Delete My Account
              </button>
              <p className="text-xs text-red-500">This action is irreversible and will remove all your data permanently.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
