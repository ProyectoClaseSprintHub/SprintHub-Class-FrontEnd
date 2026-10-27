import { AuthFormLayout } from "../components/AuthFormLayout";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage(){
    return(
        <AuthFormLayout
          title="Crea tu cuenta"
          description="Registrate para organizar el trabajo de tus equipos con tableros en tiempo real."
          >
            <RegisterForm />
          </AuthFormLayout>
    );
}
