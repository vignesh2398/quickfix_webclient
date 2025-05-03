import React from "react";
import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SkillIndiaLogin.css"; // For optional custom styles
import axios from "axios";
import { app } from "../constant";

const SkillIndiaLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState(); 
  const eventHandle = (e) => {
        const value = e.target.value;
    if (value.length <= 10 && /^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  }
  const generateOtp = (e) => {
    try {
      e.preventDefault(); // Prevent form submission
      if (phoneNumber.length === 10) {
        const otpUrl = `${app.backendUrl}/auth/generateOtp`;
        console.log(otpUrl, "otpUrl")
        axios.post(otpUrl,{"number":phoneNumber}).then((data)=>{
   console.log("otp generated")}).catch((err)=>{
   console.log(err)   })
        // window.location.href = otpUrl;
        console.log(otpUrl, "otpUrl")
      }
      else {
        alert("Please enter a valid 10-digit mobile number.");
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      alert("An error occurred while generating the OTP. Please try again.");
    }
  }




  return (
    <div className="container-fluid p-0">
      {/* Top section with image */}
      <div className="text-center bg-light position-relative">
        <img
          src="https://img.freepik.com/premium-psd/smartphone-screen-long-scroll-mockup_23-2150255824.jpg" // Replace with your own image or local path
          alt="Skill India"
          className="img-fluid w-100"
          style={{ maxHeight: "450px", objectFit: "cover" }}
        />
        <div className="position-absolute bottom-0 w-100 bg-dark text-white py-3">
          {/* <h5 className="mb-1">Govt certified training</h5>
          <p className="mb-0">Get certified by Skill India</p> */}
          <div className="d-flex justify-content-center mt-2">
            <div className="bg-white rounded-pill mx-1" style={{ width: 30, height: 5 }}></div>
            <div className="bg-secondary rounded-pill mx-1" style={{ width: 30, height: 5 }}></div>
            <div className="bg-secondary rounded-pill mx-1" style={{ width: 30, height: 5 }}></div>
          </div>
        </div>
      </div>

      {/* Login form */}
      <div className="p-4">
        <form>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label fw-bold">
              Enter mobile number
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <img src="https://flagcdn.com/w40/in.png" alt="India" width="20" />
                &nbsp;+91
              </span>
              <input
                type="number"
                className="form-control"
                id="mobileNumber"
                placeholder="Enter mobile number"
                value={phoneNumber} // Replace with your own value or state variable
                onChange={ eventHandle}// Update state on change
              />
            </div>
          </div>

          {/* <div className="form-check mb-3"> */}
          <div className="">
            <input type="checkbox" className="form-check-input" id="whatsappUpdates" defaultChecked />
            <label className="form-check-label" htmlFor="whatsappUpdates">
              Get account updates on WhatsApp
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-pill" onClick={generateOtp}>
            Log In / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillIndiaLogin;