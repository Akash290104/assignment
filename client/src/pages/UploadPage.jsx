import UploadForm from "../components/UploadForm";

/**
 * Page for uploading Experian XML credit reports.
 * @param {Function} onUploadSuccess - Callback invoked when a file is uploaded and processed successfully
 */
export default function UploadPage({ onUploadSuccess }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Credit Report Parser
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Upload Experian XML files to view comprehensive credit reports
          </p>
        </div>

        {/* Upload Form */}
        <UploadForm onUploadSuccess={onUploadSuccess} />

        {/* "How It Works" Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-7 md:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center md:text-left">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-600 font-bold text-xl sm:text-2xl">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                Select XML File
              </h4>
              <p className="text-sm sm:text-base text-gray-600 px-2">
                Choose your Experian credit report XML file from your device
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-600 font-bold text-xl sm:text-2xl">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                Upload & Process
              </h4>
              <p className="text-sm sm:text-base text-gray-600 px-2">
                Our system parses the XML and extracts key credit information
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-600 font-bold text-xl sm:text-2xl">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                View Report
              </h4>
              <p className="text-sm sm:text-base text-gray-600 px-2">
                Access detailed credit information in an organized format
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}