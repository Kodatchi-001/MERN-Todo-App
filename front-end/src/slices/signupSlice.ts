import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isNotSubmitted: false,
    isSubmitted: false,
    isAlready: false
};

export const SignUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setIsNotSubmitted(state, action) {
            state.isNotSubmitted = action.payload
        },
        setIsSubmitted(state, action) {
            state.isSubmitted = action.payload
        },
        setIsAlready(state, action) {
            state.isAlready = action.payload
        }
    }
});

export const { setIsNotSubmitted, setIsSubmitted, setIsAlready } = SignUpSlice.actions;
export default SignUpSlice.reducer;