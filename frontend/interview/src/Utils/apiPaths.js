export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH:{
        REGISTER:"/api/auth/register", //signup
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile" //get logged in user details
    },

    IMAGE:{
        UPLOAD_IMAGE: "/api/auth/upload-image",//Upload profile picture
    },

    AI:{
        GENERATE_QUESTIONS: "/api/ai/generate-questions",
        GENERATE_EXPLANATION: "/api/ai/generate-explanation",
    },

    SESSION: {
        CREATE: "/api/sessions/create",
        GET_ALL: "/api/sessions/my-sessions",
        GET_ONE: (id)=> `/api/sessions/${id}`,
        DELETE: (id)=>`/api/sessions/${id}`,
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add",
        PIN: (id)=>`/api/questions/${id}/pin`,
        UPDATE_NOTE: (id)=>`/api/questions/${id}/note`,
    },

};