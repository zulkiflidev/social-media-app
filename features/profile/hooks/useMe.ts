import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

function useMe() {

    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const response = await api.get("/me");
            return response.data.data;
        
        }
    });
}

export default useMe;