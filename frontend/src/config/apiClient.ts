import axios from 'axios';

/**
 * @author Lucas Gonzalez
 * @description Instancia de axios para realizar peticiones HTTP a la API backend.
 */
export const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});