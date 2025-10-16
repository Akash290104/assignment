import mongoose from "mongoose";

/**
 * Schema representing an individual credit account.
 * Each account stores credit card details, bank information, addresses,
 * account balances, holder details, and account history.
 */
const creditAccountSchema = new mongoose.Schema({
  creditCard: String,       // Credit card number or identifier
  bank: String,             // Bank name associated with the account
  address: {                // Full address details of the account holder
    First_Line_Of_Address_non_normalized: String,
    Second_Line_Of_Address_non_normalized: String,
    Third_Line_Of_Address_non_normalized: String,
    City_non_normalized: String,
    Fifth_Line_Of_Address_non_normalized: String,
    State_non_normalized: String,
    ZIP_Postal_Code_non_normalized: String,
    CountryCode_non_normalized: String,
    Address_indicator_non_normalized: String,
    Residence_code_non_normalized: String
  },
  accountNumber: String,     // Account number of the credit account
  amountOverdue: Number,     // Amount currently overdue
  currentBalance: Number,    // Current balance of the account
  holderDetails: Object,     // Dynamic object storing holder's personal details
  holderPhone: Object,       // Contact numbers of the account holder
  holderID: [Object],        // Array of identification documents
  accountHistory: [Object]   // Array containing historical account transactions/changes
});

/**
 * Schema representing a full credit report for an applicant.
 * - `basicDetails` stores dynamic fields from the applicant's profile.
 * - `reportSummary` stores summary details from the credit reporting source.
 * - `creditAccounts` stores multiple credit account records using creditAccountSchema.
 * 
 * Timestamps are automatically added for creation and update times.
 */
const creditReportSchema = new mongoose.Schema({
  basicDetails: Object,       // Dynamic fields from Current_Applicant_Details
  reportSummary: Object,      // Dynamic fields from CAIS_Summary
  creditAccounts: [creditAccountSchema] // Array of credit account documents
}, { timestamps: true });     // Automatically adds createdAt and updatedAt fields

// Export the model for use in database operations
export default mongoose.model("CreditReport", creditReportSchema);
