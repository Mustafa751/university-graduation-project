// src/hooks/http.d.ts
import { NavigateFunction } from 'react-router-dom';

interface SendRequestOptions extends RequestInit {
    headers?: HeadersInit & {
        Authorization?: string;
    };
}

interface ApiResponse {
    jwt: string;
    expires: string;
  }
  

  export interface UserToBeCreated {
    id: number;  // Assuming id is part of PanacheEntity
    fakNumber: string;
    egn: string;
    email: string;
    phoneNumber: string;
}
// src/hooks/http.d.ts

export interface ApiResponse {}

export declare function sendRequest<T = unknown>(
    url: string, 
    options?: SendRequestOptions, 
    navigate?: NavigateFunction, 
    logout?: () => void
): Promise<T>;