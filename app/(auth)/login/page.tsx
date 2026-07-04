import React from 'react'
import { Suspense } from "react";
import LoginForm from '@/features/auth/components/LoginForm';


function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-sw">
            <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
            
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm />
            </Suspense>
        </div>
    </div>
  )
}

export default LoginPage