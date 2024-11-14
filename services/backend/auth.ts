'use server';
import { BASE_URL } from "./url";

import {ResponseBody, LoginBody} from '@/index';

export const postLogin = async (body: LoginBody) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json() as ResponseBody;
        return data;
        
    } catch (error) {
        throw new Error(`Failed to login: ${error}`);
    }
}