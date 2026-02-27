"use client";
import React, { ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {registerSchema} from "@/lib/validationSchema/auth.schema";
import {
  AlertCircle,
  ShoppingBag,
  Star,
  Eye,
  EyeOff,
  UserPlus,
  Package,
  Tag,
  User,
  Mail,
  Lock,
  Phone,
  LucideIcon,
} from "lucide-react";
import { signUpUser } from "@/services/auth.services";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
type FormFieldProps = {
  icon?: LucideIcon;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  label: string;
};
function FormField({ icon: Icon, error, optional, children, label }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 flex items-center gap-1.5">
        {Icon && <Icon size={11} className="text-zinc-400" />}
        {label}
        {optional && (
          <span className="text-zinc-400 font-normal normal-case tracking-normal text-[10px] opacity-60">
            (optional)
          </span>
        )}
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

export default function Register() {
  const router = useRouter();
const {
  control,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
    resolver: zodResolver(registerSchema),
    mode:"all",
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    console.log("Form Submitted", data);
    const response = await signUpUser(data);
    console.log("API Response:", response);
    if (response.message ==="success") {
      toast.success("Account created successfully!");
      router.push("/login");
    } else {
      toast.error("Failed to create account. Please try again.");
    }
  };

  const inputClass = (hasError) =>
    `bg-zinc-50 border text-zinc-900 placeholder:text-zinc-400 rounded-lg h-11 px-4 text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-black/8 focus:border-zinc-400 focus-visible:ring-black/8 focus-visible:ring-offset-0 ${
      hasError
        ? "border-red-300 bg-red-50/60 focus:border-red-400"
        : "border-zinc-200 hover:border-zinc-300"
    }`;

  return (
    <>

      <div className="font-dm min-h-screen bg-zinc-100 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl shadow-black/20">

          {/* ── LEFT PANEL ── */}
          <div className="hidden lg:flex flex-col w-105 shrink-0 bg-black relative overflow-hidden">
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Glow orb */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/3 rounded-full blur-3xl" />

            {/* Logo area */}
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
                    Trusted by 2M+ shoppers
                  </span>
                </div>
                <h2 className="font-playfair text-white text-4xl font-black leading-[1.05] tracking-tight mb-4">
                  Shop the World&apos;s
                  <br />
                  <span className="italic text-white/50">Finest</span> Brands.
                </h2>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  Exclusive deals, curated collections, and a seamless checkout experience — all in one place.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: Package, text: "Free shipping on orders over $50" },
                  { icon: Tag, text: "Members-only exclusive discounts" },
                  { icon: Star, text: "Earn points on every purchase" },
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
                {["Free Returns", "Secure Checkout", "24/7 Support", "New Arrivals Daily", "Members Rewards", "Free Returns", "Secure Checkout", "24/7 Support", "New Arrivals Daily", "Members Rewards"].map((t, i) => (
                  <span key={i} className="shrink-0">{t} &nbsp;·&nbsp;</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="flex-1 bg-white flex flex-col justify-center px-10 py-12">

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
                Create Your Account
              </h1>
              <p className="text-zinc-400 text-sm font-light">
                Join millions of happy shoppers today.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormField label="Full Name" icon={User} error={errors.name?.message}>
                    <Input {...field} placeholder="John Doe" className={inputClass(!!errors.name)} />
                  </FormField>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormField label="Email" icon={Mail} error={errors.email?.message}>
                    <Input {...field} type="email" placeholder="you@example.com" className={inputClass(!!errors.email)} />
                  </FormField>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormField label="Password" icon={Lock} error={errors.password?.message}>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 6 chars"
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

                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field }) => (
                    <FormField label="Confirm" icon={Lock} error={errors.rePassword?.message}>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Repeat"
                          className={inputClass(!!errors.rePassword)}
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
              </div>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <FormField label="Phone" icon={Phone} error={errors.phone?.message} optional>
                    <Input {...field} type="tel"placeholder="+20 10 1234 5678" className={inputClass(!!errors.phone)} />
                  </FormField>
                )}
              />

              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:translate-y-0 tracking-wide"
                >
                  {isSubmitting ? <Spinner size={15} /> : null}
                  <UserPlus size={15} />
                  Create Account
                </Button>
              </div>

              <p className="text-center text-xs text-zinc-400 pt-0.5">
                Already have an account?{" "}
                <Link href="/login" className="text-black font-semibold hover:underline transition-colors">
                  Sign in
                </Link>
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