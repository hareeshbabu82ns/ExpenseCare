import { createSlice } from "@reduxjs/toolkit";
import { account, databases, functions } from "../appwrite/appwrite-config";
import { loadingActions } from "./loading-slice";
import { fetchData } from "./data-actions";

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
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

export function logout(sessionId, userId) {
  return function (dispatch) {
    if (sessionId) {
      const promise = account.deleteSession(sessionId);

      promise.then(
        (response) => {
          console.log("Logged out successfully");
          dispatch(authActions.setUserData(initialState));
          dispatch(loadingActions.setLoading(false));
        },
        (error) => {
          console.log(error);
          dispatch(loadingActions.setLoading(false));
        }
      );
    } else if (userId) {
      account.deleteSessions(userId);
    }
  };
}

export function googleSignin() {
  return function (dispatch) {
    const promise = account.get();

    promise.then(
      (response) => {
        dispatch(
          authActions.setUserData({
            userId: response.$id,
            userEmail: response.email,
            googleSession: true,
          })
        );
        const userId = response.$id;

        databases
          .getDocument(
            import.meta.env.VITE_DB_ID,
            import.meta.env.VITE_DB_USER_ID,
            userId
          )
          .then(
            () => {
              dispatch(updateCurrYearAndMonth(userId));
              dispatch(fetchData(userId));
              return true;
            },
            (error) => {
              databases
                .createDocument(
                  import.meta.env.VITE_DB_ID,
                  import.meta.env.VITE_DB_USER_ID,
                  userId,
                  {
                    email: response.email,
                  }
                )
                .then(
                  (response) => {
                    updateCurrYearAndMonth(userId);
                    dispatch(fetchData(userId));
                    return true;
                  },
                  (error) => {
                    return false;
                  }
                );
            }
          );
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  };
}

export function updateCurrYearAndMonth(userId) {
  return function (dispatch) {
    const promise = functions.createExecution(
      import.meta.env.VITE_FUNCTION_UPDATE_YEAR_AND_MONTH_ID,
      JSON.stringify({
        userId: userId,
      }),
      true
    );

    promise.then(
      (response) => {},
      (error) => console.log(error)
    );
  };
}
