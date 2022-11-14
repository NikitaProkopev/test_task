import graphql from "graphql";

const GetUserType = {
    login: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    password: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
}

const UserType = new graphql.GraphQLObjectType({
    name: "user",
    fields: GetUserType
});

export { UserType, GetUserType }