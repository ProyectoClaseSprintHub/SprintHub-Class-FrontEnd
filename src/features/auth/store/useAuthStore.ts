import { create } from "zustand";
import { setAuthToken } from "@/services/api/tokenStore";
import { startRealtimeSession, stopRealtimeSession } from "@/services/api/sockets/socketService";
import { login as LoginReques, register as registerRequest } from '../services/authService';
import { clearSession, readSession, saveSession } from "../services/sessionStorage";
import type { AuthSession, LoginPayLoad, RegisterPayLoad } from "../types/auth.types";

export type AuthStatus = ' authenticated' | 'guest';

interface AuthStatus{
    status: AuthStatus;
    session: AuthSession | null;

    login: (payLoad: LoginPayLoad) => Promise<void>;
    register: (payLoad: RegisterPayLoad) => Promise<void>;
    logout: () => void;
    updateSessionUser: ( user: AuthSession['user']) => void;
}

function activateSession(session: AuthSession): void {
    setAuthToken(session.token);
    startRealtimeSession(session.token);
}

function desactivateSession(): void {
    setAuthToken(null);
    stopRealtimeSession();
}

const storedSession = readSession();

if(storedSession){
    activateSession(storedSession);
}
export const useAuthStore = create<AuthState> ((set) => ({
    status: storedSession ? 'authenticated' : 'guest',
    session: storedSession,

    login: async (payLoad) => {
        const session = await loginRequest(payLoad);
        saveSession(session);
        activateSession(session);
        set({ status: 'authenticated', session});
    },

    register: async (payLoad) => {
        await registerRequest(payLoad);
    },

    logout: () => {
        clearSession();
        desactivateSession();
        set({status: 'guest', session: null});
    },

    updateSessionUser: (user) => {
        set((state) => {
            if(!state.session) return state;
            const session : AuthSession = { ...state.session, user};
            saveSession(session);
            return { session };
        });
    }
}))