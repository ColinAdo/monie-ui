import { AccountType } from "@/lib/exports";
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
  }),
});

export const { useGetAccountsQuery, useRetrieveAccountsQuery } = accountSlice;
