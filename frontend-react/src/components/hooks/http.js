// src/hooks/http.js

export const sendRequest = async (url, options = {}) => {
    // Always attach the JWT token if available, except for the JWT endpoint itself
    if (!url.includes('http://localhost:8083/jwt')) {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${jwtToken}`,
        };
      }
    }
  
    const response = await fetch(url, options);
  
    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}: ${response.statusText}`);
    }
  
    // Extract and update JWT token if present in the response headers
    const newToken = response.headers.get("Authorization");
    if (newToken && newToken.startsWith("Bearer ")) {
      const tokenValue = newToken.substring("Bearer ".length);
      localStorage.setItem('jwtToken', tokenValue);
    }
  
    // Return the JSON response
    return response.json();
  };
  