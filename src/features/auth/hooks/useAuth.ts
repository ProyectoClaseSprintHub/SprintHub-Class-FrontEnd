import { useAuthStore } from "../store/useAuthStore";
export function useAuth() {
    const status = useAuthStore(state => state.status);
    const session = useAuthStore(state => state.session);
    const login = useAuthStore(state => state.login);
    const register = useAuthStore(state => state.register);
    const logout = useAuthStore(state => state.logout);
    const updateSessionUser = useAuthStore(state => state.updateSessionUser);

    const isAuthenticated = status === 'authenticated';

    return{
        user: session?.user ?? null,
        isAuthenticated,
        login,
        register,
        logout,
        updateSessionUser
    };
}