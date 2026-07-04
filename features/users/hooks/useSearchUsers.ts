import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

import type { UsersSearchResponse } from  "../types/user";


function useSearchUsers(query: string) {

    return useQuery({

        queryKey: ['users-search', query],
        queryFn: async () => {

            const response = await api.get<{
                data: UsersSearchResponse
            }>("/users/search", {
                params: { q: query }
            });

            return response.data.data;

        },
        enabled: query.trim().length > 0,            

    });


}

export default useSearchUsers;