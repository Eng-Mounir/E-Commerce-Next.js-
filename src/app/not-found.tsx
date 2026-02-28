"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Search, ShoppingCart, Sparkles } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;0,900;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        /* ── Mount animations ── */
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
        @keyframes slideR   { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        /* ── Floating 404 digit ── */
        @keyframes floatNum {
          0%,100% { transform: translateY(0px) rotate(-2deg); }
          50%     { transform: translateY(-18px) rotate(1deg); }
        }
        /* ── Orbit ring ── */
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        /* ── Glitch flicker ── */
        @keyframes glitch {
          0%,95%,100%  { clip-path: none; transform: none; opacity:1; }
          96%  { clip-path: polygon(0 20%,100% 20%,100% 30%,0 30%); transform: translateX(-4px); opacity:.8; }
          97%  { clip-path: polygon(0 60%,100% 60%,100% 75%,0 75%); transform: translateX(3px);  opacity:.9; }
          98%  { clip-path: none; transform: translateX(-2px); }
          99%  { clip-path: polygon(0 40%,100% 40%,100% 50%,0 50%); transform: translateX(2px); }
        }
        /* ── Pulse dot ── */
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.4); }
          50%     { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
        /* ── Shimmer on bg text ── */
        @keyframes shimmerBg {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }

        .a1 { animation: fadeUp  .7s cubic-bezier(.16,1,.3,1) .05s both; }
        .a2 { animation: fadeUp  .7s cubic-bezier(.16,1,.3,1) .18s both; }
        .a3 { animation: fadeUp  .7s cubic-bezier(.16,1,.3,1) .30s both; }
        .a4 { animation: fadeUp  .7s cubic-bezier(.16,1,.3,1) .42s both; }
        .a5 { animation: fadeUp  .7s cubic-bezier(.16,1,.3,1) .54s both; }
        .af { animation: fadeIn  1s  ease           .1s  both; }
        .as { animation: scaleIn .8s cubic-bezier(.16,1,.3,1) .1s  both; }

        .float-num     { animation: floatNum 5s ease-in-out infinite; }
        .orbit-ring    { animation: orbit        8s linear infinite; }
        .orbit-reverse { animation: orbitReverse 12s linear infinite; }
        .glitch-text   { animation: glitch 6s steps(1) infinite; }
        .pulse-dot     { animation: pulseDot 1.8s ease-in-out infinite; }

        .bg-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(10rem, 22vw, 18rem);
          font-weight: 900;
          letter-spacing: -.04em;
          line-height: 1;
          background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 30%, #f5f5f5 50%, #e0e0e0 70%, #f0f0f0 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerBg 4s linear infinite;
          user-select: none;
          pointer-events: none;
        }

        .lift { transition: transform .2s ease, box-shadow .2s ease; }
        .lift:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.13); }
        .lift:active { transform: translateY(0); }

        /* dot grid bg */
        .dot-grid {
          background-image: radial-gradient(circle at 1px 1px, #ddd 1px, transparent 0);
          background-size: 28px 28px;
        }

        /* diagonal slab */
        .diag { clip-path: polygon(0 0,100% 0,100% 75%,0 100%); }
      `}</style>

      <div className="dm min-h-screen bg-white overflow-hidden flex flex-col">

        {/* ── Background layers ── */}
        <div className="af pointer-events-none fixed inset-0 dot-grid opacity-50" />
        <div className="pointer-events-none fixed inset-0 bg-linear-to-br from-white via-white to-zinc-50 opacity-80" />

        {/* ── Top-right dark slab ── */}
        <div className="pointer-events-none fixed -top-10 -right-10 w-[45vw] h-[55vh] bg-zinc-950 diag opacity-90">
          <div className="absolute inset-0 diag opacity-[.06]"
            style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"20px 20px"}} />
        </div>



        {/* ── Main content ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">

          {/* Giant ghost "404" background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="bg-text">404</span>
          </div>

          {/* Floating orbit visual */}
          <div className="as relative w-52 h-52 flex items-center justify-center mb-10">

            {/* Outer orbit ring */}
            <div className="orbit-ring absolute w-full h-full rounded-full border border-dashed border-zinc-200" />

            {/* Inner orbit with dot */}
            <div className="orbit-reverse absolute w-32 h-32 rounded-full border border-zinc-100">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-300 rounded-full" />
            </div>

            {/* Orbiting icon blip */}
            <div className="orbit-ring absolute w-full h-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-zinc-200 rounded-full shadow-md flex items-center justify-center">
                <Search size={11} className="text-zinc-400" />
              </div>
            </div>

            {/* Center floating card */}
            <div className="float-num relative z-10 w-28 h-28 bg-white rounded-3xl border border-zinc-100 shadow-2xl shadow-zinc-200/60 flex flex-col items-center justify-center gap-1">
              <span className="cg text-5xl font-black text-zinc-900 leading-none glitch-text">404</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">Not Found</span>
            </div>

          </div>

          {/* Text content */}
          <div className="relative z-10 max-w-md">
            <div className="a1 inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full px-3 py-1.5 mb-5">
              <Sparkles size={11} className="text-zinc-500" />
              <span className="text-[10px] font-bold tracking-[.16em] uppercase text-zinc-500">Oops! Lost in space</span>
            </div>

            <h1 className="a2 cg text-[clamp(2.4rem,5vw,4rem)] font-bold text-zinc-900 leading-tight tracking-tight mb-4">
              This Page<br />
              <span className="italic text-zinc-400">Doesn't Exist.</span>
            </h1>

            <p className="a3 text-zinc-400 text-[15px] leading-relaxed font-light mb-8">
              The page you're looking for may have been moved, deleted,
              or never existed. Let's get you back on track.
            </p>

            {/* CTA buttons */}
            <div className="a4 flex flex-wrap items-center justify-center gap-3 mb-8">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="lift h-11 px-6 border border-zinc-200 hover:border-zinc-900 text-zinc-700 font-bold text-sm rounded-2xl gap-2 tracking-wide"
              >
                <ArrowLeft size={15} />
                Go Back
              </Button>

              <Button
                onClick={() => router.push('/')}
                className="lift h-11 px-6 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl gap-2 tracking-wide border-0"
              >
                <Home size={15} />
                Back to Home
              </Button>

              <Button
                onClick={() => router.push('/products')}
                variant="outline"
                className="lift h-11 px-6 border border-zinc-200 hover:border-zinc-900 text-zinc-700 font-bold text-sm rounded-2xl gap-2 tracking-wide"
              >
                <ShoppingCart size={15} />
                Shop Now
              </Button>
            </div>

            {/* Quick links */}
            <div className="a5">
              <p className="text-[11px] font-bold tracking-[.15em] uppercase text-zinc-300 mb-3">Popular pages</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { href: '/products',   label: 'Products'   },
                  { href: '/categories', label: 'Categories' },
                  { href: '/about',      label: 'About'      },
                  { href: '/wishlist',   label: 'Wishlist'   },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[12px] font-semibold text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full transition-all duration-150"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>



      </div>
    </>
  )
}