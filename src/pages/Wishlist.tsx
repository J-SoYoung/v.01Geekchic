import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { wishlistState, userState } from "../atoms/userAtom";
import { getWishlistItems, setWishlistItems } from "../api/firebase";
import closedIcon from "../assets/icons/close.svg";

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
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      getWishlistItems(user.uid).then(setWishlist);
    }
  }, [user, setWishlist]);

  const handleWishlist = (products: Product) => {
    const isInWishlist = wishlist.some((item) => item.id === products.id);
    if (user) {
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter(
          (item) => item.id !== products.id
        );
        setWishlist(updatedWishlist);
        setWishlistItems(user.uid, updatedWishlist);
      }
    }
  };

  return (
    <div className="h-[1000px] w-[600px]">
      <div className="p-11 pb-4">
        <h1 className="text-3xl font-bold text-left mb-[50px]">관심물품</h1>
        <div className="flex text-lg gap-1 text-left">
          <p>전체</p>
          <p>{wishlist.length}</p>
        </div>
      </div>
      <ul className="px-11 py-4 pb-4">
        {wishlist.map((product: Product) => (
          <>
            <li className="flex mb-4 w-[550px]" key={product.id}>
              <img
                className="w-[150px] h-[150px] rounded-[5px]"
                src={product.image}
                alt={product.title}
              />
              <div className="text-left px-4 w-[380px]">
                <div className="flex gap-[280px] items-start">
                  <h3 className="text-xl font-bold mb-[10px]">
                    {product.title}
                  </h3>
                  <button onClick={() => handleWishlist(product)}>
                    <img
                      src={closedIcon}
                      alt="closed"
                      className="w-[15px] h-[15px] brightness-150"
                    />
                  </button>
                </div>
                <p className="text-xl mb-[55px]">{product.description}</p>
                <p className="text-xl font-bold text-right">{`${product.price}원`}</p>
              </div>
            </li>
            <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px] mb-[45px]"></p>
          </>
        ))}
      </ul>
    </div>
  );
}
