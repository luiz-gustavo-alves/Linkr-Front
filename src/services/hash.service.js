import API from "./api";
import { createConfig } from "./api";

function hashtagsList () {
    return API.get(`/hashtags`);
}

function hashtagPosts (name, token) {
    const config = createConfig(token);
    const encodedName = encodeURIComponent("#"+name);
    return API.get(`/hashtags/${encodedName}`, config);
}

const hashService = {
    hashtagsList,
    hashtagPosts
}

export default hashService;