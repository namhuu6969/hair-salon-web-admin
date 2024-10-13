import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState("form");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showPhoneInput) {
      alert(`Phone number submitted: ${formData.phoneNumber}`);
      navigate('/homepage');
    } else {
      console.log(formData);
      alert("Registration successful!");
      navigate('/homepage');
    }
  };

  const handleGoogleRegisterSuccess = (credentialResponse) => {
    console.log("Google register success:", credentialResponse);
    alert("Google register success!");
  };

  const handleGoogleRegisterFailure = (error) => {
    console.error("Google register failed:", error);
    alert("Google register failed. Try Again.");
  };

  const handleSignInWithPhone = () => {
    setShowPhoneInput(true);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div 
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          {showPhoneInput ? (
            <div className="mb-4 flex flex-col gap-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Submit Phone Number
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Register
              </button>

              <div className="flex items-center my-4">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-gray-500">Or register with</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
              <div className="text-center">
                <GoogleLogin
                  onSuccess={handleGoogleRegisterSuccess}
                  onError={handleGoogleRegisterFailure}
                  useOneTap
                />
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={handleSignInWithPhone}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Sign in with Phone Number
                </button>
              </div>
            </>
          )}
          <p className="text-center mt-4 text-gray-600">
            Do you have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Signin
            </Link>
          </p>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterForm;
