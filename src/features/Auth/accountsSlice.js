// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { fetchData, postData, updateData } from '../../utils/crud';

// const baseURL = 'http://localhost:9090/api/v1/accounts';

// export const pending = state => ({ ...initialState, loading: true });

// export const fulfilled = (state, payload) => {
//   if (payload.isError) return { ...initialState, error: payload };

//   return { ...initialState, account: payload };
// };

// export const rejected = (state, payload) => ({
//   ...initialState,
//   error: payload,
// });

// export const signup = createAsyncThunk(
//   'accounts/signup',
//   async () => await postData({ url: `${baseURL}/signup` })
// );

// export const signin = createAsyncThunk(
//   'accounts/signin',
//   async data => await postData({ url: `${baseURL}/signin`, data })
// );

// export const signout = createAsyncThunk(
//   'authentication/signout',
//   async () => await postData({ url: `${baseURL}/signout` })
// );

// export const changeMyPassword = createAsyncThunk(
//   'accounts/changeMyPassword',
//   updateData(`${baseURL}/change-my-password`)
// );

// export const forgotMyPassword = createAsyncThunk(
//   'accounts/forgotMyPassword',
//   async () => await postData({ url: `${baseURL}/forgot-my-password` })
// );

// export const resetMyPassword = createAsyncThunk(
//   'accounts/resetMyPassword',
//   async data => {
//     console.log(data);

//     const { resetToken, password, newPassword } = data;

//     const options = {
//       withCredentials: true,
//       cors: true,
//       data: { password, newPassword },
//       method: 'PATCH',
//     };

//     try {
//       const response = await axios(
//         `${baseURL}/reset-my-password/${resetToken}`,
//         options
//       );

//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         error.response.data.isError = true;
//       } else {
//         error = { message: error.message, isError: true };
//       }

//       return error.response ? error.response.data : error;
//     }
//   }
// );

// export const sendVerificationCode = createAsyncThunk(
//   'accounts/sendVerificationCode',
//   fetchData(`${baseURL}/verification-code`)
// );

// export const verifyMyAccount = createAsyncThunk('accounts/verify', fetchData());

// export const fetchAccount = createAsyncThunk(
//   'account/fetchMyAccount',
//   fetchData(
//     `${baseURL}/my-account`, //'http://192.168.1.196:9090/api/v1/accounts/my-account',
//     {
//       withCredentials: true,
//       cors: true,
//     }
//   )
// );

// const initialState = {
//   loading: false,
//   account: null,
//   error: null,
// };

// export const accountSlice = createSlice({
//   name: 'account',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder
//       // signup
//       .addCase(signup.pending, pending)
//       .addCase(signup.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(signup.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // signin
//       .addCase(signin.pending, pending)
//       .addCase(signin.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(signin.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // signout
//       .addCase(signout.pending, pending)
//       .addCase(signout.fulfilled, (state, { payload }) => {
//         if (payload.isError) return { ...initialState, error: payload };
//         return { ...initialState };
//       })
//       .addCase(signout.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // fetch account
//       .addCase(fetchAccount.pending, pending)
//       .addCase(fetchAccount.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(fetchAccount.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // change my password
//       .addCase(changeMyPassword.pending, pending)
//       .addCase(changeMyPassword.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(changeMyPassword.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // forgot my password
//       .addCase(forgotMyPassword.pending, pending)
//       .addCase(forgotMyPassword.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(forgotMyPassword.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // reset password
//       .addCase(resetMyPassword.pending, pending)
//       .addCase(resetMyPassword.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(resetMyPassword.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // get verification code
//       .addCase(sendVerificationCode.pending, pending)
//       .addCase(sendVerificationCode.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(sendVerificationCode.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       )

//       // get verification code
//       .addCase(verifyMyAccount.pending, pending)
//       .addCase(verifyMyAccount.fulfilled, (state, { payload }) =>
//         fulfilled(state, payload)
//       )
//       .addCase(verifyMyAccount.rejected, (state, { payload }) =>
//         rejected(state, payload)
//       );
//   },
// });

// // export const {} = accountSlice.actions;
// export default accountSlice.reducer;
