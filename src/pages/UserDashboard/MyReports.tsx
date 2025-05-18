import React from "react";
import ReportCard, { Report } from "../../components/ReportCard";

const reports: Report[] = [
  {
    id: "1",
    title: "Speeding in School Zone",
    category: "Speeding",
    location: "Main Blvd, Lahore",
    date: "2024-12-10",
    status: "Pending",
    imagePath: "/images/complaint1.jpg",
  },
  {
    id: "2",
    title: "Wrong Parking in Fire Lane",
    category: "Wrong Parking",
    location: "Gulberg II, Lahore",
    date: "2024-12-08",
    status: "Pending",
    imagePath: "/images/complaint2.jpg",
  },
  {
    id: "3",
    title: "Intersection Blocked",
    category: "Obstruction",
    location: "Shahrah-e-Faisal, Karachi",
    date: "2024-12-05",
    status: "Verified",
    imagePath: "/images/complaint3.jpg",
  },
];

const MyReports: React.FC = () => {
  return (
    <div className="px-8 pb-10 pt-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
        My Reports
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default MyReports;
