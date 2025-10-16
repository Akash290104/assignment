import { useState, useEffect } from "react";
import { Loader2, FileText } from "lucide-react";
import ReportsList from "../components/ReportsList";
import { getAllReports } from "../api/api";

/**
 * Page to display all uploaded credit reports.
 * @param {Function} onSelectReport - Callback invoked when a report is selected
 */
export default function ReportsPage({ onSelectReport }) {
  const [reports, setReports] = useState([]); // Stores the list of reports
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  // Fetch all reports from backend API
  const fetchReports = async () => {
    try {
      setLoading(true);
      const result = await getAllReports();
      setReports(result.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with page title and refresh button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
              Credit Reports
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              View all uploaded and processed credit reports
            </p>
          </div>
          <button
            onClick={fetchReports}
            className="bg-blue-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            Refresh
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin mb-3 sm:mb-4" />
            <p className="text-gray-600 text-sm sm:text-base">Loading reports...</p>
          </div>
        ) : error ? (
          // Error state
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-800 font-semibold text-sm sm:text-base break-words">{error}</p>
            <button
              onClick={fetchReports}
              className="mt-3 sm:mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        ) : (
          // Success state: display list of reports
          <ReportsList reports={reports} onSelectReport={onSelectReport} />
        )}
      </div>
    </div>
  );
}