// Update the function to accept logout as a parameter
export const sendRequest = async (url, options = {}, navigate, logout) => {
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

    const newToken = response.headers.get("Authorization");
    if (newToken && newToken.startsWith("Bearer ")) {
      const tokenValue = newToken.substring("Bearer ".length);
      localStorage.setItem('jwtToken', tokenValue);
    } else {
      // If no new token, use logout and navigate to login
      logout();
      if (navigate) {
        navigate('/login', { replace: true });
      }
      return Promise.reject(new Error("Session expired. Please log in again."));
    }
  
    return response.json();
};
