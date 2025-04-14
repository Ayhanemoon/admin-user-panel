import api from 'features/api/api';
import { setCredentials } from 'features/auth/authSlice';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatch setCredentials to update the store and localStorage
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expirationDate: data.expirationDate,
              user: data.user,
            })
          );
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;