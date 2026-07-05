"use client"

import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { registerSchema, type RegisterFormValues } from '../schemas/authSchema';

import useRegister  from "../hooks/useRegister";

import Link from 'next/link';


function RegisterForm() {
  
  const form = useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),

      defaultValues: {
        name: "",
        username: "",
        email: '',
        password: '',
      }, 
  });

  const { mutate: register, isPending, isError, error } = useRegister();

  function onSubmit(values: RegisterFormValues) {
      console.log(values);  
      register(values);  
  }


  
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <FieldGroup>
            <Controller name='name' control={form.control} render={
                (
                  { field, fieldState}
                ) =>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <Input {...field} id={field.name} 
                              type="text" aria-invalid={fieldState.invalid}
                              placeholder="Enter your name" />
                        { fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
              }    
            /> 

            <Controller name='username' control={form.control} render={
                (
                  { field, fieldState}
                ) =>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                        <Input {...field} id={field.name} 
                              type="text" aria-invalid={fieldState.invalid}
                              placeholder="Enter your username" />
                        { fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
              }    
            /> 
            <Controller name='email' control={form.control} render={
                (
                  { field, fieldState}
                ) =>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input {...field} id={field.name} 
                              type="email" aria-invalid={fieldState.invalid}
                              placeholder="Enter your email" />  
                          { fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
              }    
            />  

            <Controller name='password' control={form.control} render={
                (
                  { field, fieldState} 
                ) =>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input {...field} id={field.name} 
                              type="password" aria-invalid={fieldState.invalid}
                              placeholder="Enter your password" />
                        { fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
              }   
            />
          </FieldGroup>
          
          {
            isError && (
              <p className="mt-2 text-sm text-red-500">
                Registration Failed. Please try again.
              </p>
            )
          }

          <Button type="submit" className="w-full mt-4 bg-[#6936F2] text-white" disabled={isPending}>
            { isPending ? "Processing..." : "Register"}
          </Button>
      </form>

      <div className="mt-5 flex items-center justify-center gap-2 whitespace-nowrap w-full">
        <p className="text-md"> Already have an account? 
          <Link href="/login"><span className="text-[#6936F2] hover:underline"> Login </span></Link> 
        </p>
      </div>


    </div>

  );
}

export default RegisterForm