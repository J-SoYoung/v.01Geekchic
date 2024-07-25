import React, { useEffect } from "react";
// import { useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from "recoil";
import { wishlistState } from "../atoms/userAtom";
import { userState } from "../atoms/userAtom";
import { getWishlistItems } from "../api/firebase";

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
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      getWishlistItems(user.uid).then(setWishlist);
    }
  }, [user, setWishlist]);

  return (
    <div className="h-[100%] w-[600px]">
      <div className="p-11 pb-4">
        <h1 className="text-3xl font-bold text-left mb-[40px]">관심물품</h1>
        <p className="text-left text-lg">전체</p>
      </div>
      <ul className="p-11 pb-4">
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
