import { GetUserType, UserType } from "../../types/user/user.type.js";
import userQueryDbService from "../../services/db/user/user.query.db.service.js";

export default {
    login: {
        type: UserType,
        args: GetUserType,
        resolve: (root, {login, password}) => {
            return userQueryDbService.login(login, password);
        }
    },
}