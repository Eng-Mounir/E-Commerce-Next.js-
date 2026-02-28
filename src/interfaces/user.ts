export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown; // Allow additional properties
}
