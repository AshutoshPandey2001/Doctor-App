import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    patients: [],
    lastPatients: undefined
}
const patientsSlice = createSlice({
    name: 'SET_PATIENTS',
    initialState,
    reducers: {
        setPatients: (state: any, action) => {
            // Serialize the timestamp before setting it in state
            state.patients = [...state.patients, ...action.payload.map((patient: any) => ({
                ...patient,
                timestamp: JSON.stringify(patient.timestamp),
            }))];
        },
        setLastPatient: (state: any, action) => {
            // Serialize the timestamp before setting it in state
            state.lastPatients = {
                ...action.payload,
                timestamp: JSON.stringify(action.payload.timestamp),
            };
        },
    },
});

export const { setPatients, setLastPatient } = patientsSlice.actions;

const patientsReducer = patientsSlice.reducer;
export default patientsReducer;
