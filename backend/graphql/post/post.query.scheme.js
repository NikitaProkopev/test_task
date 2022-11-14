import graphql from "graphql";
import postQueryDbService from "../../services/db/post/post.query.db.service.js";
import {
    GetPostsArgs,
    PostType,
    PostIdArgs, GetPostsPagesCount, FullPost
} from "../../types/post/post.types.js";

export default{
    posts: {
        type: graphql.GraphQLList(PostType),
        args: GetPostsArgs,
        resolve: (root, {page, perPage, orderFieldName, orderTypeName, filter}) => {
            return postQueryDbService.getPosts(page, perPage, orderFieldName, orderTypeName, filter);
        }
    },
    post: {
        type: FullPost,
        args: PostIdArgs,
        resolve: (root, { id }) => {
            return postQueryDbService.getPost(id);
        }
    },
    checkIsIdsExist: {
        type: graphql.GraphQLList(graphql.GraphQLBoolean),
        args: {
            ids: {
                type: graphql.GraphQLList(graphql.GraphQLInt)
            }
        },
        resolve: (root, { ids }) => {
            return postQueryDbService.checkIsIdsExist(ids);
        }
    },
    getPagesCount: {
        type: graphql.GraphQLNonNull(graphql.GraphQLInt),
        args: GetPostsPagesCount,
        resolve: (root, { perPage, filter }) => {
            return postQueryDbService.getPagesCount(perPage, filter)
        }
    }
}