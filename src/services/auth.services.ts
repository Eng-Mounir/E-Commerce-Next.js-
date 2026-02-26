import { registerSchema } from "@/lib/validationSchema/auth.schema";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export async function signUpUser(formdata: registerSchema) {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {    'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Signed up user:', data);
    return data;
  } catch (error) {
    console.error('Error signing up user:', error);
    return { data: [] };
  }
}