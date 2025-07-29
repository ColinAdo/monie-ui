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
};

export type AccountAnalyticType = {
  data: {
    name: string;
    value: number;
  }[];
};

export type ChatType = {
  id: string;
  prompt: string;
  response: string;
};

export type IncomeTransactionType = {
  total_income: number;
  transactions: TransactionType[];
};

export type ExpensesTransactionType = {
  total_expenses: number;
  transactions: TransactionType[];
};

export function formatWithCommas(amount: number | string): string {
  return Number(amount).toLocaleString();
}

export function formatAmount(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  } else if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}K`;
  } else {
    return amount.toString();
  }
}
