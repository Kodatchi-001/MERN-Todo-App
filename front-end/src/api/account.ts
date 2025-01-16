import { Account } from "../types";

// Create newAccount
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
        return await response.json();
    } catch (error) {
        console.error("POST Problem:", error);
        return { message: "Error create account" };
    }
}

// Login Account
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
        return await response.json();
    } catch (error) {
        console.error("POST Problem:", error);
        return { message: "Error create account" };
    }
}