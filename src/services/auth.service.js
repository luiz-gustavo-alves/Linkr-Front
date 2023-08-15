import API from "./api";
import { createConfig } from "./api";

function signUp (payload) { 
    return API.post("/sign-up", payload);
}

function signIn (payload) {
    return API.post("/", payload);
}

function logout (payload, token) {

    const config = createConfig(token);
    return API.post("/logout", payload, config);
}

const authService = {
    signUp,
    signIn,
    logout
}

export default authService;