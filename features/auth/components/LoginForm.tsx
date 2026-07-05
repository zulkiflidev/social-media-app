"use client";

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { loginSchema, type LoginFormValues } from '../schemas/authSchema';

import useLogin  from "../hooks/useLogin";

import Link from 'next/link';



function LoginForm() {

  const form = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
    
      defaultValues: {
        email: '',
        password: '',
      },

  });

  const { mutate: login, isPending, isError, error } = useLogin();

  function onSubmit(values: LoginFormValues) {
      console.log(values);
      login(values);
    
  }


  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <FieldGroup>
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
                Login Faield. Please try again.
              </p>
            )
          }
          
          <Button type="submit" className="w-full mt-4 bg-[#6936F2] text-white" disabled={isPending}>
            { isPending ? "Processing..." : "Login"}
          </Button>          
      </form>

      <div className="mt-5 flex items-center justify-center gap-2 whitespace-nowrap w-full">
        <p className="text-md"> Don't have an account? 
          <Link href="/register"><span className="text-[#6936F2] hover:underline"> Register </span></Link> 
        </p>
      </div>

    </div>
  )
}

export default LoginForm