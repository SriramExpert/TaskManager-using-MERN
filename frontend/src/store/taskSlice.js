import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getConfig = (thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL, getConfig(thunkAPI));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
    try {
        const response = await axios.post(API_URL, taskData, getConfig(thunkAPI));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, taskData }, thunkAPI) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, taskData, getConfig(thunkAPI));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
    try {
        await axios.delete(`${API_URL}/${id}`, getConfig(thunkAPI));
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const fetchStats = createAsyncThunk('tasks/fetchStats', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/stats`, getConfig(thunkAPI));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

const initialState = {
    tasks: [],
    stats: { Todo: 0, 'In Progress': 0, Completed: 0 },
    isLoading: false,
    isError: false,
    message: '',
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        resetTasks: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            });
    },
});

export const { resetTasks } = taskSlice.actions;
export default taskSlice.reducer;
