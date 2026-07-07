import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { LoginFormValues } from "../schemas/authSchema";

import { useRouter, useSearchParams } from "next/navigation";
import { saveSession } from '@/lib/auth/session';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setCredentials } from '@/lib/redux/slices/authSlice';


function useLogin() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();


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
            const returnTo = searchParams.get("returnTo");
            router.push(returnTo || "/timeline");
            
        }

    })
 
}

export default useLogin;