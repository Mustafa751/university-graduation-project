// src/hooks/http.d.ts

interface SendRequestOptions extends RequestInit {
    headers?: HeadersInit & {
        Authorization?: string;
    };
}

interface ApiResponse {
    jwt: string;
    expires: string;
  }
  

export declare function sendRequest(url: string, options?: SendRequestOptions): Promise<ApiResponse>;
