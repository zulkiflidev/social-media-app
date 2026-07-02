import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/axios";

import type { LoginFormValues } from "../schemas/authSchema";


function useLogin() {
    return useMutation({
        mutationFn: async (data: LoginFormValues) => {
            const response = await api.post("/auth/login", data);
            return response.data.data;
        }
    })

}

export default useLogin;