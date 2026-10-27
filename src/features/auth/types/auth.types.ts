export type AuthSession = {
    token: string;
    user: SessionUser;
};

export type SessionUser = {
    id: string;
    name:string;
    email:string;
    profilePicture: string;
};

export type LoginPayLoad = {
    email: string;
    password: string;
};

export type RegisterPayLoad = {
    name: string;
    email: string;
    document: string;
    password: string;
    file?: File | null;
};
