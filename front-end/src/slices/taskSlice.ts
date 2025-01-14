import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { reducerTaskTypes, TasksType } from "../types";

const initialState: reducerTaskTypes = {
    task: '',
    tasks: [],
    tasksChecked: [],
    isSubmitted: false,
    taskActions: '',
    editingTask: null,
    editValue: ''
}

export const TaskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setTask(state: reducerTaskTypes, action: PayloadAction<string>) {
            state.task = action.payload
        },
        setTasks(state: reducerTaskTypes, action: PayloadAction<TasksType[]>) {
            state.tasks = action.payload
        },
        setTasksChecked(state: reducerTaskTypes, action: PayloadAction<TasksType[]>) {
            state.tasksChecked = action.payload
        },
        setIsSubmitted(state: reducerTaskTypes, action: PayloadAction<boolean>) {
            state.isSubmitted = action.payload
        },
        setTaskActions(state: reducerTaskTypes, action: PayloadAction<string>) {
            state.taskActions = action.payload
        },
        setEditingTask(state: reducerTaskTypes, action: PayloadAction<null | string>) {
            state.editingTask = action.payload
        },
        setEditValue(state: reducerTaskTypes, action: PayloadAction<string>) {
            state.editValue = action.payload
        },
    }
});

export const { setTask, setTasks, setTasksChecked, setIsSubmitted, setTaskActions, setEditingTask, setEditValue } = TaskSlice.actions;
export default TaskSlice.reducer;
