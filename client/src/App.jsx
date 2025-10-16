import { useState } from "react";
import { FileText, Upload, List, Menu, X } from "lucide-react";
import UploadPage from "./pages/UploadPage";
import ReportsPage from "./pages/ReportsPage";
import ReportPage from "./pages/ReportPage";

/**
 * Main application component.
 * Handles navigation between Upload, Reports List, and Report Details pages.
 */
function App() {
  const [currentView, setCurrentView] = useState("upload"); // Current page/view
  const [selectedReportId, setSelectedReportId] = useState(null); // Selected report for details view
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state

  // Called when a file is successfully uploaded
  const handleUploadSuccess = () => {
    setCurrentView("reports"); // Navigate to Reports page
    setMobileMenuOpen(false); // Close mobile menu
  };

  // Called when a report is selected from the reports list
  const handleSelectReport = (reportId) => {
    setSelectedReportId(reportId);
    setCurrentView("report"); // Navigate to Report Details page
    setMobileMenuOpen(false); // Close mobile menu
  };

  // Called when user navigates back from Report Details
  const handleBackToReports = () => {
    setSelectedReportId(null);
    setCurrentView("reports"); // Show reports list
  };

  // Handle navigation and close mobile menu
  const handleNavigation = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo / App Name */}
            <div className="flex items-center gap-2 sm:gap-3">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <span className="text-base sm:text-xl font-bold text-gray-800 truncate">
                Credit Report Parser
              </span>
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => handleNavigation("upload")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === "upload"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Upload className="w-5 h-5" />
                Upload
              </button>

              <button
                onClick={() => handleNavigation("reports")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === "reports" || currentView === "report"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
                Reports
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-200">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavigation("upload")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentView === "upload"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload</span>
                </button>

                <button
                  onClick={() => handleNavigation("reports")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentView === "reports" || currentView === "report"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span>Reports</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        {currentView === "upload" && (
          <UploadPage onUploadSuccess={handleUploadSuccess} />
        )}
        {currentView === "reports" && (
          <ReportsPage onSelectReport={handleSelectReport} />
        )}
        {currentView === "report" && selectedReportId && (
          <ReportPage
            reportId={selectedReportId}
            onBack={handleBackToReports}
          />
        )}
      </main>
    </div>
  );
}

export default App;