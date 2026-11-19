export interface OfferRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: "Buyer" | "Seller";
  companyName?: string;

  movieId: number;
  movieTitle: string;
  moviePoster: string;
  movieBackdrop?: string;
  movieYear?: string;

  includedCountries: string[];
  excludedCountries: string[];
  startDate: string;
  endDate: string;
  years: number;
  months: number;

  currency: string;
  rightsType: string;
  exclusivity: "Exclusive" | "Non Exclusive";
  holdback: string;

  pricingModel: "flat_rate" | "share_revenue";
  flatRateAmount?: number;
  priceListingUnit?: string;
  totalAmount?: number;
  transactionMinPrice?: number;
  transactionMaxPrice?: number;
  revenueSharePercentage?: number;
  estimatedMonthlyMin?: number;
  estimatedMonthlyMax?: number;
  hasMinimumGuarantee?: boolean;
  minimumGuaranteeAmount?: number;
  minimumGuaranteePeriod?: string;
  minimumGuaranteeScope?: string;

  status: "Pending" | "Accepted" | "Under Review";
  createdAt: string;
}
