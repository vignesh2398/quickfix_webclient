import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OtpVerification.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { app } from "../constant";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "Unknown";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(5);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (otp.every((digit) => digit !== "") && !verifying) {
      verifyOtp();
    }
  }, [otp]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      // document.getElementById(`otp-5`)?.focus();
    }
  };

  const verifyOtp = () => {
    setVerifying(true);
    axios
      .post(`${app.backendUrl}/auth/validateOtp`, {
        phone,
        otp: parseInt(otp.join(""), 10),
      })
      .then((response) => {
        console.log(response,"response.data.status);");
        if (response.status === 200) {
          // handle success, e.g., navigate to the dashboard
          localStorage.setItem('quickfix', response.data.message.token);
          console.log("OTP verified successfully");
          if( response.data.message.user?.name)
          navigate("/dashboard", { replace: true });
          else
          navigate("/profile", { state: { phone: phone,id:response.data.message.user.id } });
        } else {
          // handle failure, e.g., show an error message
          alert("Invalid OTP");
        }
        // handle success
      })
      .catch((error) => {
        // handle error
        setVerifying(false);
        alert("Invalid OTP");
        setOtp(["", "", "", "", "", ""]);
        console.error("Error verifying OTP:", error);
      });
  };

  return (
    <div className="container-fluid p-3 d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
      <div>
        <button className="btn btn-link text-dark ps-0 mb-3" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left fs-4"></i>
        </button>

        <h4 className="fw-bold">Enter OTP</h4>
        <p className="text-muted mb-6">
          OTP sent to <strong>{phone}</strong>
        </p>

        <div className="d-flex justify-content-between otp-box mb-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              inputMode="numeric"
              className="form-control text-center otp-input"
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <div className="text-center text-muted">
          <i className="bi bi-clock me-1"></i>
          Resend OTP in <strong>00:{timer.toString().padStart(2, "0")}</strong>
        </div>
        <button
          className="btn btn-primary w-100 rounded-pill py-2"
          disabled={true}
          onClick={verifyOtp}
        >
          Resend OTP
        </button>
      </div>

      <div className="mt-4">
        {verifying && (
          <div className="text-center text-success mb-2 small">
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            Checking OTP
          </div>
        )}
        <button
          className="btn btn-primary w-100 rounded-pill py-2"
          disabled={otp.some((d) => d === "") || verifying}
          onClick={verifyOtp}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
