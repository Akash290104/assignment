import {
  User,
  Phone,
  CreditCard,
  TrendingUp,
  Building,
  MapPin,
  DollarSign,
  FileText,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

/**
 * Component to display detailed information of a credit report.
 * @param {Object} report - Credit report data
 * @param {Function} onBack - Callback to go back to reports list
 */
export default function ReportDetails({ report, onBack }) {
  // Show message if no report is provided
  if (!report) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-8 text-center">
        <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Report not found</p>
      </div>
    );
  }

  // Format number as currency in INR
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0);

  // Convert nested address object into a readable string
  const formatAddress = (addressObj) => {
    if (!addressObj) return "N/A";
    const {
      First_Line_Of_Address_non_normalized,
      Second_Line_Of_Address_non_normalized,
      Third_Line_Of_Address_non_normalized,
      City_non_normalized,
      Fifth_Line_Of_Address_non_normalized,
      State_non_normalized,
      ZIP_Postal_Code_non_normalized,
      CountryCode_non_normalized,
    } = addressObj;

    return [
      First_Line_Of_Address_non_normalized,
      Second_Line_Of_Address_non_normalized,
      Third_Line_Of_Address_non_normalized,
      City_non_normalized,
      Fifth_Line_Of_Address_non_normalized,
      State_non_normalized,
      ZIP_Postal_Code_non_normalized,
      CountryCode_non_normalized,
    ]
      .filter(Boolean)
      .join(", ");
  };

  // Combine first, middle, last names into full name
  const formatFullName = (basicDetails) =>
    [basicDetails?.name, ...(basicDetails?.middleNames || []), basicDetails?.lastName]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Reports
      </button>

      {/* Header with report date and credit score */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Credit Report Details</h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Generated on {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center w-full sm:w-auto">
            <p className="text-xs sm:text-sm text-blue-100 mb-1">Credit Score</p>
            <p className="text-3xl sm:text-4xl font-bold">{report.basicDetails?.creditScore || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Basic Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Basic Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            {/* Full Name */}
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Full Name</p>
                <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">{formatFullName(report.basicDetails)}</p>
              </div>
            </div>

            {/* Mobile Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Mobile Phone</p>
                <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">{report.basicDetails?.mobilePhone || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* PAN Number */}
            <div className="flex items-start gap-3">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">PAN Number</p>
                <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">{report.basicDetails?.pan || "N/A"}</p>
              </div>
            </div>

            {/* Credit Score */}
            <div className="flex items-start gap-3">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Credit Score</p>
                <p className="text-base sm:text-lg font-semibold text-blue-600">{report.basicDetails?.creditScore || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Accounts Section */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Credit Accounts ({report.creditAccounts?.length || 0})
          </h2>
        </div>

        {report.creditAccounts && report.creditAccounts.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {report.creditAccounts.map((account, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3 sm:p-5 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    {/* Account Type */}
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Account Type</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{account.creditCard || "N/A"}</p>
                      </div>
                    </div>

                    {/* Bank/Institution */}
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Bank/Institution</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{account.bank || "N/A"}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Address</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{formatAddress(account.address)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {/* Account Number */}
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Account Number</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{account.accountNumber || "N/A"}</p>
                      </div>
                    </div>

                    {/* Amount Overdue */}
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Amount Overdue</p>
                        <p className="font-semibold text-red-600 text-sm sm:text-base break-words">{formatCurrency(account.amountOverdue)}</p>
                      </div>
                    </div>

                    {/* Current Balance */}
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Current Balance</p>
                        <p className="font-semibold text-green-600 text-sm sm:text-base break-words">{formatCurrency(account.currentBalance)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Fallback if no credit accounts are present
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm sm:text-base">No credit accounts found</p>
          </div>
        )}
      </div>
    </div>
  );
}