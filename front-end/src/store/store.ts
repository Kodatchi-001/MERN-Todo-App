import { configureStore } from "@reduxjs/toolkit";
import SignUpSlice from "../slices/signupSlice";
import SignInSlice from "../slices/signinSlice";
import TaskSlice from "../slices/taskSlice";

const Store = configureStore({
    reducer: {
        signUp: SignUpSlice,
        signIn: SignInSlice,
        taskSlice: TaskSlice
    }
})

export default Store
export type RootState = ReturnType<typeof Store.getState>