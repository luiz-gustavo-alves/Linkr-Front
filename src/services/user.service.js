import API from "./api";
import { createConfig } from "./api";

function getPosts () {
    return API.get("/timeline");
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

const userService = {
    getPosts,
    getPostsByUser,
    getPostsByHashtag,
    getPostsBySearch
}

export default userService;