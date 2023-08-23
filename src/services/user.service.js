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

function postLike (query) {
    return API.post('/post/like', query);
}

function postFollow (token, id) {
    const body = {follower: id}
    const config = createConfig(token);
    return API.post('/follow', body, config);
}

function checkFollow (token, id) {
    console.log("AQUI ESTOU EU")
    const config = createConfig(token);
    return API.get(`/follow/${id}`, config);
}

const userService = {
    getTimelinePosts,
    getPostsByUser,
    getPostsByHashtag,
    getPostsBySearch,
    getUsersBySearch,
    postLike,
    postFollow,
    checkFollow
}

export default userService;