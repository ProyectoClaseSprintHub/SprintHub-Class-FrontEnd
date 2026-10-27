import { create } from "zustand";
import { setAuthToken } from "@/services/api/tokenStore";
import { startRealtimeSession, stopRealtimeSession } from "@/services/api/sockets/socketService";
import { login as LoginReques, register as registerRequest } from "../service/authService";
import { clearSession, readSession, saveSession }  from "../service/sessionStorage"
import type { AuthSession, LoginPayload, RegisterPayload } from "../types/auth.types";
export type AuthStatus = 'authenticated' | 'guest';
interface AuthState {
    status: AuthStatus ;
    session: AuthSession | null;

    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => void;
    updateSessionUser: (user: AuthSession['user']) => void;
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
if (storedSession) {
    activateSession(storedSession);
}
export const useAuthStore = create<AuthState>((set) => ({
    status: storedSession ? 'authenticated' : 'guest',
    session: storedSession,

    login: async (payload) => {
        const session = await LoginReques(payload);
        saveSession(session);
        activateSession(session);
        set({ status: 'authenticated', session });
    },

    register: async (payload) => {
        await registerRequest(payload);
    },

    logout: () => {
        clearSession();
        desactivateSession();
        set({ status: 'guest', session: null });
    },

    updateSessionUser: (user) => {
        set((state) => {
            if (!state.session) return state;
            const session: AuthSession = { ...state.session, user };
            saveSession(session);
            return { session };
        });
    }
}))