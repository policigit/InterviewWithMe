import React, { useState, useContext } from 'react' // Added useContext import
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import axiosInstance from '../../Utils/axiosInstance'; // Adjust path as needed
import { API_PATHS } from '../../Utils/apiPaths'; // Adjust path as needed
import { UserContext } from '../../context/userContext';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Add the validateEmail function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    } 

    if (!password) {
      setError("Password cannot be empty.");
      return; 
    }

    setError(""); // Fixed: set to empty string instead of null for consistency

    // Login Api Call
    try {
      // Add your API call logic here
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
       
    } catch (err) { // Fixed: changed 'error' to 'err' to avoid confusion
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center items-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email" // Changed from "text" to "email" for better validation
          placeholder="john@example.com"
          label="Email Address"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="min 8 characters"
          label="Password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          Login
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button 
            type="button"
            className="font-medium text-primary underline cursor-pointer" 
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;