import graphql from "graphql";
import categoryQueryDbService from "../../services/db/category/category.query.db.service.js";
import { Category } from "../../types/categories/category.types.js";

export default {
    categories: {
        type: graphql.GraphQLList(Category),
        args: {
            name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
            notInclude: { type: graphql.GraphQLNonNull(graphql.GraphQLList(graphql.GraphQLString))}
        },
        resolve: (root, { name, notInclude }) => {
            return categoryQueryDbService.getCategories(name, notInclude);
        }
    },
}