import API from "./api";
import { createConfig } from "./api";

function createPost (payload, token) {
    const config = createConfig(token);
    return API.post("/create-post", payload, config);
}

function updatePost (payload, postID, token) {
    const config = createConfig(token);
    return API.put(`/update-post/${postID}`, payload, config);
}

function deletePost (postID, token) {
    const config = createConfig(token);
    return API.delete(`/delete-post/${postID}`, config);
}

const postService = {
    createPost,
    updatePost,
    deletePost
}

export default postService;