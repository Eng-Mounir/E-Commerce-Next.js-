// Product Interfaces
export interface ProductI {
  sold: number;
  images: string[];
  subcategory: SubcategoryI[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: CategoryI;
  brand: BrandI;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Brand Interfaces
export interface BrandI {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Category Interfaces
export interface CategoryI {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubcategoryI {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Page Props Interfaces
export interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface ProductCarouselProps {
  images: string[];
  title: string;
}

// API Response Interfaces
export interface ApiResponse<T> {
  data: T;
  results?: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
}

export interface ProductsResponse {
  data: ProductI[];
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
}
