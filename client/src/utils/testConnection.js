// Test function to check backend connection
export const testBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/');
    const data = await response.text();
    console.log('Backend connection test:', data);
    return { success: true, message: data };
  } catch (error) {
    console.error('Backend connection failed:', error);
    return { success: false, error: error.message };
  }
};