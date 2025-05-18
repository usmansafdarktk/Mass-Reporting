import React from "react";
import { FaMedal, FaMapMarkerAlt, FaCheckCircle, FaFileAlt, FaUserShield, FaClock } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import UserContributionChart from "../../components/Charts/UserContributionChart";
import UserContributionLineChart from "../../components/Charts/UserContributionLineChart";

import UserOne from "../../images/user/user-01.png";
import UserTwo from "../../images/user/user-02.png";
import UserThree from "../../images/user/user-03.png";
import UserFour from "../../images/user/user-04.png";

interface Contributor {
  id: number;
  name: string;
  avatar: string;
  district: string;
  reportsSubmitted: number;
  reportsValidated: number;
  trustScore: number;
  joinDate: string;
  lastActive: string;
}

const topContributors: Contributor[] = [
  {
    id: 101,
    name: "Ayesha Khan",
    avatar: UserOne,
    district: "Lahore",
    reportsSubmitted: 38,
    reportsValidated: 29,
    trustScore: 95,
    joinDate: "2024-11-10",
    lastActive: "2025-05-18 10:20 AM",
  },
  {
    id: 102,
    name: "Usman Raza",
    avatar: UserTwo,
    district: "Karachi",
    reportsSubmitted: 32,
    reportsValidated: 25,
    trustScore: 90,
    joinDate: "2024-10-02",
    lastActive: "2025-05-18 09:12 AM",
  },
  {
    id: 103,
    name: "Ahmed Nawaz",
    avatar: UserThree,
    district: "Rawalpindi",
    reportsSubmitted: 27,
    reportsValidated: 21,
    trustScore: 87,
    joinDate: "2024-12-05",
    lastActive: "2025-05-17 07:40 PM",
  },
  {
    id: 104,
    name: "Fatima Tariq",
    avatar: UserFour,
    district: "Multan",
    reportsSubmitted: 24,
    reportsValidated: 20,
    trustScore: 85,
    joinDate: "2025-01-15",
    lastActive: "2025-05-16 03:25 PM",
  },
];

// Simulated current user ID
const currentUserId = 102;

const Leaderboard: React.FC = () => {
  const currentUser = topContributors.find((user) => user.id === currentUserId);

  return (
    <>
      {/* Heading */}
      <div className="p-4 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
      </div>

      {/* Table Section */}
      <div className="px-4 pt-10 pb-4 text-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto bg-white dark:bg-[#1e293b] shadow-lg rounded-xl border dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-3">Top Contributors Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
            <thead>
                <tr className="text-left text-xs uppercase text-gray-500 dark:text-gray-300">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3 text-center">Submitted</th>
                <th className="px-4 py-3 text-center">Validated</th>
                <th className="px-4 py-3 text-center">Trust Score</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Last Active</th>
                </tr>
            </thead>
            <tbody>
                {topContributors.map((user, idx) => (
                <tr
                    key={user.id}
                    className={`transition ${
                    user.id === currentUserId
                        ? "bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-300"
                        : "bg-gray-50 dark:bg-slate-800"
                    }`}
                >
                    <td className="px-4 py-4 font-bold flex items-center gap-2">
                    {idx < 3 && <FaMedal className="text-yellow-400" />} #{idx + 1}
                    </td>
                    <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                        <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover border border-gray-300"
                        />
                        <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <FaUserShield /> Verified Contributor
                        </p>
                        </div>
                    </div>
                    </td>
                    <td className="px-4 py-4">
                    <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-500" /> {user.district}
                    </p>
                    </td>
                    <td className="px-4 py-4 text-center">
                    <p className="flex justify-center items-center gap-1 text-blue-600 dark:text-blue-400">
                        <FaFileAlt /> {user.reportsSubmitted}
                    </p>
                    </td>
                    <td className="px-4 py-4 text-center">
                    <p className="flex justify-center items-center gap-1 text-green-500">
                        <FaCheckCircle /> {user.reportsValidated}
                    </p>
                    </td>
                    <td className="px-4 py-4 text-center text-yellow-500 font-semibold">
                    {user.trustScore}%
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <MdOutlineCalendarToday className="inline-block mr-1" />
                    {user.joinDate}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <FaClock className="inline-block mr-1" />
                    {user.lastActive}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
        {currentUser && (
        <div className="px-4 py-10 text-gray-900 dark:text-white">
            <div className="max-w-6xl mx-auto bg-white dark:bg-[#1e293b] shadow-lg rounded-xl border dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6">My Contributions</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <UserContributionChart user={currentUser} />
                <UserContributionLineChart
                months={["Jan", "Feb", "Mar", "Apr", "May"]}
                submitted={[4, 6, 8, 7, 10]}
                validated={[3, 5, 6, 6, 9]}
                />
            </div>
            </div>
        </div>
        )}
    </>
  );
};

export default Leaderboard;
