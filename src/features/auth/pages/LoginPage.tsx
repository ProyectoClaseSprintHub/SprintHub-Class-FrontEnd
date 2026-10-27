import { AuthFormLayout } from "../components/AuthFormLayout";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
    return(
        <AuthFormLayout
        title= "Inicia Sesion"
        description="Accede a tus espacios de trabajo, tableros y tarjetas de sprinthub"
        >
            <LoginForm />
        </AuthFormLayout>
    );
}