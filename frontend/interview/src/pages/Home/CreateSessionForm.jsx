import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import SpinnerLoader from '../../components/loader/SpinnerLoader';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();
        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }

        setError("");
        setIsLoading(true);
        try {
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            const generatedQuestions = aiResponse.data; // Fixed variable name

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
            });
            
            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
            <h3 className="text-lg font-semibold text-black">
                Start a New Interview Journey
            </h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-3">
                Fill out a few quick details and unlock your personalized set of interview Questions!
            </p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
                <Input 
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="(e.g., Frontend Developer, Backend Engineer)"
                    type="text"
                />

                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years of Experience"
                    placeholder="(e.g., 1 year, 3 years, 5+ years)"
                    type="text"
                />

                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics to Focus"
                    placeholder="(e.g., React, Node.js, System Design)"
                    type="text"
                />

                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="(Any specific goals or notes for this session)"
                    type="text"
                />

                {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

                <button
                    type="submit"
                    className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading && <SpinnerLoader />} Create Session
                </button>
            </form>
        </div>
    )
}

export default CreateSessionForm