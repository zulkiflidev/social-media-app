"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/slices/authSlice";
import { getToken, getUser } from "@/lib/auth/session";


export default function SessionInitializer() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getToken();
        const user = getUser();

        if (token && user){
            dispatch(setCredentials({
                token, user
            }))
        }
    }, [dispatch]);

    return null;
}