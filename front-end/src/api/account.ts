import { Account } from "../types";

// Function to create a new account by making a POST request to the API
export const signUpApi = async (newAccount: Account) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAccount || '')
        });
        // Handle non-200 HTTP status codes
        if (!response.ok) {
            throw new Error('Failed to create account');
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating account:", error);
        return { message: "Error creating account. Please try again later." };
    }
}

// Function to log in a user by making a POST request to the API
export const signInApi = async (account: Account) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account || '')
        });
        if (!response.ok) {
            throw new Error('Failed to log in');
        }
        return await response.json();
    } catch (error) {
        console.error("Error logging in:", error);
        return { message: "Error logging in. Please try again later." };
    }
}