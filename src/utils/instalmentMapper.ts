import { InstalmentInfo, MappedInstalmentInfo } from "../types/instalments";

export function mapInstalments(
  instalments: InstalmentInfo[]
): MappedInstalmentInfo[] {
  return instalments.map((instalment) => ({
    instalmentCount: instalment.instalment_count || 0,
    apr: instalment.apr || { value: 0, string: "" },
    totalWithTax: instalment.total_with_tax || { value: 0, string: "" },
    costOfCredit: instalment.cost_of_credit || { value: 0, string: "" },
    costOfCreditPct: instalment.cost_of_credit_pct || { value: 0, string: "" },
    grandTotal: instalment.grand_total || { value: 0, string: "" },
    maxFinancedAmount: instalment.max_financed_amount || {
      value: 0,
      string: "",
    },
    instalmentAmount: instalment.instalment_amount || { value: 0, string: "" },
    instalmentFee: instalment.instalment_fee || { value: 0, string: "" },
    instalmentTotal: instalment.instalment_total || { value: 0, string: "" },
  }));
}
