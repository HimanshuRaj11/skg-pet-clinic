import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import { redirect } from "next/navigation";
const base_url = process.env.NEXT_PUBLIC_SERVER_URL

interface User {
    name: string;
    email: string;
    role: string;
}

export const LogoutUser = createAsyncThunk("logoutUser", async () => {
    try {
        const res = await axios.get(`${base_url}/api/auth/logout/`, { withCredentials: true })
        return res.data

    } catch (error) {
        return error
    }
})
export const FetchUser = createAsyncThunk("fetchUser", async () => {
    try {
        // Retrieve the token from cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
        if (!token) {
            throw new Error("No access token found");
        }

        const res = await axios.get(`${base_url}/api/auth/profile/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);

        return res.data
    } catch (error) {
        throw error;
    }
})

const UserSlice = createSlice({
    name: "User",
    initialState: {
        User: null as User | null,
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchUser.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.User = action.payload;
                state.error = false
            })
            .addCase(FetchUser.rejected, (state) => {
                state.loading = false
                state.error = true
                state.User = null
            })
            .addCase(LogoutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(LogoutUser.fulfilled, (state) => {
                state.loading = false
                state.User = null
            })
            .addCase(LogoutUser.rejected, (state, action) => {
                state.loading = false

            })
    }
})

export default UserSlice.reducer;