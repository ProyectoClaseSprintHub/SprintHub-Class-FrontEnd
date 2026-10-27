import { create } from "zustand";
import { setAuthToken } from "@/services/uploads/api/tokenStore";
import { startRealtimeSession, stopRealtimeSession } from "@/services/uploads/api/sockets/socketService";
import { login as LoginRequest, register as registerRequest } from "@/services/authService";
import { clearSession, readSession, saveSession } from "@/services/sessionStorage";
import type { AuthSession, LoginPayLoad, RegisterPayLoad } from "@/services/uploads/api/types/auth.types";

export type AuthStatus = 'authenticated' | 'guest';

interface AuthState {
  status: AuthStatus;
  session: AuthSession | null;

  login: (payload: LoginPayLoad) => Promise<void>;
  register: (payload: RegisterPayLoad) => Promise<void>;
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

if(storedSession){
  activateSession(storedSession);
}

export const useAuthStore = create<AuthState>((set) => ({
  status: storedSession ? 'authenticated' : 'guest',
  session: storedSession,

  login: async (payload) => {
    const session = await LoginRequest(payload);
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
    set({ status : 'guest', session: null });
  },

  updateSessionUser: (user) => {
    set((state) => {
      if (!state.session) return state;
      const session : AuthSession = { ...state.session, user };
      saveSession(session);
      return { session };
    });
  },
}));