import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { User } from "../types";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data);
    }
  };
  return (
    <div style={{ width: 400, margin: "0 auto" }}>
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="my-2">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          className="form-control"
          id="username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
      </div>
      <div className="my-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>
      <div className="my-2">
        <button onClick={signin} className="btn btn-primary w-100">
          Sign in
        </button>
      </div>
      <div className="text-center">
        <Link to="/Kanbas/Account/Signup" className="btn btn-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}
