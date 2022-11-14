import graphql from "graphql";

const Category = new graphql.GraphQLObjectType({
    name: 'category',
    fields: {
        id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
    }
})

const CreateCategory = {
    name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
}

const DeleteCategory = {
    id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }
}

export { Category, CreateCategory, DeleteCategory }