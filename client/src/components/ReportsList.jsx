import { useState } from "react";
import { FileText, Calendar, User, TrendingUp, Trash2 } from "lucide-react";
import { deleteReportById } from "../api/api";
import { toast, ToastContainer } from "react-toastify";

/**
 * Component to display a list of credit reports.
 * Includes functionality to view and delete reports.
 *
 * @param {Array} reports - Array of report objects
 * @param {Function} onSelectReport - Callback when a report is selected
 */
export default function ReportsList({ reports, onSelectReport }) {
  // Maintain a local copy of the reports list so we can update UI after deletion
  const [reportList, setReportList] = useState(reports || []);
  const [deleting, setDeleting] = useState(false); // Loading state for delete action

  /**
   * Deletes a report both on backend and frontend.
   * @param {string} id - Report ID to delete
   */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await deleteReportById(id); // Call backend API to delete report
      toast.success("Report deleted successfully");
      setReportList((prev) => prev.filter((r) => r._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Failed to delete report:", error);
      toast.error("Error deleting report. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // Show fallback message if no reports exist
  if (!reportList || reportList.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow px-4">
        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-base sm:text-lg">
          No credit reports found
        </p>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          Upload an XML file to get started
        </p>
      </div>
    );
  }

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <ToastContainer />
      {reportList.map((report) => (
        <div
          key={report._id}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 hover:border-blue-500"
        >
          <div className="p-4 sm:p-6">
            {/* Report Header */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div
                className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 cursor-pointer"
                onClick={() => onSelectReport(report._id)}
              >
                <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">
                    Credit Report
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    ID: {report._id.slice(-6)}
                  </p>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(report._id)}
                disabled={deleting}
                className="text-red-500 hover:text-red-700 transition-colors p-1 sm:p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
                title="Delete Report"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Report Info */}
            <div className="space-y-2 sm:space-y-3 border-t border-gray-100 pt-3 sm:pt-4">
              <div className="flex items-center gap-2 text-gray-700 min-w-0">
                <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">
                  {report.basicDetails?.name || "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <TrendingUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">
                  Score:{" "}
                  <span className="font-bold text-blue-600">
                    {report.basicDetails?.creditScore || "N/A"}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 min-w-0">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs truncate">
                  {formatDate(report.createdAt)}
                </span>
              </div>
            </div>

            {/* Report Summary */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Accounts</p>
                  <p className="text-base sm:text-lg font-bold text-gray-800">
                    {report.reportSummary?.totalAccounts || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Active</p>
                  <p className="text-base sm:text-lg font-bold text-green-600">
                    {report.reportSummary?.activeAccounts || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => onSelectReport(report._id)}
              className="w-full mt-3 sm:mt-4 bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
