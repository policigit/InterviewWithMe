import React, {createContext, useState, useEffect} from "react";
import axiosInstance from "../Utils/axiosInstance"; // Fixed path - adjust as needed
import {API_PATHS} from "../Utils/apiPaths"; // Fixed path - adjust as needed

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only run once on mount
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, []); // Empty dependency array - run only once on mount

    const updateUser = (userData) => {
        setUser(userData);
        // Only set token if it exists in userData
        if (userData.token) {
            localStorage.setItem("token", userData.token);
        }
        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false); // Added this to ensure loading state is updated
    };

    return (
        <UserContext.Provider value={{user, loading, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;