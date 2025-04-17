const BASE_URL = "https://todo.heapmind.com/api";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data.token;
}

export const getToken = async (): Promise<string | null> => {
  return new Promise(resolve => {
    chrome.storage.sync.get(["token"], result => {
      resolve(result.token || null);
    });
  });
};

const headers = async () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${await getToken()}`
});

export const fetchTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos`, { headers: await headers() });
  return res.json();
};

export const addTodo = async (text: string, deadline?: string) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: await headers(),
    body: JSON.stringify({ title: text, deadline })
  });
  return res.json();
};

export const deleteTodo = async (id: string) => {
  return fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: await headers()
  });
};
