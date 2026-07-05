import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type {  PublicProfile } from  "../types/profile";



function usePublicProfile(username: string){


    return useQuery({

        queryKey: ['profile', username],
        queryFn: async () => {

            const response = await api.get<{ data: PublicProfile }>(`/users/${username}`);
            return response.data.data;

        },
        enabled: !!username,


    });

}

export default usePublicProfile;