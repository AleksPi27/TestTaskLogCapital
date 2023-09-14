export interface User {
    username: string;
    password: string;
    salt: string;
}

export interface UsernameResponse {
    username: string;
}
