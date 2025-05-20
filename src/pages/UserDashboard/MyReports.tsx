import React, { useEffect, useState } from "react";
import ReportCard, { Report } from "../../components/ReportCard";
import { getUserViolationReports, deleteViolationReport } from "../../utils/reporting";

const MyReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      const data = await getUserViolationReports();
      const formattedData: Report[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        location: item.location,
        date: new Date(item.dateTime).toISOString().split("T")[0],
        status: item.status,
        imagePath: item.mediaUrl,
      }));
      setReports(formattedData);
    } catch (err: any) {
      console.error("Failed to fetch reports:", err.message);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await deleteViolationReport(reportId);
      setReports(prev => prev.filter(r => r.id !== reportId)); // Update UI
    } catch (err) {
      console.error("Failed to delete report:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <div className="text-center py-10">Loading reports...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="px-8 pb-10 pt-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
        My Reports
      </h1>

      {reports.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No reports submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onDelete={() => handleDeleteReport(report.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
