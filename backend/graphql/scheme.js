import graphql from 'graphql'
import postQueryScheme from "./post/post.query.scheme.js";
import postMutationSchemeService from "./post/post.mutation.scheme.service.js";
import categoryQueryScheme from "./category/category.query.scheme.js";
import userQueryScheme from "./user/user.query.scheme.js";

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        ...postQueryScheme,
        ...categoryQueryScheme,
        ...userQueryScheme
    }
})

const mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...postMutationSchemeService,
    }
});

const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

export default schema