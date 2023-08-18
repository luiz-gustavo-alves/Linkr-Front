import API from "./api";
import { createConfig } from "./api";

function signUp (payload) { 
    return API.post("/sign-up", payload);
}

function signIn (payload) {
    return API.post("/", payload);
}

function logout (token) {

    const config = createConfig(token);
    return API.post("/logout", config);
}

const authService = {
    signUp,
    signIn,
    logout
}

export default authService;