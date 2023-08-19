import API from "./api";
import { createConfig } from "./api";

function hashtagsList () {
    return API.get(`/hashtags`);
}

function hashtagPosts (name) {
    const encodedName = encodeURIComponent("#"+name);
    return API.get(`/hashtags/${encodedName}`);
}

const hashService = {
    hashtagsList,
    hashtagPosts
}

export default hashService;