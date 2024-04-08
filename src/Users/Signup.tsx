import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { User } from "../types";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(user as User);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div style={{ width: 400, margin: "0 auto" }}>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="my-2">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          className="form-control"
          id="username"
          value={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
        />
      </div>
      <div className="my-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />
      </div>
      <div className="my-2">
        <button className="btn btn-primary w-100" onClick={signup}>
          Sign up
        </button>
      </div>
      <div className="text-center">
        <Link to="/Kanbas/Account/Signin" className="btn btn-link">
          Sign in
        </Link>
      </div>
    </div>
  );
}
