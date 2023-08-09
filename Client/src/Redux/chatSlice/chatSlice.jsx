import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatApi from "../../Common/api/chatApi";
import recruiterApi from '../../Common/api/recruiterApi'
import seekerApi from '../../Common/api/seekerApi'
import { messageApi } from "../../Common/api/messageApi";

export const getUserChats = createAsyncThunk("getUserChats", async (id) => {
  try {
    const response = await chatApi.get(`/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const getRecruiter = createAsyncThunk(
    'chats/getRecruiter',
    async (id) => {
      try {
        const response = await recruiterApi.get(`/get_profile/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const getSeeker = createAsyncThunk(
    'chats/getRecruiter',
    async (id) => {
      try {
        const response = await seekerApi.get(`/seeker_profile/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const fetchMessages = createAsyncThunk(
    "fetch-meaages",
    async (chatId) => {
      try {
        const response = await messageApi.get(`/${chatId}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const addMessage = createAsyncThunk(
    "add-meaages",
    async (message) => {
      try {
        const response = await messageApi.post(`/`,message);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const createChat = createAsyncThunk(
    'chats/createChat',
    async (payload) => {
      try {
        const response = await chatApi.post(`/`, payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );


const initialState={
    chats:{}
}

const chatSlice=createSlice({
    name:'chats',
    initialState,
})

export default chatSlice.reducer;