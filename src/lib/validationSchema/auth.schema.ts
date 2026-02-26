import * as z from 'zod';

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required").min(2, "Name must be at least 2 characters").max(20, "Name must be at most 20 characters"),
    email: z.string().nonempty("Email is required").email({error:{message:"Please enter a valid email address"}}),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters").regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, "Password must contain at least one letter and one number"),
    rePassword: z.string().nonempty("Please confirm your password").min(6, "Password must be at least 6 characters"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number").optional(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });