import { clintServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
  "user/register",
  async (userdata, thunkApi) => {
    try {
      const response = await clintServer.post("/users/register", {
        username: userdata.username,
        email: userdata.email,
        name: userdata.name,
        password: userdata.password,
      });
      console.log(response.data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "/user/login",
  async (userdata, thunkApi) => {
    try {
      const response = await clintServer.post("/users/login", {
        email: userdata.email,
        password: userdata.password,
      });
      localStorage.setItem("token", response.data.token);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/user/getAllUser",
  async (user, thunkApi) => {
    try {
      const response = await clintServer.post("/users/all_users", {
        currentUserId: user.currentUserId,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const sendConnectionRequest = createAsyncThunk(
  "/connection/sendreqeust",
  async (userdata, thunkApi) => {
    try {
      const reponse = await clintServer.post(
        "/connection/sendconnectionrequest",
        {
          token: localStorage.getItem("token"),
          connectionId: userdata.connectionId,
        }
      );

      return thunkApi.rejectWithValue(reponse.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const whatareMyConnectionrequests = createAsyncThunk(
  "/connection/myrequest",
  async (userdata, thunkApi) => {
    try {
      const response = await clintServer.post(
        "/connection/whataremyrequestsent",
        {
          token: localStorage.getItem("token"),
        }
      );

      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMyConnectionRequest = createAsyncThunk(
  "/connection/getuserrequest",
  async (_, thunkApi) => {
    try {
      const response = await clintServer.post(
        "/connection/getmyconnectionrequest",
        {
          token: localStorage.getItem("token"),
        }
      );
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  "/connection/acceptrequest",
  async (userdata, thunkApi) => {
    try {
      const response = await clintServer.post("/connection/acceptrequest", {
        token: localStorage.getItem("token"),
        acceptType: userdata.acceptType,
        connectionId: userdata.connectionId,
      });

      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getUserChat = createAsyncThunk(
  "/chat/getchat",
  async (userdata, thunkApi) => {
    try {
      const response = await clintServer.post("/chat/getuserchat", {
        userChatId: userdata.userChatId,
        currentUserId: userdata.currentUserId,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "/chat/sendmessage",
  async (userdata, thunkApi) => {
    try {
      const response = await clintServer.post("/chat/sendmessage", {
        currentUserId: userdata.currentUserId,
        message: userdata.message,
        friendUserId: userdata.friendUserId,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
