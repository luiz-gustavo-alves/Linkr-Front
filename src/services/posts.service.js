import API from "./api";
import { createConfig } from "./api";

function createPost (payload, token) {

    const config = createConfig(token);
    return API.post("/create-post", payload, config);
}

function updatePost (payload, token) {

    const config = createConfig(token);
    return API.put("/update-post", payload, config);
}

function deletePost (payload, token) {

    const config = createConfig(token);
    return API.delete("/delete-post", payload, config);
}

const postService = {
    createPost,
    updatePost,
    deletePost
}

export default postService;