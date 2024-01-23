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
            action.payload.forEach((newPatient: any) => {
                const existingPatientIndex = state.patients.findIndex(
                    (patient: any) => patient.pid === newPatient.pid
                );

                if (existingPatientIndex !== -1) {
                    // If a patient with the same pid already exists
                    const existingPatient = state.patients[existingPatientIndex];

                    // Check if the newPatient has a 'deleted' field and it is truthy (e.g., true)
                    if (newPatient.hasOwnProperty('deleted') && newPatient.deleted) {
                        // If the newPatient has a 'deleted' field with a truthy value,
                        // we will remove the existing patient from the list
                        state.patients.splice(existingPatientIndex, 1);
                    } else {
                        // If the newPatient does not have a 'deleted' field or the 'deleted' field is falsy,
                        // we will update the existing patient with the newPatient data
                        state.patients.splice(existingPatientIndex, 1, newPatient);
                    }
                } else {
                    // If the patient with the same pid doesn't exist, add the new patient to the list
                    if (newPatient.hasOwnProperty('deleted') && newPatient.deleted) {
                        // If the newPatient has a 'deleted' field with a truthy value, skip pushing it to the list
                        return;
                    }
                    state.patients.push(newPatient);
                }
            });
            // state.patients = [...state.patients, ...action.payload.map((patient: any) => ({
            //     ...patient,
            // }))];
        },
        setLastPatient: (state: any, action) => {
            // Serialize the timestamp before setting it in state
            state.lastPatients = {
                ...action.payload,
            };
        },
    },
});
const serializeTimestamp = (timestamp: any) => {
    if (timestamp && timestamp.seconds && timestamp.nanoseconds) {
        return {
            seconds: timestamp.seconds,
            nanoseconds: timestamp.nanoseconds,
        };
    }
    // return timestamp;
};
export const { setPatients, setLastPatient } = patientsSlice.actions;

const patientsReducer = patientsSlice.reducer;
export default patientsReducer;
