import { z } from 'zod';
import { apiClient } from '@/services/api/client';
import { errorHandler } from '@/services/api/errors/errorHandler';
import { authSessionSchema } from '../schemas/sessionSchema';
import type { AuthSession, LoginPayload, RegisterPayload } from '../types/auth.types';

const loginResponseSchema = authSessionSchema;

const registerResponseSchema = z.object({
  message: z.string(),
});

export async function login(payLoad: LoginPayload): Promise<AuthSession>{
  try{
    const response = await apiClient.post<unknown>('/auth/login', payLoad);
    const result = loginResponseSchema.safeParse(response.data);
    if(!result.success){
      throw errorHandler(
        new z.ZodError(result.error.issues),
      );
    }
    return result.data;

  }catch (error:unknown) {
    throw errorHandler(error);
  }
}

export async function register(payLoad: RegisterPayload): Promise<string>{
  try{
    const body : FormData | Record<string, string> = payLoad.file
    ? buildRegisterForm(payLoad)
    : {
      name: payLoad.name,
      email: payLoad.email,
      document: payLoad.document,
      password: payLoad.password,
    };
    const response = await apiClient.post<unknown>('auth/register', body);
    const result = registerResponseSchema.safeParse(response.data);
    if(!result.success){
      throw errorHandler(new z.ZodError(result.error.issues));
    }
    return result.data.message;

  }catch (error: unknown){
    throw errorHandler(error);
  }
}

function buildRegisterForm(payLoad: RegisterPayload): FormData{
  const form = new FormData();
  form.append('name', payLoad.name); 
  form.append('email', payLoad.email); 
  form.append('document', payLoad.document); 
  form.append('password', payLoad.password);
  if(payLoad.file){
    form.append("file", payLoad.file);
  } 
  return form;
}



