import { createSlice } from "@reduxjs/toolkit";
import { account, databases, functions } from "../appwrite/appwrite-config";
import { loadingActions } from "./loading-slice";
import { fetchData } from "./data-actions";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";

const initialState = {
  userId: null,
  sessionId: null,
  userEmail: null,
  googleSession: false,
};

/* State to provide and set the logged in user's userId and email */

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserData(state, action) {
      state.userId = action.payload?.userId;
      state.sessionId = action.payload?.sessionId;
      state.userEmail = action.payload?.userEmail;
      state.googleSession = action.payload?.googleSession;
    },
    setUserId(state, action) {
      state.userId = action?.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userId = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // console.log(action.payload.$id);
        state.userId = action.payload.$id;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userId = null;
        state.error = action.error.message;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { dispatch }) => {
    dispatch(loadingActions.setLoading(true));
    try {
      const response = await account.get();
      // console.log(response);
      return response;
    } finally {
      // setTimeout(() => dispatch(loadingActions.setLoading(false)), 5000);
      dispatch(loadingActions.setLoading(false));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ sessionId, userId } = {}, { dispatch }) => {
    dispatch(loadingActions.setLoading(true));
    try {
      console.log("logging out...");
      if (sessionId) await account.deleteSession(sessionId);
      else if (userId) await account.deleteSessions(userId);
      else throw Error("user/session is required to logout");
      dispatch(authActions.setUserData(initialState));
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
    return initialState;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password } = {}, { dispatch }) => {
    dispatch(loadingActions.setLoading(true));
    try {
      console.log("logging in...");
      const response = await account.createEmailSession(email, password);
      const { userId, $id: sessionId, providerUid: userEmail } = response;
      dispatch(authActions.setUserData({ userId, sessionId, userEmail }));
      dispatch(executeUpdateCurrYearAndMonth(userId));
      dispatch(fetchData(userId));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  }
);

export const executeUpdateCurrYearAndMonth = createAsyncThunk(
  "functions/updateCurrYearAndMonth",
  async (userId) => {
    if (!userId) throw Error("userId is required");
    const res = await functions.createExecution(
      import.meta.env.VITE_FUNCTION_UPDATE_YEAR_AND_MONTH_ID,
      JSON.stringify({
        userId,
      })
    );
    return res;
  }
);

export const googleSignin = createAsyncThunk(
  "auth/googleSignin",
  async (_, { dispatch }) => {
    const response = await account.get();
    const { $id: userId, email: userEmail } = response;
    dispatch(
      authActions.setUserData({
        userId,
        userEmail,
        googleSession: true,
      })
    );
    try {
      await databases.getDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_DB_USER_ID,
        userId
      );
    } catch (e) {
      console.log("no user document found, creating new...");
      await databases.createDocument(
        import.meta.env.VITE_DB_ID,
        import.meta.env.VITE_DB_USER_ID,
        userId,
        {
          email: userEmail,
        }
      );
    } finally {
      dispatch(executeUpdateCurrYearAndMonth(userId));
      dispatch(fetchData(userId));
    }
    return response;
  }
);

// export function updateCurrYearAndMonth(userId) {
//   return function (dispatch) {
//     const promise = functions.createExecution(
//       import.meta.env.VITE_FUNCTION_UPDATE_YEAR_AND_MONTH_ID,
//       JSON.stringify({
//         userId: userId,
//       })
//     );

//     promise.then(
//       (response) => {},
//       (error) => console.log(error)
//     );
//   };
// }
