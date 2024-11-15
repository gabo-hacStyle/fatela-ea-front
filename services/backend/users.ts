'use server';

import { BASE_URL } from "./url";
//Types:
import { UpdateUserType, CreateAdminType, CreateUserType } from '@/index';


const ADMIN_URL = `${BASE_URL}/admin`;
const AUTH_URL = `${BASE_URL}/auth`;


export const createUser = async (body: CreateUserType, token: string) => {
    try {
        const response = await fetch(`${AUTH_URL}/registerUser `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
}


export const createAdmin = async (body: CreateAdminType, token: string) => {
    try {
        const response = await fetch(`${AUTH_URL}/registerAdmin `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
}


export const getUsers = async (token:string) => {
    try {
        const response = await fetch(`${ADMIN_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
             next: {
                tags: ['a']
            }}
        );
        const data = await response.json();
        return data;
        
    } catch (error) {
        throw new Error(`Failed to get users: ${error}`);
    }
}


export const getUserByid = async (email: string, token: string) => {
    try {
        const response = await fetch(`${ADMIN_URL}/users/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
        
    } catch (error) {
        throw new Error(`Failed to get user: ${error}`);
    }
}


export const updateUser = async (body: UpdateUserType, token: string) => {
    console.log('Llego al updateUser');
    try {
        const response = await fetch(`${ADMIN_URL}/updateUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
        
    } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
    }
}

export const deleteUser = async (userId: number, token: string) => {
    try {
        const response = await fetch(`${ADMIN_URL}/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.text(); 

        if (data === 'Usuario eliminado exitosamente') {
            return true;
        } else {
            // Maneja otros casos o errores
            return false;
        }
        
    } catch (error) {
        throw new Error(`Failed to delete user: ${error}`);
    }
}
