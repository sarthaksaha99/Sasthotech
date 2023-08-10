export interface IAdminTest {
  name: string;
  id: string;
  price: number;
  type: string;
}

export interface IBillSummary {
  billTotalAmout: number | null;
  billPaidAmount: number | null;
  billCount: number | null;
  preBillTotalAmout: number | null;
  preBillPaidAmount: number | null;
  preBillCount: number | null;
  dailyExpenseAmount: number | null;
  dailyExpenseCount: number | null;
}
