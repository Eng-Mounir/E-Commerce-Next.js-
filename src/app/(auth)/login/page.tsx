"use client";

import React, { ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  AlertCircle,
  ShoppingBag,
  Star,
  Package,
  Tag,
  LogIn,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { loginSchema } from "@/lib/validationSchema/auth.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

/* ================= TYPES ================= */
type LoginFormData = z.infer<typeof loginSchema>;

type FormFieldProps = {
  label: string;
  icon?: LucideIcon;
  error?: string;
  children: ReactNode;
};

/* ================= REUSABLE FIELD ================= */
function FormField({ label, icon: Icon, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 flex items-center gap-1.5">
        {Icon && <Icon size={11} className="text-zinc-400" />}
        {label}
      </Label>

      {children}

      {error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1.5 font-medium">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

/* ================= LOGIN PAGE ================= */
export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    
    console.log(result);
    if (result?.ok) {
      toast.success("Welcome back!");
      router.push("/");
    } else {
      toast.error(result?.error || "Invalid credentials.");
    }
  };

  const inputClass = (hasError: boolean) =>
    `bg-zinc-50 border text-zinc-900 placeholder:text-zinc-400 rounded-lg h-11 px-4 text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-black/8 focus:border-zinc-400 focus-visible:ring-black/8 focus-visible:ring-offset-0 ${
      hasError
        ? "border-red-300 bg-red-50/60 focus:border-red-400"
        : "border-zinc-200 hover:border-zinc-300"
    }`;

  return (
    <div className="font-dm min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl shadow-black/20">

        {/* ── LEFT PANEL ── */}
        <div className="hidden lg:flex flex-col w-100 shrink-0 bg-black relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/3 rounded-full blur-3xl" />

          <div className="relative z-10 px-10 pt-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag size={20} className="text-black" />
              </div>
              <div>
                <p className="font-playfair text-white text-xl font-black tracking-tight leading-none">
                  ShopMart
                </p>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-medium">
                  Premium Commerce
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 px-10 mt-auto mb-10">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-5">
                <Star size={10} className="text-white/60 fill-white/40" />
                <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-semibold">
                  Welcome back
                </span>
              </div>

              <h2 className="font-playfair text-white text-4xl font-black leading-[1.05] tracking-tight mb-4">
                Good to See
                <br />
                <span className="italic text-white/50">You Again.</span>
              </h2>

              <p className="text-white/40 text-sm leading-relaxed font-light">
                Sign in to access your orders, saved items, and exclusive member deals.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { icon: Package, text: "Track your orders in real-time" },
                { icon: Tag, text: "Unlock members-only discounts" },
                { icon: Star, text: "View your rewards & points" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={12} className="text-white/60" />
                  </div>
                  <span className="text-white/50 text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 bg-white flex flex-col justify-center px-10 py-14">

          <div className="mb-8">
            <h1 className="font-playfair text-3xl font-black text-black tracking-tight leading-tight mb-1">
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-sm font-light">
              Sign in to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormField label="Email Address" icon={Mail} error={errors.email?.message}>
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass(!!errors.email)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormField label="Password" icon={Lock} error={errors.password?.message}>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      className={inputClass(!!errors.password)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormField>
              )}
            />

            <div className="flex justify-end -mt-1">
              <Link
                href="#"
                className="text-[11px] text-zinc-400 hover:text-black font-medium transition-colors tracking-wide"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:translate-y-0 tracking-wide"
            >
              {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <LogIn size={15} />}
              Sign In
            </Button>

            <div className="relative flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-zinc-100" />
              <span className="text-[10px] text-zinc-300 font-medium tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>

            <Link
              href="/register"
              className="w-full h-11 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 tracking-wide"
            >
              Create a new account
              <ArrowRight size={14} />
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}
