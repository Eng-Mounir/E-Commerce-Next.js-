import Image from 'next/image'
import { Sparkles, ArrowRight, Award } from 'lucide-react'

interface Brand {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

interface BrandsResponse {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage?: number
  }
  data: Brand[]
}

async function fetchBrands(): Promise<Brand[]> {
  try {
    const pages = await Promise.all([
      fetch('https://ecommerce.routemisr.com/api/v1/brands?page=1', { next: { revalidate: 3600 } }),
      fetch('https://ecommerce.routemisr.com/api/v1/brands?page=2', { next: { revalidate: 3600 } }),
    ])
    const [data1, data2]: BrandsResponse[] = await Promise.all(pages.map(p => p.json()))
    return [...(data1.data || []), ...(data2.data || [])]
  } catch {
    return []
  }
}

export default async function BrandsPage() {
  const brands = await fetchBrands()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer  { from{background-position:-200% center} to{background-position:200% center} }

        .a1{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .05s both}
        .a2{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .15s both}
        .a3{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .25s both}
        .mq{animation:marquee 28s linear infinite}

        /* Brand card */
        .brand-card {
          transition: all .28s cubic-bezier(.16,1,.3,1);
          cursor: pointer;
        }
        .brand-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,.10);
        }
        .brand-card:hover .brand-logo {
          transform: scale(1.06);
        }
        .brand-logo {
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .brand-card:hover .brand-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .brand-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: all .2s ease;
        }

        /* Shimmer on hover */
        .brand-card:hover .brand-shine {
          opacity: 1;
        }
        .brand-shine {
          opacity: 0;
          transition: opacity .3s ease;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.5) 50%, transparent 60%);
          background-size: 200% auto;
          animation: shimmer 1.2s linear infinite;
        }
      `}</style>

      <div className="dm bg-white min-h-screen">

        {/* ── Hero Header ── */}
        <div className="relative bg-zinc-950 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] bg-white/5 rounded-full blur-3xl" />
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
              {Array(8).fill(brands.slice(0, 8).map(b => b.name)).flat().map((name, i) => (
                <span key={i} className="shrink-0 px-5">{name} &nbsp;·&nbsp;</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Brands Grid ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">

          {/* Count bar */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[.18em] uppercase text-zinc-400 mb-1">Showing all</p>
              <p className="cg text-3xl font-bold text-zinc-900">{brands.length} <span className="italic text-zinc-400">Brands</span></p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              All brands in stock
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
                <div
                  key={brand._id}
                  className="brand-card group bg-white border border-zinc-100 rounded-3xl p-5 flex flex-col items-center gap-3 relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  {/* Shine overlay */}
                  <div className="brand-shine absolute inset-0 pointer-events-none z-10" />

                  {/* Image */}
                  <div className="w-full aspect-square bg-zinc-50 rounded-2xl flex items-center justify-center overflow-hidden p-3">
                    <div className="brand-logo relative w-full h-full">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 14vw"
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer strip ── */}
        <div className="bg-zinc-950 py-8 px-6 lg:px-16 mt-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Award size={15} className="text-black" />
              </div>
              <p className="cg text-white font-bold text-lg tracking-tight">ShopMart</p>
            </div>
            <p className="text-white/25 text-xs">© 2024 ShopMart. All rights reserved.</p>
          </div>
        </div>

      </div>
    </>
  )
}