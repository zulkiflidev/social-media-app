import React from 'react'
import { Suspense } from "react";
import LoginForm from '@/features/auth/components/LoginForm';

import Image from 'next/image'

import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bgImage from '@/public/Gradient.png';


function LoginPage() {
  return (
     

      <div className="flex min-h-screen items-center justify-center p-4">


          <Image
                  src={bgImage}
                  alt="Background Image"
                  placeholder="blur" 
                  quality={100}       
                  fill                
                  sizes="100vw"       
                  className="object-cover -z-10" 
          />


         <div className="w-full md:w-1/3 max-w-sw">

            <div className="flex flex-row gap-2 items-center justify-center mb-6">
              <Image src="/Logo.svg" alt="Logo" width={25} height={25} />              
              <p className="font-bold text-2xl">Sociality</p>
            
            </div>

            {/* <div>
              <h2 className="font-bold">Welcome Back!</h2>
            </div> */}

             <h1 className="mb-6 text-2xl font-bold text-center">Welcome Back!</h1>
            
             <Suspense fallback={<div>Loading...</div>}>
               <LoginForm />
             </Suspense>
         </div>
      </div>
  
  

   
  )
}

export default LoginPage