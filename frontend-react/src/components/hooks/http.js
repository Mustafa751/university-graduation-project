export const sendRequest = async (url, options = {}, navigate, logout) => {
  try {
    let response
    // Add Authorization header if JWT token is present and URL is not excluded
    if (!url.includes('http://localhost:8083/jwt')) {
      const jwtToken = localStorage.getItem('X-Custom-Token');
      if (jwtToken) {
        options.headers = {
          ...options.headers,
          'X-Custom-Token': `Bearer ${jwtToken}`,
        };
      }
    }

    // Include credentials in the fetch request
    options.credentials = 'include';

    // Log the request for debugging
    console.log("Request URL:", url);
    console.log("Request options:", options);
try{
     response = await fetch(url, options);
}
catch(error){
  console.log("error",error);
}
    // Log the response status and headers for debugging
    console.log("Response status:", response.status);
    console.log("Response headers:", [...response.headers]);

    // Check if a new token is provided
    const newToken = response.headers.get("X-Custom-Token");
    if (newToken && newToken.startsWith("Bearer ")) {
      const tokenValue = newToken.substring("Bearer ".length);
      localStorage.setItem('X-Custom-Token', tokenValue);
    } else if (response.status === 401) {
      // If no new token and unauthorized, handle as unauthorized
      console.error("Session expired. Logging out.");
      logout();
      if (navigate) {
        navigate('/login', { replace: true });
      }
      return Promise.reject(new Error("Session expired. Please log in again."));
    }

    if (!response.ok) {
      return Promise.reject(new Error('Request failed'));
    }

    // Return the JSON response
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    // Log the error for debugging
    console.error("Fetch error:", error);
    if (error instanceof TypeError) {
      console.error("Possible CORS issue or network error.");
    }
    throw error;
  }
};
