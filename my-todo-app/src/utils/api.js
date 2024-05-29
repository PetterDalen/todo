// src/utils/api.js
const API_BASE = "http://localhost:5001/api/tasks";

export const fetchTasks = async () => {
  const response = await fetch(API_BASE);
  return response.json();
};

export const addTask = async (task) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteAllTasks = async () => {
  await fetch(API_BASE, {
    method: "DELETE",
  });
};
