"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingBag, ArrowRight, Users, Globe, Heart,
  Star, Zap, Shield, Truck, Award, Target, Sparkles,
 Clock, Headphones, RotateCcw
} from "lucide-react"
import { useRouter } from "next/navigation"

const team = [
  { name: "Layla Hassan",    role: "CEO & Co-Founder",       initial: "L", dark: true  },
  { name: "Omar Farouk",     role: "CTO & Co-Founder",       initial: "O", dark: false },
  { name: "Nour El-Din",     role: "Head of Design",         initial: "N", dark: false },
  { name: "Sara Mostafa",    role: "Head of Operations",     initial: "S", dark: true  },
  { name: "Karim Adel",      role: "Lead Engineer",          initial: "K", dark: false },
  { name: "Dina Khalil",     role: "Customer Experience",    initial: "D", dark: false },
]

const milestones = [
  { year: "2020", title: "Founded",          desc: "ShopMart launched with a vision to bring premium commerce to everyone." },
  { year: "2021", title: "100k Users",       desc: "Reached our first 100,000 shoppers in just 12 months after launch."    },
  { year: "2022", title: "Regional Expansion", desc: "Expanded to 6 new countries across the MENA region."               },
  { year: "2023", title: "2M+ Shoppers",     desc: "Crossed 2 million active users and launched our rewards program."     },
  { year: "2024", title: "Premium Brands",   desc: "Partnered with 500+ premium global brands and opened our flagship."   },
]

const values = [
  { icon: Shield,    title: "Trust First",         desc: "Every transaction is encrypted and every product is verified. Your security is our foundation."              },
  { icon: Heart,     title: "Customer Obsessed",   desc: "We measure success by one thing only: whether our customers are happy. Everything else follows."             },
  { icon: Zap,       title: "Move Fast",           desc: "New arrivals daily, same-day dispatch, and 24-hour delivery. We don't believe in making you wait."           },
  { icon: Globe,     title: "Built for Everyone",  desc: "Premium doesn't mean exclusive. We work hard to make quality products accessible across every budget."       },
  { icon: Award,     title: "Quality Guaranteed",  desc: "Every item passes our quality gate before reaching you. No shortcuts, no compromises."                       },
  { icon: Target,    title: "Always Improving",    desc: "We ship updates, fix bugs, and launch new features every week. ShopMart today is better than yesterday."     },
]

const stats = [
  { value: "2M+",  label: "Happy Shoppers",   icon: Users   },
  { value: "500+", label: "Premium Brands",   icon: Award   },
  { value: "50+",  label: "Countries",        icon: Globe   },
  { value: "99%",  label: "Satisfaction",     icon: Star    },
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <>

      <div className="dm bg-white overflow-x-hidden">

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* dot grid */}
          <div className="af pointer-events-none absolute inset-0"
            style={{backgroundImage:"radial-gradient(circle at 1px 1px,#ddd 1px,transparent 0)",backgroundSize:"28px 28px",opacity:.55}} />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white via-white to-zinc-50 opacity-80" />

          {/* black diagonal slab */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-[55vw] h-[70vh] bg-zinc-950"
            style={{clipPath:"polygon(0 0,100% 0,100% 80%,0 100%)"}}>
            <div className="absolute inset-0 opacity-[.06]"
              style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"20px 20px",clipPath:"polygon(0 0,100% 0,100% 80%,0 100%)"}} />
          </div>

          {/* spinning text badge */}
          <div className="pointer-events-none hidden lg:block absolute top-10 right-[20%] z-20">
            <div className="relative w-20 h-20">
              <svg className="sp w-full h-full" viewBox="0 0 80 80">
                <defs><path id="cp2" d="M40,40 m-27,0 a27,27 0 1,1 54,0 a27,27 0 1,1 -54,0"/></defs>
                <text fontSize="8" fontWeight="700" letterSpacing="3" fill="#fff" opacity=".4" fontFamily="DM Sans,sans-serif">
                  <textPath href="#cp2">OUR STORY · SINCE 2020 · SHOPMART ·</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Heart size={14} className="fill-black text-black"/>
                </div>
              </div>
            </div>
          </div>

          {/* floating card */}
          <div className="float pointer-events-none hidden xl:flex absolute top-20 right-[6%] z-10 flex-col gap-2 bg-white rounded-2xl shadow-2xl p-5 w-48 border border-zinc-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-zinc-950 rounded-xl flex items-center justify-center">
                <ShoppingBag size={15} className="text-white"/>
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">ShopMart</span>
            </div>
            <p className="cg text-lg font-bold text-zinc-900 leading-tight">Premium<br/>Commerce</p>
            <div className="flex items-center gap-1 mt-1">
              {Array(5).fill(0).map((_,i)=>(
                <Star key={i} size={10} className="fill-amber-400 text-amber-400"/>
              ))}
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">Trusted by 2M+ shoppers</p>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-12 items-center py-24">
            <div className="flex flex-col items-start">
              <div className="a1 flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1.5 bg-zinc-950 rounded-full px-4 py-2">
                  <Sparkles size={11} className="text-zinc-300"/>
                  <span className="text-[10px] font-bold tracking-[.18em] uppercase text-zinc-300">Our Story</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-100 rounded-full px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block"/>
                  <span className="text-[10px] font-semibold text-zinc-500">Est. 2020</span>
                </div>
              </div>

              <div className="a2 mb-6">
                <h1 className="cg text-[clamp(3.5rem,6vw,6rem)] font-bold text-black leading-[.95] tracking-tight">
                  We are on a<br/>
                  Mission to<br/>
                  <span className="italic text-zinc-400">Redefine</span><br/>
                  Commerce<span className="text-zinc-200">.</span>
                </h1>
              </div>

              <div className="a3 flex items-start gap-4 mb-8 max-w-md">
                <div className="w-px h-14 bg-zinc-200 shrink-0 mt-1"/>
                <p className="text-zinc-500 text-[15px] leading-relaxed font-light">
                  Founded in 2020, ShopMart was built on a simple belief: everyone deserves access to
                  premium products with world-class service — without compromise.
                </p>
              </div>

              <div className="a4 flex flex-wrap gap-3">
                <Button onClick={() => router.push('/products')}
                  className="lift h-12 px-8 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-[13px] rounded-2xl gap-2 border-0 tracking-wide">
                  <ShoppingBag size={15}/> Shop Now
                </Button>
                <Button variant="outline"
                  className="lift h-12 px-8 border border-zinc-200 hover:border-zinc-900 bg-white text-zinc-800 font-bold text-[13px] rounded-2xl gap-2 tracking-wide">
                  Meet the Team <ArrowRight size={13} className="text-zinc-400"/>
                </Button>
              </div>
            </div>

            {/* right side stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map(({value,label,icon:Icon},i)=>(
                <div key={label}
                  className={`card-hover rounded-3xl p-7 border flex flex-col gap-3 ${i%3===0?"bg-zinc-950 border-zinc-800":"bg-white border-zinc-100"}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${i%3===0?"bg-white/10":"bg-zinc-100"}`}>
                    <Icon size={18} className={i%3===0?"text-white/70":"text-zinc-600"}/>
                  </div>
                  <div>
                    <p className={`cg text-4xl font-bold leading-none mb-1 ${i%3===0?"text-white":"text-zinc-900"}`}>{value}</p>
                    <p className={`text-[11px] font-bold tracking-widest uppercase ${i%3===0?"text-white/35":"text-zinc-400"}`}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* marquee */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-950 py-3 overflow-hidden">
            <div className="mq flex gap-0 whitespace-nowrap text-white/25 text-[10px] font-bold tracking-[.22em] uppercase">
              {Array(10).fill(["Premium Quality","Fast Shipping","2M+ Shoppers","Est. 2020","500+ Brands"]).flat().map((t,i)=>(
                <span key={i} className="shrink-0 px-4">{t} &nbsp;·&nbsp;</span>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════ MISSION STATEMENT ═══════════ */}
        <section className="py-28 px-6 lg:px-16 bg-zinc-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-2 mb-8 shadow-sm">
              <Target size={12} className="text-zinc-500"/>
              <span className="text-[11px] font-bold tracking-[.16em] uppercase text-zinc-400">Our Mission</span>
            </div>
            <blockquote className="cg text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-zinc-900 leading-[1.05] tracking-tight mb-8">
              To make premium shopping <span className="italic text-zinc-400">accessible</span>,
              effortless, and genuinely <span className="italic text-zinc-400">enjoyable</span>
              — for everyone, everywhere.
            </blockquote>
            <Separator className="max-w-15 mx-auto bg-zinc-900 h-0.5 mb-8"/>
            <p className="text-zinc-500 text-[16px] leading-relaxed font-light max-w-2xl mx-auto">
              We started ShopMart because we were frustrated with the existing options — either cheap
              products with terrible service, or premium products with prices that excluded most people.
              We decided to build something different.
            </p>
          </div>
        </section>


        {/* ═══════════ VALUES ═══════════ */}
        <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="section-rule mb-4 block"/>
              <p className="text-[11px] font-bold tracking-[.2em] uppercase text-zinc-400 mb-2">What We Stand For</p>
              <h2 className="cg text-5xl font-bold text-black leading-tight">
                Our Core<br/><span className="italic text-zinc-400">Values</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({icon:Icon,title,desc},i)=>{
              const dark = i===0||i===4
              return(
                <div key={title}
                  className={`card-hover rounded-3xl p-7 border cursor-default ${dark?"bg-zinc-950 border-zinc-800":"bg-white border-zinc-100"}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${dark?"bg-white/10":"bg-zinc-100"}`}>
                    <Icon size={22} className={dark?"text-white/70":"text-zinc-700"}/>
                  </div>
                  <p className={`font-bold text-[15px] mb-2 ${dark?"text-white":"text-zinc-900"}`}>{title}</p>
                  <p className={`text-sm leading-relaxed font-light ${dark?"text-white/40":"text-zinc-500"}`}>{desc}</p>
                </div>
              )
            })}
          </div>
        </section>


        {/* ═══════════ TIMELINE ═══════════ */}
        <section className="bg-zinc-950 py-24 px-6 lg:px-16 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"28px 28px"}}/>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 mb-6">
                <Clock size={12} className="text-white/50"/>
                <span className="text-[11px] font-bold tracking-[.18em] uppercase text-white/40">Our Journey</span>
              </div>
              <h2 className="cg text-5xl font-bold text-white leading-tight">
                How We Got<br/><span className="italic text-white/40">Here</span>
              </h2>
            </div>
            <div className="relative flex flex-col gap-0">
              {milestones.map(({year,title,desc},i)=>(
                <div key={year} className="flex items-start gap-8 relative pb-12 last:pb-0">
                  {/* line */}
                  {i<milestones.length-1 && (
                    <div className="absolute left-7.75 top-14 bottom-0 w-px bg-white/10"/>
                  )}
                  {/* dot */}
                  <div className="shrink-0 flex flex-col items-center gap-2 z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${i===milestones.length-1?"bg-white border-white":"bg-white/8 border-white/10"}`}>
                      <span className={`cg text-lg font-bold ${i===milestones.length-1?"text-black":"text-white/60"}`}>{year}</span>
                    </div>
                  </div>
                  {/* content */}
                  <div className="pt-3 pb-2">
                    <p className="font-bold text-white text-[15px] mb-1">{title}</p>
                    <p className="text-white/35 text-sm font-light leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════ TEAM ═══════════ */}
        <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-rule mx-auto mb-4 block"/>
            <p className="text-[11px] font-bold tracking-[.2em] uppercase text-zinc-400 mb-2 mt-4">The People</p>
            <h2 className="cg text-5xl font-bold text-black">
              Meet the<br/><span className="italic text-zinc-400">Team</span>
            </h2>
            <p className="text-zinc-400 text-[15px] font-light mt-4 max-w-md mx-auto">
              A small but mighty team obsessed with building the best shopping experience on the planet.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map(({name,role,initial,dark})=>(
              <div key={name}
                className={`card-hover rounded-3xl p-5 flex flex-col items-center text-center border cursor-default ${dark?"bg-zinc-950 border-zinc-800":"bg-white border-zinc-100"}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${dark?"bg-white/10":"bg-zinc-100"}`}>
                  <span className={`cg text-2xl font-bold ${dark?"text-white":"text-zinc-700"}`}>{initial}</span>
                </div>
                <p className={`font-bold text-[13px] leading-tight mb-1 ${dark?"text-white":"text-zinc-900"}`}>{name}</p>
                <p className={`text-[10px] font-medium leading-snug ${dark?"text-white/35":"text-zinc-400"}`}>{role}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════ PERKS STRIP ═══════════ */}
        <section className="bg-zinc-50 py-16 px-6 lg:px-16 border-t border-zinc-100">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {icon:Truck,       title:"Free Shipping",    sub:"On orders over $50"},
              {icon:RotateCcw,   title:"Easy Returns",     sub:"30-day guarantee"},
              {icon:Headphones,  title:"24/7 Support",     sub:"Always here for you"},
              {icon:ShoppingBag, title:"500+ Brands",      sub:"Premium selection"},
            ].map(({icon:Icon,title,sub})=>(
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Icon size={20} className="text-zinc-700"/>
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-900">{title}</p>
                  <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════ CTA ═══════════ */}
        <section className="py-28 px-6 lg:px-16 bg-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0"
            style={{backgroundImage:"radial-gradient(circle at 1px 1px,#e5e5e5 1px,transparent 0)",backgroundSize:"28px 28px",opacity:.5}}/>
          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full px-4 py-2 mb-7">
              <Sparkles size={12} className="text-zinc-500"/>
              <span className="text-[11px] font-bold tracking-[.16em] uppercase text-zinc-500">Join the Family</span>
            </div>
            <h2 className="cg text-[clamp(3rem,6vw,5rem)] font-bold text-black leading-[.95] tracking-tight mb-6">
              Ready to<br/><span className="italic text-zinc-400">Start Shopping?</span>
            </h2>
            <p className="text-zinc-500 text-[16px] leading-relaxed max-w-md mb-10 font-light">
              Join 2 million shoppers who trust ShopMart for their everyday and extraordinary needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={() => router.push('/products')}
                className="lift h-12 px-10 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-[14px] rounded-2xl gap-2.5 border-0 tracking-wide">
                <ShoppingBag size={16}/> Shop Now
              </Button>
              <Button variant="outline"
                className="lift h-12 px-10 border border-zinc-200 hover:border-zinc-900 text-zinc-700 font-bold text-[14px] rounded-2xl gap-2.5 tracking-wide">
                <Users size={15}/> Join for Free
              </Button>
            </div>
          </div>
        </section>


      </div>
    </>
  )
}