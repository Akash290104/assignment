import express from "express";
import { upload } from "../middleware/multerConfig.js";
import { uploadXML, getAllReports, getReportById } from "../controllers/uploadController.js";

const router = express.Router();

// Route to upload a single XML file
router.post("/upload", upload.single("xmlFile"), uploadXML);

// Route to fetch all credit reports
router.get("/reports", getAllReports);

// Route to fetch a specific credit report by ID
router.get("/reports/:id", getReportById);

export default router;
