import { TasksType } from "../types";

// Get All Tasks-Not-Checked
export const GetTasksApi = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Get Problem:", error);
        return [];
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
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        return await response.json();
    } catch (error) {
        console.error("POST Problem:", error);
        return { message: "Error adding task" };
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
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        return await response.json();
    } catch (error) {
        console.error("DELETE Problem:", error);
        return { message: "Error removing task" };
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
            body: JSON.stringify(newName || {})
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return await response.json();
    } catch (error) {
        console.error("PUT Problem:", error);
        return { message: "Error updating task" };
    }
}

// Get All Tasks-Checked
export const GetTasksCheckedApi = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/checked-task`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch checked tasks');
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Get Checked Tasks Problem:", error);
        return [];
    }
}

// Task TCheck
export const TasksCheckedApi = async (id: string | null, checked: boolean) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/checked-task/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checked })
        });
        if (!response.ok) {
            throw new Error('Failed to update task status');
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("PUT Problem:", error);
        return { message: "Error updating task status" };
    }
}