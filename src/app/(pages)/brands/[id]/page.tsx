import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, ArrowRight, Package, Star,
  ShoppingBag, Award, Sparkles, ChevronRight
} from 'lucide-react'
import { getBrandById, getProductsByBrand } from '@/actions/brands.action'
import AddToCartButton from '@/app/_components/AddToCartButton'

interface BrandDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { id } = await params

  const [brand, products] = await Promise.all([
    getBrandById(id),
    getProductsByBrand(id),
  ])

  if (!brand) notFound()

  const avgRating = products.length > 0
    ? (products.reduce((s, p) => s + (p.ratingsAverage ?? 0), 0) / products.length).toFixed(1)
    : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cg { font-family: 'Cormorant Garamond', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes logoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        .a0{animation:fadeIn  .5s ease .0s both}
        .a1{animation:fadeUp  .6s cubic-bezier(.16,1,.3,1) .05s both}
        .a2{animation:fadeUp  .6s cubic-bezier(.16,1,.3,1) .15s both}
        .a3{animation:fadeUp  .6s cubic-bezier(.16,1,.3,1) .25s both}
        .logo-float { animation: logoFloat 4s ease-in-out infinite; }

        /* Product cards */
        .prod-card {
          transition: all .28s cubic-bezier(.16,1,.3,1);
        }
        .prod-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 42px rgba(0,0,0,.09);
          border-color: #d4d4d8;
        }
        .prod-img { transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .prod-card:hover .prod-img { transform: scale(1.05); }

        .pc-actions {
          opacity: 0;
          transform: translateY(6px);
          transition: all .2s ease;
        }
        .prod-card:hover .pc-actions {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stat pill */
        .stat-pill {
          transition: all .18s ease;
        }
        .stat-pill:hover {
          background: #09090b;
          color: white;
          border-color: #09090b;
        }
      `}</style>

      <div className="dm bg-white min-h-screen">

        {/* ── Dark hero ── */}
        <div className="a0 relative bg-zinc-950 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.05]"
            style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'24px 24px'}} />
          <div className="pointer-events-none absolute top-0 right-0 w-1/2 h-full bg-white/[.02]"
            style={{clipPath:'polygon(30% 0,100% 0,100% 100%,0 100%)'}} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-14">
            {/* Breadcrumb */}
            <div className="a1 flex items-center gap-2 text-white/30 text-[11px] font-medium mb-8">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight size={11} />
              <Link href="/brands" className="hover:text-white/60 transition-colors">Brands</Link>
              <ChevronRight size={11} />
              <span className="text-white/60">{brand.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">

              {/* Brand logo card */}
              <div className="a1 shrink-0">
                <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center p-4 shadow-xl shadow-black/20 logo-float">
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Brand info */}
              <div className="flex-1">
                <div className="a1 flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                    <Award size={10} className="text-white/40" />
                    <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">Official Brand</span>
                  </div>
                  {products.length > 0 && (
                    <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                      <Package size={10} className="text-white/40" />
                      <span className="text-[10px] font-bold tracking-[.18em] uppercase text-white/40">
                        {products.length} Products
                      </span>
                    </div>
                  )}
                </div>

                <h1 className="a2 cg text-[clamp(3rem,6vw,5rem)] font-bold text-white leading-[.95] tracking-tight mb-4">
                  {brand.name}<span className="italic text-white/20">.</span>
                </h1>

                {/* Stats row */}
                <div className="a3 flex flex-wrap items-center gap-3">
                  <div className="stat-pill flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 transition-all">
                    <ShoppingBag size={12} className="text-white/50" />
                    <span className="text-[11px] font-bold text-white/50">{products.length} Products</span>
                  </div>
                  {avgRating && (
                    <div className="stat-pill flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 transition-all">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-[11px] font-bold text-white/50">{avgRating} avg rating</span>
                    </div>
                  )}
                  <Link href="/brands"
                    className="stat-pill flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 transition-all">
                    <ArrowLeft size={12} className="text-white/50" />
                    <span className="text-[11px] font-bold text-white/50">All Brands</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Products section ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14">

          {/* Section header */}
          <div className="a3 flex items-center justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-[.18em] uppercase text-zinc-400 mb-1">
                {brand.name} Collection
              </p>
              <p className="cg text-3xl font-bold text-zinc-900">
                {products.length} <span className="italic text-zinc-400">
                  Product{products.length !== 1 ? 's' : ''}
                </span>
              </p>
            </div>
            {products.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                In stock
              </div>
            )}
          </div>

          {/* Empty state */}
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mb-6">
                <Package size={32} className="text-zinc-300" />
              </div>
              <h2 className="cg text-2xl font-bold text-zinc-900 mb-2">No products yet</h2>
              <p className="text-zinc-400 text-sm font-light mb-6">
                This brand doesn't have any products listed yet.
              </p>
              <Link href="/products"
                className="flex items-center gap-2 h-11 px-7 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-bold rounded-2xl transition-colors">
                <Sparkles size={14} /> Browse All Products
              </Link>
            </div>
          )}

          {/* Products grid */}
          {products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {products.map((product, i) => (
                <div
                  key={product._id}
                  className="prod-card bg-white border border-zinc-100 rounded-3xl overflow-hidden flex flex-col"
                  style={{ animation: `fadeUp .5s cubic-bezier(.16,1,.3,1) ${i * 0.04}s both` }}
                >
                  {/* Image */}
                  <Link href={`/products/${product._id}`} className="block relative w-full aspect-square bg-zinc-50 overflow-hidden shrink-0">
                    <div className="prod-img relative w-full h-full">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,20vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Category badge */}
                    {product.category?.name && (
                      <div className="absolute bottom-2 left-2">
                        <span className="text-[9px] font-bold tracking-[.12em] uppercase bg-white/95 backdrop-blur text-zinc-600 px-2 py-1 rounded-full">
                          {product.category.name}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <Link href={`/products/${product._id}`}>
                      <h3 className="cg text-[1.05rem] font-bold text-zinc-900 leading-snug line-clamp-2 hover:text-zinc-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array(5).fill(0).map((_, s) => (
                          <Star key={s} size={9}
                            className={s < Math.round(product.ratingsAverage)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-zinc-200 text-zinc-200'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400">({product.ratingsQuantity})</span>
                    </div>

                    <div className="h-px bg-zinc-100 my-0.5" />

                    {/* Price + cart */}
                    <div className="flex items-center justify-between mt-auto">
                      <p className="cg text-xl font-bold text-zinc-900 leading-none">
                        EGP {product.price}
                      </p>
                      <Link
                        href={`/products/${product._id}`}
                        className="w-9 h-9 bg-zinc-950 hover:bg-zinc-700 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <ArrowRight size={14} className="text-white" />
                      </Link>
                    </div>

                    {/* Hover: Add to cart */}
                    <div className="pc-actions">
                      <AddToCartButton productId={product._id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom breadcrumb */}
          <div className="mt-16 flex items-center justify-center gap-2 text-[12px] text-zinc-400">
            <Link href="/brands" className="hover:text-zinc-700 transition-colors flex items-center gap-1.5">
              <ArrowLeft size={12} /> Back to all brands
            </Link>
            <span className="text-zinc-200">·</span>
            <Link href="/products" className="hover:text-zinc-700 transition-colors">
              Browse all products
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}