"use client";

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { loginSchema, type LoginFormValues } from '../schemas/authSchema';

function LoginForm() {

  const form = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),

      defaultValues: {
        email: '',
        password: '',
      },

  });

  function onSubmit(values: LoginFormValues) {
      console.log(values);
    
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
          
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
      </form>
    </div>
  )
}

export default LoginForm