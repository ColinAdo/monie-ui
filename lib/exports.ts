interface User {
  id: string;
  username: string;
  email: string;
}

export type AccountType = {
  id: string;
  name: string;
  description: string;
  amount: number;
  created_date: Date | null;
};
