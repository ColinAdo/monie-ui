import { AccountType, TransactionType } from "@/lib/exports";
import { apiSlice } from "../services/apiSlice";

const accountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountType[], void>({
      query: () => ({
        url: "/accounts/",
      }),
    }),
    RetrieveAccounts: builder.query<void, string>({
      query: (accountId) => ({
        url: `/accounts/${accountId}/`,
      }),
    }),
    getTransactions: builder.query<TransactionType[], void>({
      query: () => ({
        url: "/transactions/",
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useRetrieveAccountsQuery,
  useGetTransactionsQuery
} = accountSlice;
