"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Mail, Lock, AlertCircle, ShoppingBag,
  Star, Package, Tag, LogIn, ArrowRight,
} from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function FormField({ label, icon: Icon, error, children }) {
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

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    console.log("Login Submitted", data);
  };

  const inputClass = (hasError) =>
    `bg-zinc-50 border text-zinc-900 placeholder:text-zinc-400 rounded-lg h-11 px-4 text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-black/8 focus:border-zinc-400 focus-visible:ring-black/8 focus-visible:ring-offset-0 ${
      hasError
        ? "border-red-300 bg-red-50/60 focus:border-red-400"
        : "border-zinc-200 hover:border-zinc-300"
    }`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        .marquee-track {
          display: flex;
          gap: 2rem;
          animation: marquee 18s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div className="font-dm min-h-screen bg-zinc-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl shadow-black/20">

          {/* ── LEFT PANEL ── */}
          <div className="hidden lg:flex flex-col w-100 shrink-0 bg-black relative overflow-hidden">
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Glow orbs */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/3 rounded-full blur-3xl" />

            {/* Logo */}
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

            {/* Main copy */}
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

              {/* Feature pills */}
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

            {/* Bottom marquee */}
            <div className="relative z-10 border-t border-white/10 py-3 overflow-hidden">
              <div className="marquee-track text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase">
                {["Free Returns", "Secure Checkout", "24/7 Support", "New Arrivals Daily", "Members Rewards",
                  "Free Returns", "Secure Checkout", "24/7 Support", "New Arrivals Daily", "Members Rewards"].map((t, i) => (
                  <span key={i} className="shrink-0">{t} &nbsp;·&nbsp;</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="flex-1 bg-white flex flex-col justify-center px-10 py-14">

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2.5 mb-8">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
                <ShoppingBag size={17} className="text-white" />
              </div>
              <p className="font-playfair text-black text-lg font-black tracking-tight">ShopMart</p>
            </div>

            {/* Heading */}
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
                    <Input
                      {...field}
                      type="password"
                      placeholder="Your password"
                      className={inputClass(!!errors.password)}
                    />
                  </FormField>
                )}
              />

              {/* Forgot password */}
              <div className="flex justify-end -mt-1">
                <a
                  href="#"
                  className="text-[11px] text-zinc-400 hover:text-black font-medium transition-colors tracking-wide"
                >
                  Forgot password?
                </a>
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:translate-y-0 tracking-wide"
                >
                  <LogIn size={15} />
                  Sign In
                </Button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-zinc-100" />
                <span className="text-[10px] text-zinc-300 font-medium tracking-widest uppercase">or</span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>

              {/* Register CTA */}
              <a
                href="#"
                className="w-full h-11 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 tracking-wide"
              >
                Create a new account
                <ArrowRight size={14} />
              </a>

              <p className="text-center text-[11px] text-zinc-300 pt-1 leading-relaxed">
                By signing in, you agree to our{" "}
                <a href="#" className="text-zinc-400 hover:text-black transition-colors">Terms</a>
                {" & "}
                <a href="#" className="text-zinc-400 hover:text-black transition-colors">Privacy Policy</a>.
              </p>
            </form>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-center gap-6">
              {["SSL Secured", "Privacy Protected", "No Spam"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <span className="text-[10px] text-zinc-400 font-medium tracking-wide">{t}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}