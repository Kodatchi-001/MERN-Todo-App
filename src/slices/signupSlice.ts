import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isNotSubmitted: false,
    isSubmitted: false
};

export const SignUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setisNotSubmitted(state, action) {
            state.isNotSubmitted = action.payload
        },
        setisSubmitted(state, action) {
            state.isSubmitted = action.payload
        }
    }
});

export const { setisNotSubmitted, setisSubmitted } = SignUpSlice.actions;
export default SignUpSlice.reducer;