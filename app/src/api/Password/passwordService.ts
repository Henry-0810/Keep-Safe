const API_URL = "http://localhost:3001/password"; 

const fetchApi = async (endpoint: string, options: RequestInit) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token"); 

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, 
    ...options.headers, 
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(`API Error: ${error.message}`);
  }
};

export const generatePassword = async (difficulty: string) => {
  return await fetchApi("/generate-password", {
    method: "POST",
    body: JSON.stringify({ difficulty }),
  });
};

export const addPassword = async (email: string, passwordName: string, password: string) => {
  return await fetchApi("/add-password", {
    method: "POST",
    body: JSON.stringify({ email, password_name: passwordName, password }),
  });
};

export const updatePassword = async (email: string, passwordName: string, password: string) => {
  return await fetchApi("/update-password", {
    method: "PUT",
    body: JSON.stringify({ email, password_name: passwordName, password }),
  });
};

export const deletePassword = async (email: string, passwordName: string) => {
  return await fetchApi("/delete-password", {
    method: "DELETE",
    body: JSON.stringify({ email, password_name: passwordName }),
  });
};

export const getPasswords = async (email: string) => {
  return await fetchApi(`/get-passwords?email=${email}`, {
    method: "GET",
  });
};

export const getPassword = async (email: string, passwordName: string) => {
  return await fetchApi("/get-password", {
    method: "POST",
    body: JSON.stringify({ email, password_name: passwordName }),
  });
};
