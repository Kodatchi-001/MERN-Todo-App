export interface TasksType {
    id: string,
    name: string,
    checked: boolean
}
export interface Account {
    fullName?: string
    email: string
    password: string
}


export interface reducerTaskTypes {
    task: string,
    tasks: TasksType[],
    tasksChecked: TasksType[],
    isSubmitted: boolean,
    taskActions: string,
    editingTask: null | string,
    editValue: string

}