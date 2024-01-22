type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    token?: string;
    refreshToken?: string;
}

export default User