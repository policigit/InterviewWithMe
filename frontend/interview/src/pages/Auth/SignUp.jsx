import React, { useState, useContext } from 'react'; // Added useContext import
import { useNavigate } from 'react-router-dom';
// import Input from '../../components/inputs/Input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from '../../Utils/helper';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from '../../Utils/apiPaths';
import uploadImage from '../../Utils/uploadimage'; // Fixed: uploadimage -> uploadImage
import axiosInstance from '../../Utils/axiosInstance';
import Input from '../../components/Inputs/Input';

const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    
    if(!fullName){
      setError("Full name cannot be empty.");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Password cannot be empty.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    
    setError("");
    
    try {
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || ""; // Fixed: umageUrl -> imageUrl
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const {token} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // ... rest of your JSX remains the same


  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center items-center">
      <h3 className="text-lg font-semibold text-black ">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                type="text"
                placeholder="John Doe"
                label="Full Name"
              />

              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                type="email"
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
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button type="submit" className="btn-primary">
              Sign Up
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account?{" "}
              <button 
              type='button'
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage("login");
              }}
              >
                Login
              </button>
            </p>
          </form>
      
    </div>
  )
}

export default SignUp;
