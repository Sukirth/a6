import React, { useState, useEffect } from "react";
import {
  BsTrash3Fill,
  BsPlusCircleFill,
  BsFillCheckCircleFill,
  BsPencil,
} from "react-icons/bs";

import * as client from "./client";
import { User } from "../types";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const [role, setRole] = useState("USER");

  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users);
  };

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
      setError("Error creating user");
    }
  };

  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
      setError("Error deleting user");
    }
  };

  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
      setError("Error selecting user");
    }
  };
  const updateUser = async () => {
    try {
      await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
      setError("Error updating user");
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ width: 1400, margin: "25px auto" }}>
      <div className="d-flex align-items-center w-100 my-2">
        <h1 style={{ marginRight: "auto" }}>User Table</h1>
        <div className="d-flex w-25" style={{ height: 40 }}>
          <button
            onClick={() => fetchUsers()}
            className="btn btn-primary btn-sm me-2 w-50"
          >
            Fetch all users
          </button>
          <select
            onChange={(e) => fetchUsersByRole(e.target.value)}
            value={role || "USER"}
            className="form-control float-end"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <td>
              <div className="d-flex ">
                <input
                  className="form-control w-45 me-1"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <input
                  className="form-control w-45 ms-1"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </td>
            <td>
              <input
                className="form-control"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                className="form-control"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td className="text-center">
              <select
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                value={user.role || "USER"}
                className="form-control w-100"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td className="text-center">
              <BsFillCheckCircleFill
                onClick={updateUser}
                className="me-2 text-success fs-1 text"
                style={{ cursor: "pointer" }}
              />

              <BsPlusCircleFill
                onClick={createUser}
                className="me-2 text-success fs-1 text"
                style={{ cursor: "pointer" }}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role[0] + user.role.slice(1).toLowerCase()}</td>
              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-danger me-1"
                  onClick={() => deleteUser(user)}
                >
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning ms-1">
                  <BsPencil onClick={() => selectUser(user)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
