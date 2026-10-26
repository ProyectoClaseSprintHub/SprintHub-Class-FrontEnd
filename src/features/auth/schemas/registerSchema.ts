import {z} from 'zod';

export const registerSchema= z.object({
    name:z.string().min(2,{error:'El nombre debe tener al menos dos caracteres'}).max(100,{error:'E l nombre no deb superar los 100 caracteres'}),
    document:z.string().min(5,{error:'El documento debe tener al menos dos caracteres'}),
    password:z.string().min(6,{error:'La contraseña debe tener al menos caracteres'}),
});

export type RegisterFormData= z.infer<typeof registerSchema>;