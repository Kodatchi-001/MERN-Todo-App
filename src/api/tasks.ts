import { TasksType } from "../types";

// Get All Tasks
export const GetTasksApi = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        const data = await response.json();
        return data || [];

    } catch (error) {
        console.log("Get Problem :",error)
    }
}

// Add NewTask
export const AddTaskApi = async (newTask: TasksType) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask || {})
        });
        const data = await response.json();
        return data || [];

    } catch (error) {
        console.log("POST Problem :",error)
    }
}

// RemoveTask
export const RemoveTaskApi = async (id: string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json'
            }
        });
        return await response.json();

    } catch (error) {
        console.log("DELETE Problem :",error)
    }
};

// Update Task
export const UpdateTaskApi = async (id: string | null, newName: { name: string }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newName)
        });
        const data = await response.json();
        return data || [];

    } catch (error) {
        console.log("PUT Problem :",error)
    }
}