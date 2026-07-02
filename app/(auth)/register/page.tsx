import React from 'react'

import RegisterForm from '@/features/auth/components/RegisterForm';



function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        
        <div className="w-full max-w-sw">
            <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>
            <RegisterForm />
        </div>
    </div>
  );
}

export default RegisterPage