export enum RoutePrefixes {
    AUTH = "/auth",
    USERS = "/users"
}
export enum AuthRoutes {
    REGISTER = RoutePrefixes.AUTH + "/signup",
    LOGIN = RoutePrefixes.AUTH + "/login",
    LOGOUT = RoutePrefixes.AUTH + "/logout"
}

export const USERS_LIST = RoutePrefixes.USERS + "/list";
