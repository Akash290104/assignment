import { useState } from "react";
import { Upload, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { uploadXMLFile } from "../api/api";

/**
 * Component for uploading XML credit reports.
 * @param {Function} onUploadSuccess - Callback invoked when upload succeeds
 */
export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null); // Selected XML file
  const [loading, setLoading] = useState(false); // Upload in progress
  const [message, setMessage] = useState({ type: "", text: "" }); // Success/error messages

  // Handle file selection and validate extension
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".xml")) {
        setFile(selectedFile);
        setMessage({ type: "", text: "" });
      } else {
        setMessage({ type: "error", text: "Please select a valid XML file" });
        setFile(null);
      }
    }
  };

  // Handle form submission and file upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await uploadXMLFile(file); // Call API
      setMessage({
        type: "success",
        text: "File uploaded and processed successfully!",
      });
      setFile(null);
      e.target.reset();

      // Notify parent component of successful upload
      if (onUploadSuccess) {
        setTimeout(() => onUploadSuccess(result.data), 1500);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to upload file",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Upload Credit Report
        </h2>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label
            htmlFor="xmlFile"
            className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
          >
            Select XML File
          </label>
          <input
            type="file"
            id="xmlFile"
            accept=".xml"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-l-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {file && (
            <p className="mt-2 text-xs sm:text-sm text-gray-600 break-words">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
              Upload & Process
            </>
          )}
        </button>
      </form>

      {/* Message Box */}
      {message.text && (
        <div
          className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg flex items-start gap-2 sm:gap-3 ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-xs sm:text-sm font-medium break-words flex-1">{message.text}</p>
        </div>
      )}
    </div>
  );
}