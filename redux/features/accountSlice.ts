import { AccountType } from "@/lib/exports";
import { apiSlice } from "../services/apiSlice";

const accountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountType[], void>({
      query: () => ({
        url: "/accounts/",
      }),
    }),
  }),
});

export const { useGetAccountsQuery } = accountSlice;
