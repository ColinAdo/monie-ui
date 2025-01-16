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
    getTransactionAnalytics: builder.query<AnalyticType, number | void>({
      query: (year = new Date().getFullYear()) => ({
        url: `/transaction/analytics/`,
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
  useGetTransactionAnalyticsQuery,
} = accountSlice;
