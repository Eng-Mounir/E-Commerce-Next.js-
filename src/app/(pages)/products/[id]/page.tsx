import { fetchProductById } from '@/services/product.services';
import ImageCarousel from '@/app/_components/ImageCarousel';
import Breadcrumb from '@/app/_components/Breadcrumb';
import { ShoppingCart, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProductDetailPageProps } from '@/app/interfaces';

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productData = await fetchProductById(id);
  
  if (!productData || !productData.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  const product = productData.data;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="flex flex-col items-center py-8 gap-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.title },
        ]}
      />

      <div className="flex items-center justify-center">
        <Card className="w-full max-w-310 flex flex-row gap-6 p-6 border border-gray-200 rounded-2xl shadow-sm">
        {/* Left Side - Product Image Carousel */}
        <div className="shrink-0 w-99">
          <ImageCarousel
            images={product.images && product.images.length > 0 
              ? [product.imageCover, ...product.images] 
              : [product.imageCover]}
            title={product.title}
          />
        </div>

        {/* Right Side - Product Details */}
        <div className="flex flex-col gap-8 grow py-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">{product.brand?.name || 'Brand'}</p>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-600">{product.category?.name || 'Category'}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {renderStars(product.ratingsAverage)}
            </div>
            <span className="text-sm text-gray-500">({product.ratingsQuantity} reviews)</span>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-700 leading-relaxed">
              {product.description || 'No description available'}
            </p>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold text-gray-900">EGP {product.price}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-3 items-center">
            <button className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors font-medium">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <Heart size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Stock Info */}
          {product.quantity !== undefined && (
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Stock: <span className={product.quantity > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                </span>
              </p>
            </div>
          )}
        </div>
      </Card>
      </div>
    </div>
  );
}
