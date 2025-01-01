import { AccountType, TransactionType, AnalyticType } from "@/lib/exports";
import { apiSlice } from "../services/apiSlice";

const accountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountType[], void>({
      query: () => ({
        url: "/accounts/",
      }),
    }),
    getAccountAnalytics: builder.query<AnalyticType[], void>({
      query: () => ({
        url: "/account-pie-chart/",
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
    getTransactionAnalytics: builder.query<AnalyticType[], void>({
      query: () => ({
        url: "/transaction-analytics/",
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountAnalyticsQuery,
  useRetrieveAccountsQuery,
  useGetTransactionsQuery,
  useGetTransactionAnalyticsQuery,
} = accountSlice;
