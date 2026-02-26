"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Page() {
  const form = useForm({
    defaultValues: {
      title: "",
    },
  });

  return (
    <main>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Register Page
        </h1>

        <form>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Bug Title
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                />

                <FieldDescription>
                  Provide a concise title for your bug report.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </div>
    </main>
  );
}