import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext'; // Make sure this matches your actual export

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handelLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    return (
    user &&  (
        <div className='flex items-center'>
            <img 
                src={user?.profileImageUrl || ''} // Fixed syntax and added optional chaining
                alt="" 
                className="w-11 h-11 bg-gray-300 rounded-full mr-3" 
            />
            <div>
                <div className="text-[15px] text-black font-bold leading-3">
                    {user.name || ""} {/* Added optional chaining for safety */}
                </div>
                <button 
                    className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
                    onClick={handelLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    ))
}

export default ProfileInfoCard;