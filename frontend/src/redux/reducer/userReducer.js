const { createSlice } = require("@reduxjs/toolkit");
import {
  userRegister,
  userLogin,
  getAllUsers,
  sendRequest,
  getMyConnectionRequest,
  acceptConnectionRequest,
  connectedUser,
  sendConnectionRequest,
  whatareMyConnectionrequests,
  acceptRequest,
  sendMessage,
  getUserChat,
} from "../action/userAction.js";

const initialState = {
  message: "",
  userRequests: [],
  myRequests: [],
  isLoggedIn: false,
  all_users: [],
  userInfo: {},
  userChat: [],
  chatusername: "",
  chatUserId: "",
  isShow: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.message = "logout succefully";
    },
    resetMessage: (state) => {
      state.message = "";
    },
    toggleShow: (state) => {
      state.isShow = !state.isShow;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.message = "loading...";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.message = action.payload.message;
        if (localStorage.getItem("token")) {
          state.isLoggedIn = true;
        }
        state.isLoggedIn = true;
        state.userInfo = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.all_users = action.payload.users;
      })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(whatareMyConnectionrequests.fulfilled, (state, action) => {
        console.log(state.myRequests);
        state.myRequests = action.payload.myRequests;
      })
      .addCase(getMyConnectionRequest.fulfilled, (state, action) => {
        state.userRequests = action.payload.userRequests;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(getUserChat.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userChat = action.payload.userChat;
        state.chatusername = action.payload.user?.username;
        state.chatUserId = action.payload.user?._id;
      });
  },
});
``;

export const { reset, logout, resetMessage } = userSlice.actions;

export default userSlice.reducer;
