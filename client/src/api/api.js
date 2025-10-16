// Base URL for API requests from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Uploads an XML file to the server.
 * @param {File} file - XML file to upload
 * @returns {Promise<Object>} Server response
 */

export const uploadXMLFile = async (file) => {
  const formData = new FormData();
  formData.append("xmlFile", file); // Append file to form data

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload file");
  }

  return response.json();
};

/**
 * Fetches all credit reports from the server.
 * @returns {Promise<Array>} Array of credit reports
 */

export const getAllReports = async () => {
  const response = await fetch(`${API_BASE_URL}/reports`);

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  return response.json();
};

/**
 * Fetches a specific credit report by ID.
 * @param {string} id - Report ID
 * @returns {Promise<Object>} Credit report object
 */

export const getReportById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reports/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch report");
  }

  return response.json();
};
