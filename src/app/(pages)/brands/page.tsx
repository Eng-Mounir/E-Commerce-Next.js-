import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, ArrowRight, Award } from 'lucide-react'
import { getAllBrands } from '@/actions/brands.action'

export default async function BrandsPage() {
  const brands = await getAllBrands()

  return (
    <>

      <div className="dm bg-white min-h-screen">

        {/* ── Hero Header ── */}
        <div className="relative bg-zinc-950 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-white/5 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -top-10 -right-10 w-[40vw] h-[120%] bg-white/[.02]"
            style={{clipPath:'polygon(0 0,100% 0,100% 70%,0 100%)'}} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-16">
            <div className="a1 flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                <Award size={11} className="text-white/50" />
                <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">Premium Partners</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                <Sparkles size={11} className="text-white/50" />
                <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">{brands.length}+ Brands</span>
              </div>
            </div>
            <h1 className="a2 cg text-[clamp(3rem,6vw,5.5rem)] font-bold text-white leading-[.95] tracking-tight mb-4">
              Our<br /><span className="italic text-white/30">Brands.</span>
            </h1>
            <p className="a3 text-white/35 text-[15px] font-light max-w-md">
              Discover our curated collection of world-class brands, handpicked for quality and innovation.
            </p>
          </div>

          {/* Marquee */}
          <div className="border-t border-white/8 py-3 overflow-hidden">
            <div className="mq flex whitespace-nowrap text-white/20 text-[10px] font-bold tracking-[.22em] uppercase">
              {Array(8).fill(brands.slice(0, 8).map(b => b.name)).flat().map((name: string, i: number) => (
                <span key={i} className="shrink-0 px-5">{name} &nbsp;·&nbsp;</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Brands Grid ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[.18em] uppercase text-zinc-400 mb-1">Showing all</p>
              <p className="cg text-3xl font-bold text-zinc-900">
                {brands.length} <span className="italic text-zinc-400">Brands</span>
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              All brands available
            </div>
          </div>

          {brands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4">
                <Award size={28} className="text-zinc-300" />
              </div>
              <p className="cg text-2xl font-bold text-zinc-900 mb-2">No Brands Found</p>
              <p className="text-zinc-400 text-sm font-light">Could not load brands. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {brands.map((brand, i) => (
                <Link
                  key={brand._id}
                  href={`/brands/${brand._id}`}
                  className="brand-card group bg-white border border-zinc-100 rounded-3xl p-5 flex flex-col items-center gap-3 relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  {/* Shine */}
                  <div className="brand-shine absolute inset-0 pointer-events-none z-10" />

                  {/* Logo */}
                  <div className="w-full aspect-square bg-zinc-50 rounded-2xl flex items-center justify-center overflow-hidden p-3">
                    <div className="brand-logo relative w-full h-full">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        sizes="(max-width:640px) 40vw,(max-width:1024px) 20vw,14vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Name + arrow */}
                  <div className="flex items-center justify-between w-full px-0.5">
                    <p className="text-[13px] font-bold text-zinc-800 leading-none truncate">
                      {brand.name}
                    </p>
                    <ArrowRight size={13} className="brand-arrow text-zinc-400 shrink-0 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}