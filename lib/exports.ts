interface User {
  id: string;
  username: string;
  email: string;
}

export type AccountType = {
  name: string;
  description: string;
  amount: string;
  created_date: Date | null;
};
