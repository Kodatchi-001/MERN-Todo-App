import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isNotSubmitted: false,
    isSubmitted: false
};

export const SignInSlice = createSlice({
    name: 'signIn',
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

export const { setisNotSubmitted, setisSubmitted } = SignInSlice.actions;
export default SignInSlice.reducer;