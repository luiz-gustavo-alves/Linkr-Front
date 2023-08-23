import API from "./api";
import { createConfig } from "./api";

function countTimelinePosts () {
    return API.get("/countTimelinePosts");
}

function getTimelinePosts (token, limit) {
    const config = createConfig(token);
    return API.get(`/timeline?limit=${limit}`, config);
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

function postLike (query) {
    return API.post('/post/like', query);
}

const userService = {
    countTimelinePosts,
    getTimelinePosts,
    getPostsByUser,
    getPostsByHashtag,
    getPostsBySearch,
    getUsersBySearch,
    postLike
}

export default userService;