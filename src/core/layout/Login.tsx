import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginMethod, setLoginMethod] = useState("form"); // Quản lý phương thức đăng nhập

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic đăng nhập với username và password
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    alert("Google login success!");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
    alert("Google login failed. Try Again.");
  };

  const handlePhoneLogin = () => {
    setLoginMethod("phone"); // Đặt phương thức đăng nhập thành "phone"
    setShowPhoneInput(true);  // Hiển thị khung nhập số điện thoại
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
  
    // Kiểm tra nếu số điện thoại bắt đầu bằng "+84" và có độ dài 10 ký tự
    const phonePattern = /^\+84\d{8}$/; // Bắt đầu bằng "+84" và theo sau là 8 chữ số
    if (!phonePattern.test(phoneNumber)) {
      alert("Phone number must start with +84 and contain 10 digits.");
      return;
    }
  
    console.log("Phone number submitted:", phoneNumber);
    alert(`Phone number ${phoneNumber} submitted successfully`);
    // Thêm logic xử lý đăng nhập với số điện thoại tại đây
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div 
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-6 bg-white shadow-md rounded-lg w-80">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {loginMethod === "form" && (
            <form onSubmit={handleLogin} className="mb-4">
              <div className="mb-4">
                <label className="block text-gray-700">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Login
              </button>

              <div className="flex items-center my-4">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-gray-500">Or login with</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <div className="text-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                  useOneTap
                />
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={handlePhoneLogin}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Sign in with Phone Number
                </button>
              </div>
            </form>
          )}

          {loginMethod === "phone" && showPhoneInput && (
            <form onSubmit={handlePhoneSubmit} className="mt-4">
              <label className="block text-gray-700 mb-2">Phone Number:</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 mb-4"
                placeholder="Enter your phone number"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Submit Phone Number
              </button>
            </form>
          )}

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
