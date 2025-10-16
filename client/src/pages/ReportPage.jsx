import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ReportDetails from "../components/ReportDetails";
import { getReportById } from "../api/api";

/**
 * Page component to display a single credit report in detail.
 * @param {string} reportId - ID of the report to fetch
 * @param {Function} onBack - Callback to go back to reports list
 */
export default function ReportPage({ reportId, onBack }) {
  const [report, setReport] = useState(null); // Report data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch report when reportId changes
  useEffect(() => {
    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  // Fetch report details from API
  const fetchReport = async () => {
    try {
      setLoading(true);
      const result = await getReportById(reportId);
      setReport(result.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin mb-3 sm:mb-4" />
            <p className="text-gray-600 text-sm sm:text-base">Loading report details...</p>
          </div>
        ) : error ? (
          // Error state
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
            <p className="text-red-800 font-semibold text-sm sm:text-base break-words">{error}</p>
            <button
              onClick={onBack}
              className="mt-3 sm:mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Back to Reports
            </button>
          </div>
        ) : (
          // Success state: show report details
          <ReportDetails report={report} onBack={onBack} />
        )}
      </div>
    </div>
  );
}