import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { RegisterFormValues } from "../schemas/authSchema";


function useRegister() {    

    return useMutation(
        {
            mutationFn: async (values: RegisterFormValues) => {
                const response = await api.post("/auth/register", values);
                return response.data.data;
            }
        }       
    )
}

export default useRegister;