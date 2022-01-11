import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchAPI = createApi({
   reducerPath: "searchAPI",
   baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:4000",
   }),

   endpoints: (builder) => ({
      search: builder.query({
         query: (searchTerms) => `/api/search/${searchTerms}`,
      }),
   }),
});

export const { useSearchQuery } = searchAPI;
export default searchAPI;
