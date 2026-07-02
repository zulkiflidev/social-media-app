"use client"

import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { registerSchema, type RegisterFormValues } from '../schemas/authSchema';

import useRegister  from "../hooks/useRegister";


function RegisterForm() {
  
  const form = useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),

      defaultValues: {
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
            <Controller name='username' control={form.control} render={
                (
                  { field, fieldState}
                ) =>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                        <Input {...field} id={field.name} 
                              type="text" aria-invalid={fieldState.invalid}
                              placeholder="John Doe" />
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
                              placeholder="you@example.com" />  
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
                              placeholder="••••••••" />
                        { fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )
              }   
            />
          </FieldGroup>
          
          {
            isError && (
              <p className="mt-2 text-sm text-red-500">
                Registration Faield. Please try again.
              </p>
            )
          }

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            { isPending ? "Processing..." : "Register"}
          </Button>
      </form>
    </div>

  );
}

export default RegisterForm