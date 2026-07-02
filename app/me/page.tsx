"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import useMe  from "@/features/profile/hooks/useMe";


export default function MePage()  {


    return (
        <AuthGuard>
            <MeContent />
        </AuthGuard>
    );
}


function MeContent() {

    const { data, isLoading, isError } = useMe();

    if (isLoading) {
        return <div className="p-4">Loading...</div>
    }

    if (isError) {
        return <div className="p-4 text-red-500">Faild to Load Profil...</div>
    }

    return(
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">My Profile</h1>
            <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {data?.name}</p>
                <p><span className="font-medium">USername:</span> {data?.username}</p>
                <p><span className="font-medium">Email:</span> {data?.email}</p>



            </div>


        </div>
    );


}