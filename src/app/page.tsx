
"use client"

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleShopNow = () => {
    router.push('/products');
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <section className="flex flex-col items-center px-8 gap-6 w-4xl max-w-4xl h-60.25">
          {/* Heading */}
          <h1 className="text-[57.9px] font-bold leading-15 text-center text-black w-208 h-15 flex items-center justify-center">
            Welcome to ShopMart
          </h1>

          {/* Description */}
          <div className="flex flex-col items-center w-3xl max-w-3xl h-16.25">
            <p className="text-[18.4px] font-normal leading-8 text-center text-[#4A5565] w-199.5 h-16.25 flex items-center">
              Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
            </p>
          </div>

          {/* Buttons Container */}
          <div className="flex flex-row justify-center items-center gap-4 pt-4 w-208 h-17">
            {/* Shop Now Button */}
            <button 
              onClick={handleShopNow}
              className="bg-black text-white rounded-lg px-[33.21px] py-3 w-[140.41px] h-12 flex items-center justify-center text-[15.1px] font-normal leading-6 hover:bg-gray-800 transition cursor-pointer"
            >
              Shop Now
            </button>

            {/* Browse Categories Button */}
            <button className="bg-white text-black border-2 border-black rounded-lg px-8 py-3 w-50.5 h-13 flex items-center justify-center text-[15px] font-normal leading-6 hover:bg-gray-100 transition">
              Browse Categories
            </button>
          </div>
        </section>
      </div>
    </>
  )
}