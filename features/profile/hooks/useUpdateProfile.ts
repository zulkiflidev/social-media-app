import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api/axios";

interface UpdateProfileParams {
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: File;


}

function useUpdateProfile() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async (params: UpdateProfileParams) => {

            const formData = new FormData();
            
            formData.append("name", params.name);
            formData.append("username", params.username);
            formData.append("email", params.email);
            formData.append("phone", params.phone);
            formData.append("bio", params.bio);

            if (params.avatar) {
                formData.append("avatar", params.avatar);

            }

            const response = await api.patch("/me", formData, {
                    headers: { "Content-Type": undefined },

                });
            
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(
                { 
                    queryKey: ["me"] 

                }
            );

            router.push("/profile");
        
        },


    });
}

export default useUpdateProfile;