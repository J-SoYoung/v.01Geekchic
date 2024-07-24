import React from "react";
// import { useLocation } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { wishlistState } from "../atoms/userAtom";
import { userState } from "../atoms/userAtom";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string[];
}

export default function Wishlist() {
  // const location = useLocation();
  const user = useRecoilValue(userState);
  const wishlist = useRecoilValue(wishlistState);

  return (
    <div>
      <h2>{user?.uid}의 관심물품</h2>
      <ul>
        {wishlist.map((product: Product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
