import { createSlice } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut } from '../services/api';

const initialState = {
    moodRating: 5,
    stressLevel: 5,
    feelings: '',
    healthStatuses: [],
    status: null,
    timestamp: null,
    loading: false,
    error: null,
};

const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        setMood: (state, action) => {
            state.moodRating = action.payload;
        },
        setStress: (state, action) => {
            state.stressLevel = action.payload;
        },
        setFeelings: (state, action) => {
            state.feelings = action.payload;
        },
        setHealthStatus: (state, action) => {
            state.healthStatuses = action.payload;
        },
        addHealthStatus: (state, action) => {
            state.status = action.payload.status;
            state.timestamp = action.payload.timestamp;
        },
        updateHealthStatus: (state, action) => {
            state.status = action.payload.status;
            state.timestamp = action.payload.timestamp;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setMood,
    setStress,
    setFeelings,
    setHealthStatus,
    addHealthStatus,
    updateHealthStatus,
    setLoading,
    setError
} = healthSlice.actions;

export const fetchHealthStatus = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiGet('/health');
        dispatch(setHealthStatus(response.data));
    } catch (error) {
        dispatch(setError('Failed to fetch health status.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createHealthStatus = (healthData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiPost('/health', healthData);
        dispatch(addHealthStatus(response.data));
    } catch (error) {
        dispatch(setError('Failed to create health status.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const editHealthStatus = (healthId, healthData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiPut(`/health/${healthId}`, healthData);
        dispatch(updateHealthStatus(response.data));
    } catch (error) {
        dispatch(setError('Failed to update health status.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export default healthSlice.reducer;
