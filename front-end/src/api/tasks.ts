import { TasksType } from "../types";

// Get All Tasks - Not Checked
export const GetTasksApi = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        // Handle non-200 HTTP status codes
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

// Add New Task
export const AddTaskApi = async (newTask: TasksType) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            },
            body: JSON.stringify(newTask || {})
        });
        // Handle non-200 HTTP status codes
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding task:", error);
        return { message: "Error adding task. Please try again later." };
    }
}

// Remove Task
export const RemoveTaskApi = async (id: string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        // Handle non-200 HTTP status codes
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        return await response.json();
    } catch (error) {
        console.error("Error removing task:", error);
        return { message: "Error removing task. Please try again later." };
    }
};

// Update Task
export const UpdateTaskApi = async (id: string | null, newName: { name: string }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            },
            body: JSON.stringify(newName || {})
        });
        // Handle non-200 HTTP status codes
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating task:", error);
        return { message: "Error updating task. Please try again later." };
    }
}

// Get All Tasks - Checked
export const GetTasksCheckedApi = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/checked-task`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            }
        });
        // Handle non-200 HTTP status codes
        if (!response.ok) {
            throw new Error('Failed to fetch checked tasks');
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching checked tasks:", error);
        return [];
    }
}

// Update Task Checked Status
export const TasksCheckedApi = async (id: string | null, checked: boolean) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/checked-task/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token") || ''}`
            },
            body: JSON.stringify({ checked })
        });
        // Handle non-200 HTTP status codes
        if (!response.ok) {
            throw new Error('Failed to update task status');
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error updating task status:", error);
        return { message: "Error updating task status. Please try again later." };
    }
}