import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/js/dist/dropdown";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const account = await client.profile();

    if (account.error === "unauthorized") {
      alert("Please log in");
      navigate("/Kanbas/Account/Signin");
    } else {
      if (account.dob) {
        const editedDob = account.dob.split("T")[0];
        account.dob = editedDob;
      }
      setProfile(account);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const save = async () => {
    console.log(profile);
    await client.updateUser(profile);
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  return (
    <div style={{ width: 400, margin: "0 auto" }}>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Profile</h1>
        <div className="my-4">
          <button onClick={save} className="btn btn-primary me-2">
            Save
          </button>
          <button onClick={signout} className="btn btn-danger">
            Signout
          </button>
        </div>
      </div>
      <Link
        to="/Kanbas/Account/Admin/Users"
        className="btn btn-warning w-100 my-3"
      >
        Users
      </Link>
      {profile && (
        <div>
          <div className="my-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              value={profile.username}
              type="text"
              className="form-control"
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>
          <div className="my-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </div>
          <div className="my-2">
            <label htmlFor="fName" className="form-label">
              First name
            </label>
            <input
              id="fName"
              className="form-control"
              type="text"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </div>
          <div className="my-2">
            <label htmlFor="lName" className="form-label">
              Last name
            </label>
            <input
              id="lName"
              className="form-control"
              value={profile.lastName}
              type="text"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </div>
          <div className="my-2">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              id="dob"
              className="form-control"
              value={profile.dob}
              type="date"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>
          <div className="my-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              className="form-control"
              value={profile.email}
              type="email"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
          <div className="dropdown dropend">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Role: {profile.role[0] + profile.role.slice(1).toLowerCase()}
            </button>
            <ul className="dropdown-menu">
              <li
                className="dropdown-item"
                onClick={() => setProfile({ ...profile, role: "USER" })}
              >
                User
              </li>
              <li
                className="dropdown-item"
                onClick={() => setProfile({ ...profile, role: "ADMIN" })}
              >
                Admin
              </li>
              <li
                className="dropdown-item"
                onClick={() => setProfile({ ...profile, role: "FACULTY" })}
              >
                Faculty
              </li>
              <li
                className="dropdown-item"
                onClick={() => setProfile({ ...profile, role: "STUDENT" })}
              >
                Student
              </li>
            </ul>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
}
