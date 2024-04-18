// src/hooks/http.js

export const sendRequest = async (url, options = {}) => {
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
  if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
