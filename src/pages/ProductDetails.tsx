import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleProductQuery } from '@/redux/api/apiSlice';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useSingleProductQuery(id);

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.thumbnail} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">{product?.rating}</ul>
          <Button>Add to cart</Button>
        </div>
      </div>
      <ProductReview />
    </>
  );
}
