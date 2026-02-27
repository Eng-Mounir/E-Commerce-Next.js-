import { z } from "zod";
import {
  registerSchema,
  loginSchema,
} from "@/lib/validationSchema/auth.schema";

export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;

const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL;

export async function signUpUser(
  formdata: RegisterPayload
) {
  try {
    const response = await fetch(`${API_URL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Signed up user:", data);
    
    return data;

  } catch (error) {
    console.error("Error signing up user:", error);
    return {
      success: false,
      message: "Request failed",
    };
  }
}


export async function signInUser(formdata: LoginPayload) {
  try {
    console.log("API_URL:", API_URL);
    const response = await fetch(`${API_URL}auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });

    const data = await response.json(); // always parse response
    console.log("API response:", data);
    console.log("API_URL:", API_URL);
    return { status: response.status, data };
    
  } catch (error) {
    
    console.error("Error signing in user:", error);
    return { status: 500, data: { success: false, message: "Request failed" } };
  }
}