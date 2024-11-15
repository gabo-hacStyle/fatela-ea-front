'use server';


import { UpdateUserType, CreateAdminType, CreateUserType } from '@/index';
import { createAdmin, createUser, deleteUser, getUsers, updateUser } from '@/services/backend/users';
import { getCookie } from '@/utils/cookiesManager';
import { redirect } from 'next/navigation'

import { revalidateTag } from 'next/cache';
//Token cookie
const bringToken = async () => {
    const token = await getCookie('token');
    return token;
}

export const handleGetUsers = async () => {
    try {
        const token = await bringToken();
        if(token) {
            const response = await getUsers(token);
            return response;
        } else {
            redirect('/login');
        }
        
    } catch (error) {
        throw new Error(`Failed to get users: ${error}`);
    }
}

// export const handleGetUser = async (userId: string) => {
//     try {
//         const token = await bringToken();
//         if(token) {
//             const response = await getUsers(token);
//             return response;
//         } else {
//             redirect('/login');
//         }
        
//     } catch (error) {
//         throw new Error(`Failed to get user: ${error}`);
//     }
// }

export const handleCreateUser = async (body: CreateUserType) => {
    try {
       const token = await bringToken();
       if(token) {
        const response = await createUser(body, token);
        revalidateTag('a');
        return response;
       } else {
        
        redirect('/login');
        

       }
         
        
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
}

export const handleCreateAdmin = async (body: CreateAdminType) => {
    try {
       const token = await bringToken();
       if(token) {
        const response = await createAdmin(body, token);
        revalidateTag('a')
        return response;
       } else {
        
        redirect('/login');
       }
        
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
}

//Update
export const handleUpdateUser = async (body: UpdateUserType) => {
    console.log('Llego al handleUpdateUser');try {
        const token = await bringToken();
        if(token) {
            const response = await updateUser(body, token);
            revalidateTag('a');
            return response;
        } else {
            redirect('/login');
        }
        
    } catch (error) {
        throw new Error(`Failed to update user: ${error}`);
    }
}

//Delete
export const handleDeleteUser = async (userId: number) => {
    try {
        const token = await bringToken();
        if(token) {
            const response = await deleteUser(userId, token);
            revalidateTag('a');
            return response;
        } else {
            redirect('/login');
        }
        
    } catch (error) {
        throw new Error(`Failed to delete user: ${error}`);
    }
}