import axios from "axios";
import { User } from "../types";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;

export const signin = async (credentials: User) => {
  const response = await axios.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  try {
    const response = await axios.post(`${USERS_API}/profile`);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      return { error: "unauthorized" };
    }

    return {
      error: error.response.data,
    };
  }
};

export const updateUser = async (user: any) => {
  console.log(user);
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const deleteUser = async (user: any) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const signup = async (user: User) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};
