export interface InstalmentInfo {
  instalment_count: number;
  apr: { value: number; string: string };
  total_with_tax: { value: number; string: string };
  cost_of_credit: { value: number; string: string };
  cost_of_credit_pct: { value: number; string: string };
  grand_total: { value: number; string: string };
  max_financed_amount: { value: number; string: string };
  instalment_amount: { value: number; string: string };
  instalment_fee: { value: number; string: string };
  instalment_total: { value: number; string: string };
}

export interface MappedInstalmentInfo {
  instalmentCount: number;
  apr: { value: number; string: string };
  totalWithTax: { value: number; string: string };
  costOfCredit: { value: number; string: string };
  costOfCreditPct: { value: number; string: string };
  grandTotal: { value: number; string: string };
  maxFinancedAmount: { value: number; string: string };
  instalmentAmount: { value: number; string: string };
  instalmentFee: { value: number; string: string };
  instalmentTotal: { value: number; string: string };
}
