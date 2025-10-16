/**
 * Controller: XML Upload & Credit Report Management
 * -------------------------------------------------
 * Handles uploading, parsing, and storing credit report XML files.
 * - Validates XML uploads
 * - Parses and extracts structured data
 * - Saves extracted info to MongoDB
 * - Provides endpoints for fetching reports
 */

import fs from "fs";
import { parseXML } from "../utils/xmlParser.js";
import CreditReport from "../models/CreditReport.js";

/**
 * @desc Upload and process an XML credit report
 * @route POST /api/upload
 * @access Public
 */
export const uploadXML = async (req, res, next) => {
  try {
    // 1️⃣ Validate file type
    if (!req.file || !req.file.originalname.endsWith(".xml")) {
      return res
        .status(400)
        .json({ message: "Please upload a valid XML file" });
    }

    // 2️⃣ Parse XML into JS object
    const result = await parseXML(req.file.path);

    // 3️⃣ Extract nested fields safely with optional chaining
    const currentApp =
      result.INProfileResponse?.Current_Application
        ?.Current_Application_Details || {};
    const applicant = currentApp.Current_Applicant_Details || {};
    const caisAccounts =
      result.INProfileResponse?.CAIS_Account?.CAIS_Account_DETAILS || [];
    const caisSummary =
      result.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Credit_Account ||
      {};

    // 4️⃣ Structure extracted data for MongoDB
    const extractedData = {
      basicDetails: {
        name: applicant.First_Name || "",
        middleNames: [
          applicant.Middle_Name1 || "",
          applicant.Middle_Name2 || "",
          applicant.Middle_Name3 || "",
        ],
        lastName: applicant.Last_Name || "",
        mobilePhone: applicant.MobilePhoneNumber || "",
        pan:
          caisAccounts[0]?.CAIS_Holder_Details?.Income_TAX_PAN ||
          applicant.IncomeTaxPan ||
          "",
        dateOfBirth: applicant.Date_Of_Birth_Applicant || "",
        gender: applicant.Gender_Code || "",
        email: applicant.EMailId || "",
        creditScore: Number(result.INProfileResponse?.SCORE?.BureauScore || 0),
      },

      reportSummary: {
        totalAccounts: Number(caisSummary.CreditAccountTotal || 0),
        activeAccounts: Number(caisSummary.CreditAccountActive || 0),
        closedAccounts: Number(caisSummary.CreditAccountClosed || 0),
        defaultAccounts: Number(caisSummary.CreditAccountDefault || 0),
        currentBalanceAmount: Number(
          result.INProfileResponse?.CAIS_Account?.CAIS_Summary
            ?.Total_Outstanding_Balance?.Outstanding_Balance_All || 0
        ),
        securedAccountsAmount: Number(
          result.INProfileResponse?.CAIS_Account?.CAIS_Summary
            ?.Total_Outstanding_Balance?.Outstanding_Balance_Secured || 0
        ),
        unsecuredAccountsAmount: Number(
          result.INProfileResponse?.CAIS_Account?.CAIS_Summary
            ?.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured || 0
        ),
        last7DaysCreditEnquiries: Number(
          result.INProfileResponse?.TotalCAPS_Summary?.TotalCAPSLast7Days || 0
        ),
      },

      creditAccounts: caisAccounts.map((acc) => ({
        creditCard: acc.Account_Type || "",
        bank: acc.Subscriber_Name || "",
        address: acc.CAIS_Holder_Address_Details || {},
        accountNumber: acc.Account_Number || "",
        amountOverdue: Number(acc.Amount_Past_Due || 0),
        currentBalance: Number(acc.Current_Balance || 0),
        holderDetails: acc.CAIS_Holder_Details || {},
        holderPhone: acc.CAIS_Holder_Phone_Details || {},
        holderID: Array.isArray(acc.CAIS_Holder_ID_Details)
          ? acc.CAIS_Holder_ID_Details
          : [acc.CAIS_Holder_ID_Details],
        accountHistory: Array.isArray(acc.CAIS_Account_History)
          ? acc.CAIS_Account_History
          : [acc.CAIS_Account_History],
      })),
    };

    // 5️⃣ Save structured data to MongoDB
    const newReport = new CreditReport(extractedData);
    await newReport.save();

    // 6️⃣ Delete temporary uploaded XML file
    fs.unlinkSync(req.file.path);

    // ✅ Respond to client
    res.status(200).json({
      message: "File processed successfully",
      data: newReport,
    });
  } catch (error) {
    if (req.file && req.file.path) fs.unlinkSync(req.file.path);
    next(error);
  }
};

/**
 * @desc Fetch all uploaded credit reports
 * @route GET /api/reports
 * @access Public
 */
export const getAllReports = async (req, res, next) => {
  try {
    const reports = await CreditReport.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    next(error);
  }
};

/**
 * @desc Fetch a single credit report by ID
 * @route GET /api/reports/:id
 * @access Public
 */
export const getReportById = async (req, res, next) => {
  try {
    const report = await CreditReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    next(error);
  }
};

/**
 * @desc Delete a credit report by ID
 * @route DELETE /api/reports/:id
 * @access Public
 */
export const deleteReportById = async (req, res, next) => {
  try {
    const report =
     await CreditReport.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    next(error);
  }
};
