import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";
import { AddProduct } from "../types/mainType";

interface AddProductVariables {
  product: AddProduct;
  url: string;
}

export default function NewProduct() {
  const [product, setProduct] = useState<Partial<AddProduct>>({});
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const addProduct = useMutation<void, Error, AddProductVariables>({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(files);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    if (file) {
      const url = await uploadImage(file);
      addProduct.mutate(
        { product: product as AddProduct, url },
        {
          onSuccess: () => {
            setSuccess("성공적으로 제품이 추가되었습니다.");
            setTimeout(() => setSuccess(null), 4000);
          },
        }
      );
      setIsUploading(false);
    } else {
      setIsUploading(false);
    }
  };

  return (
    <section className="w-[600px] container text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-5"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className="flex flex-col px-12 gap-1" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="제품명"
          name="title"
          value={product.title ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="가격"
          name="price"
          value={product.price ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="카테고리"
          name="category"
          value={product.category ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="제품 설명"
          name="description"
          value={product.description ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="옵션들(콤마(,)로 구분"
          name="options"
          value={product.options ?? ""}
          required
          onChange={handleChange}
        />
        <button
          className="mb-[100px] mt-[10px] py-3 bg-[#8F5BBD] text-[#fff] border border-[#8F5BBD] rounded-md hover:bg-[#fff] hover:text-[#8F5BBD] duration-200"
          disabled={isUploading}
        >
          {isUploading ? "uploading..." : "제품 등록하기"}
        </button>
      </form>
    </section>
  );
}
