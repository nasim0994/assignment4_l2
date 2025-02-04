import { baseApi } from "../baseApi";

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCar: builder.mutation({
      query: (data) => ({
        url: `/car/add`,
        method: "POST",
        body: data,
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
    getCarById: builder.query({
      query: (id) => ({
        url: `/car/${id}`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
    editCarById: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/car/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["car"],
    }),
    deleteCarById: builder.mutation({
      query: (id) => ({
        url: `/car/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["car"],
    }),
  }),
});

export const {
  useAddCarMutation,
  useGetAllCarsQuery,
  useGetCarByIdQuery,
  useEditCarByIdMutation,
  useDeleteCarByIdMutation,
} = carApi;
