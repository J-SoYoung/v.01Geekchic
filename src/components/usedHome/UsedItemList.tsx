import React from 'react';
import UsedItemCard from './UsedItemCard';

const UsedItemList: React.FC = () => {
  const products = [
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
    { title: '나이키 페가수스 41', price: '200,000원', imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="p-4 grid grid-cols-2 gap-4 mb-24">
      {products.map((product, index) => (
        <UsedItemCard key={index} {...product} />
      ))}
    </div>
  );
}

export default UsedItemList;
