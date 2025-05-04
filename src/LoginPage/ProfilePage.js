import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { app } from "../constant";

const ProfilePage = () => {
  const location = useLocation();
  const phone = location.state?.phone || "Unknown";
  const id = location.state?.id || "Unknown";
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: phone,
    id:id
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${app.backendUrl}/api/updateprofile`, profile).then((response) => {if(response.statusText === "OK")
      navigate("/dashboard")
      console.log("Profile updated successfully", response.data);
    }).catch((error) => {console.log(error,"error")
    alert("Profile updated failed")
    console.log("User Profile:", profile);
  });
    // You can send profile to API here
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <h3 className="mb-4 text-center">Profile Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                name="mobile"
                value={profile.mobile}
                placeholder="Enter your mobile number"
                readOnly
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Save Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
