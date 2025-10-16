import fs from "fs";
import xml2js from "xml2js";

/**
 * Reads an XML file and parses it into a JavaScript object.
 * 
 * @param {string} filePath - Path to the XML file to parse.
 * @returns {Promise<Object>} Parsed XML data as a JS object.
 */
export const parseXML = async (filePath) => {
  // Read the XML file as a UTF-8 string
  const xmlData = fs.readFileSync(filePath, "utf8");

  // Initialize xml2js parser with explicitArray: false
  // This prevents single elements from being wrapped in an array
  const parser = new xml2js.Parser({ explicitArray: false });

  // Parse the XML string into a JS object
  const result = await parser.parseStringPromise(xmlData);

  return result;
};
