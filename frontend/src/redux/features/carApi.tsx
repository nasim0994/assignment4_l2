import { baseApi } from "../baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCar: builder.mutation({
      query: (formData) => ({
        url: `/car/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["car"],
    }),
    getAllCars: builder.query({
      query: (query) => ({
        url: `/car/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["car"],
    }),
  }),
});

export const { useAddCarMutation, useGetAllCarsQuery } = carApi;
