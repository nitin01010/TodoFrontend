import axios from "axios";
const BASEURL = import.meta.env.VITE_BASE_URL;

export async function handleTodo() {
  try {
    const response = await axios.get(`${BASEURL}/api/v1/todo`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
}

export async function handleCreateTodo(task) {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/todo/create`, { task: task });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
}

export async function handleDeleteTodo(id) {
  try {
    const response = await axios.delete(`${BASEURL}/api/v1/todo/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
}

export async function handleEditTodo(updates) {
  const { id, update } = updates;
  try {
    const response = await axios.patch(`${BASEURL}/api/v1/todo/update/${id}`, { task: update });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
}