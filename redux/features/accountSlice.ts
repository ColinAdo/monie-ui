import { apiSlice } from "../services/apiSlice";
import {
  AccountType,
  AnalyticType,
  TransactionType,
  AccountAnalyticType
} from "@/types/exports";

const accountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountType[], void>({
      query: () => ({
        url: "/accounts/",
      }),
    }),
    getAccountAnalytics: builder.query<AccountAnalyticType[], void>({
      query: () => ({
        url: "/account/pie/chart/",
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
    getExpensesAnalytics: builder.query<AnalyticType, number | void>({
      query: (year = new Date().getFullYear()) => ({
        url: `/expenses/analytics/`,
        params: { year },
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountAnalyticsQuery,
  useRetrieveAccountsQuery,
  useGetTransactionsQuery,
  useGetExpensesAnalyticsQuery,
} = accountSlice;
