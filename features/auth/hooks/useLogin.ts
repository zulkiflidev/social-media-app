import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { LoginFormValues } from "../schemas/authSchema";



import { useRouter } from "next/navigation";
import { saveSession } from '@/lib/auth/session';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setCredentials } from '@/lib/redux/slices/authSlice';


function useLogin() {

    const router = useRouter();
    const dispatch = useAppDispatch();

 

    return useMutation({
        mutationFn: async (data: LoginFormValues) => {
            const response = await api.post("/auth/login", data);
            return response.data.data;
        },

        onSuccess: (data) => {
            saveSession(data.token, data.user);
            dispatch( setCredentials({
                token: data.token,
                user: data.user
            }));
            router.push("/feed")
            
        }

    })
 
}

export default useLogin;