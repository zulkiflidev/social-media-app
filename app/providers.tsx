"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeStore, type AppStore } from "@/lib/redux/store";

import SessionInitializer from "@/features/auth/components/SessionInitializer";




function Providers({ children }: { children: React.ReactNode }){

    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    const queryClientRef = useRef<QueryClient | null>(null);
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient();
    }

    return (

        <Provider store={ storeRef.current }>
            <QueryClientProvider client={ queryClientRef.current }>
                <SessionInitializer />
                {children}

            </QueryClientProvider>
        </Provider>

    );    
}

export default Providers;