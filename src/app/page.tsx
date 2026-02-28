"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingBag, ArrowRight, LayoutGrid, Truck, Star,
  ShieldCheck, Zap, TrendingUp, Award,
  Headphones, Watch, Shirt, Laptop, Sparkles, ChevronRight, RotateCcw, Phone,
  Quote
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleShopNow = () => {
    router.push('/products');
  };

  const categories = [
    { icon: Laptop,      label: "Electronics",  count: "1.2k items",  bg: "bg-zinc-950", text: "text-white",         sub: "text-white/40" },
    { icon: Shirt,       label: "Fashion",       count: "3.4k items",  bg: "bg-white",    text: "text-zinc-900",     sub: "text-zinc-400" },
    { icon: Watch,       label: "Accessories",   count: "890 items",   bg: "bg-zinc-100", text: "text-zinc-900",     sub: "text-zinc-400" },
    { icon: Headphones,  label: "Audio",         count: "540 items",   bg: "bg-zinc-950", text: "text-white",         sub: "text-white/40" },
  ];

  const testimonials = [
    { name: "Sarah K.",    role: "Verified Buyer",  text: "The quality is unmatched. My order arrived next day, perfectly packaged. ShopMart is my only stop now.", stars: 5 },
    { name: "Marcus T.",   role: "Member since 2023", text: "I've saved over $400 this year just from member discounts. The flash sales are absolutely insane.", stars: 5 },
    { name: "Priya M.",    role: "Fashion Lover",   text: "Curated selection is *chef's kiss*. They carry brands I couldn't find anywhere else locally.", stars: 5 },
  ];

  // Define feature items for the dark card
  const featureItems = [
    { icon: Truck, label: "Free Ship" },
    { icon: ShieldCheck, label: "Secure" },
    { icon: Award, label: "Premium" }
  ];

  return (
    <>
      <div className="dm min-h-screen bg-white overflow-x-hidden">

        {/* ═══════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════ */}
        <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">

          {/* Dot grid */}
          <div className="af pointer-events-none absolute inset-0"
            style={{ backgroundImage:"radial-gradient(circle at 1px 1px,#ddd 1px,transparent 0)", backgroundSize:"28px 28px", opacity:.6 }} />

          {/* Gradient wash */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white via-white to-zinc-50 opacity-80" />

          {/* Black diagonal slab */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-[56vw] h-[70vh] bg-zinc-950 diagonal">
            <div className="absolute inset-0 diagonal opacity-[.06]"
              style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
          </div>

          {/* Spinning SVG badge */}
          <div className="pointer-events-none hidden lg:block absolute top-8 right-[21%] z-20">
            <div className="relative w-20 h-20">
              <svg className="sp w-full h-full" viewBox="0 0 80 80">
                <defs><path id="cp" d="M40,40 m-27,0 a27,27 0 1,1 54,0 a27,27 0 1,1 -54,0"/></defs>
                <text fontSize="8" fontWeight="700" letterSpacing="3.2" fill="#fff" opacity=".4" fontFamily="DM Sans,sans-serif">
                  <textPath href="#cp">NEW ARRIVALS · SHOP NOW · FREE SHIP ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Star size={14} className="fill-black text-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating product card */}
          <div className="fa pointer-events-none hidden xl:flex absolute top-20 right-[6%] z-10 flex-col gap-1 bg-white rounded-2xl shadow-2xl p-4 w-44 border border-zinc-100">
            <div className="w-full h-24 prod-img rounded-xl mb-2 flex items-center justify-center">
              <Headphones size={30} className="text-zinc-300" />
            </div>
            <p className="text-[11px] font-bold text-zinc-800 leading-tight">Pro Headphones</p>
            <p className="text-[10px] text-zinc-400">New Season Drop</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-black text-black">$299</span>
              <div className="flex items-center gap-0.5">
                <Star size={9} className="fill-amber-400 text-amber-400" />
                <span className="text-[9px] text-zinc-400">4.9</span>
              </div>
            </div>
          </div>

          {/* Floating flash sale pill */}
          <div className="fb pointer-events-none hidden xl:flex absolute bottom-32 right-[10%] z-10 items-center gap-3 bg-white rounded-2xl shadow-xl px-4 py-3 border border-zinc-100">
            <div className="w-9 h-9 bg-zinc-950 rounded-xl flex items-center justify-center shrink-0">
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-zinc-800">Flash Sale</p>
              <p className="text-[10px] text-zinc-400">Up to 60% off today</p>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-12 items-center py-20">

            {/* Left */}
            <div className="flex flex-col items-start">
              {/* Eyebrow */}
              <div className="a1 flex items-center gap-2.5 mb-6">
                <div className="flex items-center gap-1.5 bg-zinc-950 text-white rounded-full px-4 py-2">
                  <TrendingUp size={11} className="text-zinc-300" />
                  <span className="text-[10px] font-bold tracking-[.18em] uppercase text-zinc-300">#1 Premium Commerce</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-100 rounded-full px-3 py-2">
                  <span className="pulse-dot w-2 h-2 rounded-full bg-green-500 block" />
                  <span className="text-[10px] font-semibold text-zinc-500 tracking-wide">Live now</span>
                </div>
              </div>

              {/* Heading */}
              <div className="a2 mb-6">
                <h1 className="cg text-[clamp(3.8rem,6.5vw,6.4rem)] font-bold text-black leading-[.95] tracking-tight">
                  Welcome<br />
                  <span className="italic text-zinc-400">to</span><br />
                  Shop<span className="italic text-zinc-400">Mart</span><span className="text-zinc-200">.</span>
                </h1>
              </div>

              {/* Rule + description */}
              <div className="a3 flex items-start gap-4 mb-8 max-w-md">
                <div className="w-px h-14 bg-zinc-200 shrink-0 mt-1" />
                <p className="text-zinc-500 text-[15px] leading-relaxed font-light">
                  Discover the latest technology, fashion, and lifestyle products.
                  Quality guaranteed with fast shipping and excellent customer service.
                </p>
              </div>

              {/* Buttons */}
              <div className="a4 flex flex-wrap items-center gap-3 mb-10">
                <Button onClick={handleShopNow}
                  className="lift h-12 px-8 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-[13px] rounded-2xl gap-2.5 tracking-wide border-0">
                  <ShoppingBag size={15} />Shop Now
                </Button>
                <Button variant="outline"
                  className="lift h-12 px-8 border border-zinc-200 hover:border-zinc-900 bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-[13px] rounded-2xl gap-2.5 tracking-wide">
                  <LayoutGrid size={15} />Browse Categories<ArrowRight size={13} className="text-zinc-400" />
                </Button>
              </div>

              {/* Stats */}
              <div className="a5 flex items-center gap-7 flex-wrap">
                {[["2M+","Shoppers"],["50k+","Reviews"],["99%","Satisfaction"]].map(([v,l],i)=>(
                  <div key={l} className="flex items-center gap-4">
                    {i>0 && <div className="w-px h-8 bg-zinc-200"/>}
                    <div>
                      <p className="cg text-2xl font-bold text-black leading-none">{v}</p>
                      <p className="text-[10px] text-zinc-400 font-semibold tracking-widest uppercase mt-0.5">{l}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right cards */}
            <div className="aR hidden lg:flex flex-col gap-4 items-end">
              {/* Dark feature card */}
              <div className="w-full max-w-sm bg-zinc-950 rounded-3xl p-7 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[.06] rounded-3xl"
                  style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"18px 18px" }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <ShoppingBag size={20} className="text-black" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[.2em] uppercase text-white/25">ShopMart</span>
                  </div>
                  <p className="cg text-3xl font-bold text-white leading-tight mb-1">
                    Shop the World's<br /><span className="italic text-white/40">Finest</span> Brands.
                  </p>
                  <p className="text-white/30 text-xs leading-relaxed mt-3">
                    Curated collections from premium labels, delivered to your door in 24 hours.
                  </p>
                  <div className="mt-6 flex items-center gap-2.5 flex-wrap">
                    {featureItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-1.5 bg-white/8 rounded-xl px-3 py-2">
                          <Icon size={11} className="text-white/50" />
                          <span className="text-[9px] text-white/40 font-bold tracking-wide uppercase">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Two mini cards */}
              <div className="flex gap-4 w-full max-w-sm">
                <div className="flex-1 bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={13} className="text-zinc-600" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Trending</span>
                  </div>
                  <p className="cg text-xl font-bold text-black">12k+ items</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Added this week</p>
                </div>
                <div className="flex-1 bg-zinc-950 rounded-2xl p-4 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                      <Zap size={13} className="text-white/70" />
                    </div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Flash</span>
                  </div>
                  <p className="cg text-xl font-bold text-white">Up to 60%</p>
                  <p className="text-[10px] text-white/30 mt-0.5">Off today only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee strip */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-950 py-3 overflow-hidden">
            <div className="mq flex gap-0 whitespace-nowrap text-white/25 text-[10px] font-bold tracking-[.22em] uppercase">
              {Array(12).fill(["Free Returns","Secure Checkout","24/7 Support","New Arrivals Daily","Members Rewards"]).flat().map((t,i)=>(
                <span key={i} className="shrink-0 px-4">{t} &nbsp;·&nbsp;</span>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════
            CATEGORIES SECTION
        ═══════════════════════════════════════ */}
        <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-divider mb-4" />
              <p className="text-[11px] font-bold tracking-[.2em] uppercase text-zinc-400 mb-2">Explore</p>
              <h2 className="cg text-5xl font-bold text-black leading-tight">Shop by<br /><span className="italic text-zinc-400">Category</span></h2>
            </div>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-black font-semibold text-sm">
              All Categories <ChevronRight size={15} />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(({icon:Icon,label,count,bg,text,sub})=>(
              <div key={label}
                className={`cat-hover cursor-pointer ${bg} rounded-3xl p-6 aspect-square flex flex-col justify-between shadow-sm border border-zinc-100`}>
                <div className={`w-12 h-12 ${bg==="bg-zinc-950"?"bg-white/10":"bg-zinc-200/60"} rounded-2xl flex items-center justify-center`}>
                  <Icon size={22} className={bg==="bg-zinc-950"?"text-white/80":"text-zinc-700"} />
                </div>
                <div>
                  <p className={`cg text-2xl font-bold ${text} leading-tight mb-1`}>{label}</p>
                  <p className={`text-xs font-medium ${sub}`}>{count}</p>
                  <div className={`mt-3 flex items-center gap-1 ${bg==="bg-zinc-950"?"text-white/40":"text-zinc-400"} text-xs font-semibold`}>
                    Shop now <ArrowRight size={11}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>




        {/* ═══════════════════════════════════════
            BANNER / PROMO STRIP
        ═══════════════════════════════════════ */}
        <section className="bg-zinc-950 py-20 px-6 lg:px-16 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"28px 28px"}} />
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-white/50"/>
                <span className="text-[11px] font-bold tracking-[.2em] uppercase text-white/40">Limited Time</span>
              </div>
              <h2 className="cg text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Flash Sale.<br /><span className="italic text-white/30">Up to 60% Off.</span>
              </h2>
              <p className="text-white/40 text-[15px] leading-relaxed max-w-lg font-light">
                Don't miss our biggest sale of the season. Hundreds of items from top brands — discounted for 24 hours only.
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
              {/* Countdown tiles */}
              <div className="flex items-center gap-3">
                {[["02","HRS"],["14","MIN"],["33","SEC"]].map(([n,l])=>(
                  <div key={l} className="flex flex-col items-center bg-white/8 border border-white/10 rounded-2xl px-5 py-3">
                    <span className="cg text-3xl font-bold text-white leading-none">{n}</span>
                    <span className="text-[9px] text-white/30 font-bold tracking-widest uppercase mt-1">{l}</span>
                  </div>
                ))}
              </div>
              <Button onClick={handleShopNow}
                className="lift h-12 px-8 bg-white hover:bg-zinc-100 text-black font-bold text-sm rounded-2xl gap-2 tracking-wide border-0">
                <Zap size={15}/> Shop the Sale <ArrowRight size={13}/>
              </Button>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════
            TRUST / WHY US
        ═══════════════════════════════════════ */}
        <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-divider mx-auto mb-4"/>
            <p className="text-[11px] font-bold tracking-[.2em] uppercase text-zinc-400 mb-2 mt-4">Why ShopMart</p>
            <h2 className="cg text-5xl font-bold text-black">Built Around <span className="italic text-zinc-400">You</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Truck,      title: "Free Fast Shipping",     desc: "Free delivery on all orders over $50. Express next-day options available at checkout.",       dark: true  },
              { icon: RotateCcw,  title: "Easy 30-Day Returns",    desc: "Not happy? Return anything within 30 days, no questions asked. Full refund guaranteed.",       dark: false },
              { icon: ShieldCheck, title: "Secure Payments",        desc: "256-bit SSL encryption on every transaction. Your payment info is always safe with us.",      dark: false },
              { icon: Award,      title: "Premium Quality",        desc: "Every item is quality-checked before shipping. We only carry brands we'd buy ourselves.",      dark: false },
              { icon: Phone,      title: "24/7 Customer Support",  desc: "Real humans, real help — any time of day. Chat, email, or call whenever you need us.",        dark: true  },
              { icon: Sparkles,   title: "Members Rewards",        desc: "Earn points on every purchase. Redeem for discounts, free shipping, and exclusive perks.",     dark: false },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}
                  className={`card-hover rounded-3xl p-7 border cursor-default ${item.dark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-100"}`}>
                  <div className={`w-12 h-12 ${item.dark ? "bg-white/10" : "bg-zinc-100"} rounded-2xl flex items-center justify-center mb-5`}>
                    <Icon size={22} className={item.dark ? "text-white/70" : "text-zinc-700"} />
                  </div>
                  <p className={`font-bold text-[15px] mb-2 ${item.dark ? "text-white" : "text-zinc-900"}`}>{item.title}</p>
                  <p className={`text-sm leading-relaxed font-light ${item.dark ? "text-white/40" : "text-zinc-500"}`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>


        {/* ═══════════════════════════════════════
            TESTIMONIALS
        ═══════════════════════════════════════ */}
        <section className="bg-zinc-50 py-24 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="section-divider mx-auto mb-4"/>
              <p className="text-[11px] font-bold tracking-[.2em] uppercase text-zinc-400 mb-2 mt-4">Social Proof</p>
              <h2 className="cg text-5xl font-bold text-black">What Our <span className="italic text-zinc-400">Customers</span> Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map(({name,role,text,stars})=>(
                <div key={name}
                  className="testi-border card-hover bg-white rounded-3xl p-7 transition-all cursor-default">
                  <Quote size={28} className="text-zinc-200 mb-4"/>
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array(stars).fill(0).map((_,i)=>(
                      <Star key={i} size={13} className="fill-amber-400 text-amber-400"/>
                    ))}
                  </div>
                  <p className="text-zinc-600 text-[15px] leading-relaxed font-light mb-6">"{text}"</p>
                  <Separator className="mb-5"/>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-zinc-950 rounded-full flex items-center justify-center">
                      <span className="text-white text-[12px] font-bold">{name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{name}</p>
                      <p className="text-[11px] text-zinc-400">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════
            FINAL CTA SECTION
        ═══════════════════════════════════════ */}
        <section className="py-28 px-6 lg:px-16 bg-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0"
            style={{ backgroundImage:"radial-gradient(circle at 1px 1px,#e5e5e5 1px,transparent 0)", backgroundSize:"28px 28px", opacity:.5 }} />
          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full px-4 py-2 mb-7">
              <Sparkles size={12} className="text-zinc-500"/>
              <span className="text-[11px] font-bold tracking-[.16em] uppercase text-zinc-500">Join 2 Million Shoppers</span>
            </div>
            <h2 className="cg text-[clamp(3rem,6vw,5rem)] font-bold text-black leading-[.95] tracking-tight mb-6">
              Ready to Start<br /><span className="italic text-zinc-400">Shopping?</span>
            </h2>
            <p className="text-zinc-500 text-[16px] leading-relaxed max-w-md mb-10 font-light">
              Join millions of happy customers. Create your free account and get 10% off your first order.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={handleShopNow}
                className="lift h-13 px-10 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-[14px] rounded-2xl gap-2.5 tracking-wide border-0">
                <ShoppingBag size={16}/>Shop Now
              </Button>
              <Button variant="outline"
                className="lift h-13 px-10 border border-zinc-200 hover:border-zinc-900 text-zinc-700 font-bold text-[14px] rounded-2xl gap-2.5 tracking-wide">
                <LayoutGrid size={15}/>Browse Categories
              </Button>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}
