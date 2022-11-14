import graphql from "graphql";

const CreatePostArgs = {
    title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    text: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    img: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    createDate: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    author: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    categories: { type: graphql.GraphQLList(graphql.GraphQLString) }
}

const UpdatePostArgs = {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    ...CreatePostArgs
}

const PostType = new graphql.GraphQLObjectType({
        name: "post",
        fields: {
            id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
            title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            description: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            createDate: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            author: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            categories: { type: graphql.GraphQLString }
        }
});

const FullPost = new graphql.GraphQLObjectType({
        name: "fullPost",
        fields: {
            id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
            title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            text: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            img: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            createDate: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            author: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
            categories: { type: graphql.GraphQLString }
        }
    });

const Filter = new graphql.GraphQLInputObjectType({
    name: 'Filter',
    fields: {
        id: {type: graphql.GraphQLInt},
        title: {type: graphql.GraphQLString},
        description: {type: graphql.GraphQLString},
        createDate: {type: graphql.GraphQLString},
        author: {type: graphql.GraphQLString},
        categories: {type: graphql.GraphQLList(graphql.GraphQLString)}
    }
});

const GetPostsArgs = {
    page: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
    perPage: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
    orderFieldName: { type: graphql.GraphQLString },
    orderTypeName : { type: graphql.GraphQLString },
    filter: { type: Filter }
}

const GetPostsPagesCount = {
    perPage: {
        type: graphql.GraphQLNonNull(graphql.GraphQLInt)
    },
    filter: { type: Filter }
}

const PostIdArgs = {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt), }
}

export { PostType, GetPostsArgs, PostIdArgs, CreatePostArgs, UpdatePostArgs, GetPostsPagesCount, FullPost }