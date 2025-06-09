import { apiSlice } from "../services/apiSlice";
import {
  ChatType,
  AccountType,
  AnalyticType,
  TransactionType,
  AccountAnalyticType,
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
    getIncomeAnalytics: builder.query<AnalyticType, number | void>({
      query: (year = new Date().getFullYear()) => ({
        url: `/income/analytics/`,
        params: { year },
      }),
    }),
    chatWithAI: builder.mutation({
      query: (prompt) => ({
        url: "/chat/ai/analytics/",
        method: "POST",
        body: { prompt },
      }),
    }),
    getChats: builder.query<ChatType[], void>({
      query: () => ({
        url: "/chats/",
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountAnalyticsQuery,
  useRetrieveAccountsQuery,
  useGetTransactionsQuery,
  useGetIncomeAnalyticsQuery,
  useGetExpensesAnalyticsQuery,
  useChatWithAIMutation,
  useGetChatsQuery,
} = accountSlice;
