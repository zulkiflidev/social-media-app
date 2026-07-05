import React from 'react'

import RegisterForm from '@/features/auth/components/RegisterForm';

import Image from 'next/image'

function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        
        <div className="w-full  md:w-1/3 max-w-sw">

            <div className="flex flex-row gap-2 items-center justify-center mb-6">
              <Image src="/Logo.svg" alt="Logo" width={25} height={25} />              
              <p className="font-bold text-2xl">Sociality</p>
            
            </div>
            <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>
            <RegisterForm />
        </div>
    </div>
  );
}

export default RegisterPage