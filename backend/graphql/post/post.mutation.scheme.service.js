import graphql from "graphql";
import {CreatePostArgs, PostIdArgs, UpdatePostArgs} from "../../types/post/post.types.js";
import postMutationDbService from "../../services/db/post/post.mutation.db.service.js";

export default {
    createPost: {
        type: graphql.GraphQLString,
        args: CreatePostArgs,
        resolve: (root, {
            title,
            text,
            img,
            createDate,
            author,
            categories
        }) => {
            return postMutationDbService.createPost(title, text, img, createDate, author, categories);
        }
    },
    updatePost: {
        type: graphql.GraphQLString,
        args: UpdatePostArgs,
        resolve: (root, {
            id,
            title,
            text,
            img,
            createDate,
            author,
            categories
        }) => {
            return postMutationDbService.updatePost(id, title, text, img, createDate, author, categories);
        }
    },
    deletePost: {
        type: graphql.GraphQLString,
        args: PostIdArgs,
        resolve: (root, { id }) => {
            return postMutationDbService.deletePost(id)
        }
    }
};

