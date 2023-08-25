import API from "./api";
import { createConfig } from "./api";

function countTimelinePosts () {
    return API.get("/countTimelinePosts");
}

function getTimelinePosts (token, limit) {
    const config = createConfig(token);
    return API.get(`/timeline?limit=${limit}`, config);
}

function getPostsByUser (id, token) {
    const config = createConfig(token);
    return API.get(`/user/${id}`, config);
}

function getPostsByHashtag (hashtag) {
    return API.get(`/hashtag/${hashtag}`);
}

function getPostsBySearch (query) {
    return API.get(`/timeline/search/?query=${query}`);
}

function getUsersBySearch ({query, userID}) {
    return API.get(`/timeline/search/users/${query},${userID}`);
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
    countTimelinePosts,
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