import { fetchProductById } from '@/services/product.services';
import ImageCarousel from '@/app/_components/ImageCarousel';
import Breadcrumb from '@/app/_components/Breadcrumb';
import { Heart, Star, Package, Truck, ShieldCheck, RotateCcw, Award, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ProductDetailPageProps } from '@/app/interfaces';
import AddToCartButton from "@/app/_components/AddToCartButton";
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productData = await fetchProductById(id);

  if (!productData || !productData.data) {
    return (
      <>
        <div className="dm flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center">
            <Package size={32} className="text-zinc-300" />
          </div>
          <h2 className="cg text-3xl font-bold text-zinc-900">Product Not Found</h2>
          <p className="text-zinc-400 text-sm font-light">The product you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-2 h-11 px-7 bg-zinc-950 text-white font-bold rounded-xl gap-2">
            <ChevronRight size={14} className="rotate-180" /> Back to Products
          </Button>
        </div>
      </>
    );
  }

  const product = productData.data;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={15}
        className={i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-zinc-200 text-zinc-200'}
      />
    ));
  };

  const inStock = product.quantity !== undefined && product.quantity > 0;
  return (
    <>


      <div className="dm bg-white min-h-screen">

        {/* ── Breadcrumb bar ── */}
        <div className="border-b border-zinc-100 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: product.title },
              ]}
            />
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
          <Card className="border border-zinc-100 rounded-3xl shadow-sm overflow-hidden bg-white">
            <div className="flex flex-col lg:flex-row">

              {/* ── Left: Image carousel ── */}
              <div className="a1 lg:w-120 shrink-0 bg-zinc-50 border-b lg:border-b-0 lg:border-r border-zinc-100 p-6 flex items-center justify-center">
                <ImageCarousel
                  images={product.images && product.images.length > 0
                    ? [product.imageCover, ...product.images]
                    : [product.imageCover]}
                  title={product.title}
                />
              </div>

              {/* ── Right: Product details ── */}
              <div className="flex flex-col flex-1 p-8 lg:p-10 gap-0">

                {/* Brand + badges row */}
                <div className="a1 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-[.18em] uppercase text-zinc-400">
                      {product.brand?.name || 'Brand'}
                    </span>
                    <span className="text-zinc-200">·</span>
                    <span className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400">
                      {product.category?.name || 'Category'}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                    inStock ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                {/* Title */}
                <div className="a2 mb-5">
                  <h1 className="cg text-[clamp(2rem,3.5vw,3rem)] font-bold text-zinc-900 leading-tight tracking-tight">
                    {product.title}
                  </h1>
                </div>

                {/* Rating */}
                <div className="a2 flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-0.5">
                    {renderStars(product.ratingsAverage)}
                  </div>
                  <span className="text-sm font-bold text-zinc-700">{product.ratingsAverage?.toFixed(1)}</span>
                  <span className="text-sm text-zinc-400 font-light">({product.ratingsQuantity} reviews)</span>
                </div>

                <Separator className="mb-6 bg-zinc-100" />

                {/* Description */}
                <div className="a3 mb-6">
                  <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-2">About this product</p>
                  <p className="text-zinc-600 text-[15px] leading-relaxed font-light">
                    {product.description || 'No description available.'}
                  </p>
                </div>

                {/* Trust pills */}
                <div className="a3 flex flex-wrap gap-2 mb-8">
                  {[
                    { icon: Truck,       label: "Free Shipping"   },
                    { icon: RotateCcw,   label: "30-Day Returns"  },
                    { icon: ShieldCheck, label: "Secure Payment"  },
                    { icon: Award,       label: "Genuine Product" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 rounded-full px-3 py-1.5">
                      <Icon size={11} className="text-zinc-500" />
                      <span className="text-[10px] font-semibold text-zinc-500 tracking-wide">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Price block */}
                <div className="a4 bg-zinc-50 border border-zinc-100 rounded-2xl p-5 mb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-[.15em] uppercase text-zinc-400 mb-1">Price</p>
                      <p className="cg text-[2.8rem] font-bold text-zinc-900 leading-none">
                        EGP {product.price}
                      </p>
                    </div>
                    {product.quantity !== undefined && product.quantity > 0 && product.quantity <= 10 && (
                      <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                        <Sparkles size={11} className="text-amber-600" />
                        <span className="text-[11px] font-bold text-amber-700">Only {product.quantity} left</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
<div className="a5 flex items-center gap-3">
  <AddToCartButton productId={product._id} />

  <button className="wish-btn h-13 w-13 border-2 border-zinc-200 rounded-2xl flex items-center justify-center transition-all">
    <Heart size={20} className="text-zinc-500" />
  </button>
</div> 
                
                {/* Stock info */}
                {product.quantity !== undefined && (
                  <div className="a5 mt-5 pt-5 border-t border-zinc-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 font-medium">Availability</span>
                      <span className={`font-bold ${inStock ? 'text-green-600' : 'text-red-500'}`}>
                        {inStock ? `${product.quantity} units in stock` : 'Out of stock'}
                      </span>
                    </div>
                    {/* Stock progress bar */}
                    {inStock && (
                      <div className="mt-2 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-900 rounded-full transition-all"
                          style={{ width: `${Math.min((product.quantity / 100) * 100, 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </Card>
        </div>


      </div>
    </>
  );
}