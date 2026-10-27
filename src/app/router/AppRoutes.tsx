import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import { LoginPage, RegisterPage } from "@/features/auth";
import { HomePage } from "@/features/home";
import { DashboardPage } from "@/features/dashboard";
import { ProfilePage } from "@/features/profile";

function AppRoutes() {
    return(
        <Routes>
            <Route element={<PublicRoute />}>

            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<HomePage/>}/>

            </Route>

            <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            </Route>

            <Route path="*" element={<div>404</div>} />

        </Routes>
    );
}

export default AppRoutes;