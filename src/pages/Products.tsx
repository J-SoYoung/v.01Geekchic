import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/main/ProductCard";
import { getProducts } from "../api/firebase";
// import useProducts from "../api/firebase";
// import { useRecoilValue } from "recoil";
// import { Link } from "react-router-dom";
// import { userState } from "../atoms/userAtom";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string;
}

const filters = ["전체", "아우터", "상의", "하의", "신발", "모자"];
export default function Products() {
  const { keyword } = useParams<{ keyword: string }>();
  // const user = useRecoilValue(userState);
  const searchKeyword = keyword || "";
  // const product = useProducts();
  const [filter, setFilter] = useState(filters[0]);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<Product[], Error>({
    queryKey: ["products", searchKeyword],
    queryFn: getProducts,
    // queryFn: () => product.search(searchKeyword),
  });

  {
    isLoading && <p>Loading..</p>;
  }
  {
    error && <p>Something is wrong</p>;
  }

  return (
    <div className="h-full min-h-screen">
      <Header />
      <SearchHeader />
      <div className="flex justify-center ">
        <ul className="flex justify-center gap-[45px] mt-[20px] mb-[40px] text-[23px] border-b-2 border-[#D9D9D9] w-[540px] pb-[15px]">
          {filters.map((value, index) => (
            <li key={index}>
              <button>{value}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        {products?.length !== 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] mb-[100px]">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <div className="h-[100vh]">
            <div className="text-2xl mt-[130px] mb-[40px]">
              검색하신 상품이 없어요.
            </div>
            <button className="w-[220px] py-2 bg-[#fff] text-[#8F5BBD] border border-[#8F5BBD] rounded-md hover:bg-[#8F5BBD] hover:text-[#fff] duration-200">
              상품으로 바로가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
