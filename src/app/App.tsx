import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { onUnauthorized } from "@/services/api/client";
import { useAuthStore } from "@/features/auth";
import { AppProviders } from "./providers/AppProviders";
import AppRoutes from "./router/AppRoute";

function App(){
    useEffect(() =>{
        const unsuscribete = onUnauthorized(()=>{
            useAuthStore.getState().logout();
        });
        return unsuscribete;
    },[]);
    return(
        <AppProviders>
            <BrowserRouter>
            <AppRoutes/>
            </BrowserRouter>
        </AppProviders>
    );
}

export default App;
