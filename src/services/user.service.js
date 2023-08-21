import API from "./api";
import { createConfig } from "./api";

function getTimelinePosts (token) {
    const config = createConfig(token);
    return API.get("/timeline", config);
}

function getPostsByUser (id) {
    return API.get(`/user/${id}`);
}

function getPostsByHashtag (hashtag) {
    return API.get(`/hashtag/${hashtag}`);
}

function getPostsBySearch (query) {
    return API.get(`/timeline/search/?query=${query}`);
}

function getUsersBySearch (query) {
    return API.get(`/timeline/search/users/${query}`);
}

const userService = {
    getTimelinePosts,
    getPostsByUser,
    getPostsByHashtag,
    getPostsBySearch,
    getUsersBySearch
}

export default userService;