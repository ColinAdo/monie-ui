export type AccountType = {
  id: string;
  name: string;
  description: string;
  amount: number;
  created_date: Date | null;
};

export type TransactionType = {
  id: string;
  account_name: string;
  transaction_type: string;
  description: string;
  amount: number;
  created_date: Date;
};

export type AnalyticType = {
  data: { name: string; amount: number }[];
  year: number;
}
