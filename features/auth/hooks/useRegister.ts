import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { RegisterFormValues } from "../schemas/authSchema";

import { useRouter } from "next/navigation";

import { saveSession } from "@/lib/auth/session";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/slices/authSlice";



function useRegister() {    

    const router = useRouter();
    const dispatch = useAppDispatch();

    return useMutation(
        {
            mutationFn: async (values: RegisterFormValues) => {
                const response = await api.post("/auth/register", values);
                return response.data.data;
            },

            onSuccess: (data) =>{
                saveSession(data.token, data.user);
                dispatch( setCredentials({
                    token: data.token,
                    user: data.user
                }));
                router.push("/timeline")
            }

        }       
    ) 
}

export default useRegister;