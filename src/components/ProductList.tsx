import React, { useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useProductStore } from '../stores/useProductStore';

export const ProductList: React.FC = () => {
  const { filteredProducts, filterProducts } = useProductStore();

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  if (filteredProducts.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="text-gray-500">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};