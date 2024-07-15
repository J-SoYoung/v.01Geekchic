import React, { useState, ChangeEvent, FormEvent } from "react";
import { uploadImage } from "../api/uploader";

interface Product {
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
}

export default function NewProduct() {
  const [product, setProduct] = useState<Partial<Product>>({});
  const [file, setFile] = useState<File | null>(null);

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
    if (file) {
      const url = await uploadImage(file);
      console.log(url);
    }
  };
  return (
    <section>
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          className=""
          type="text"
          placeholder="제품명"
          name="title"
          value={product.title ?? ""}
          required
          onChange={handleChange}
        />
        <input
          className=""
          type="number"
          placeholder="가격"
          name="price"
          value={product.price ?? ""}
          required
          onChange={handleChange}
        />
        <input
          className=""
          type="text"
          placeholder="카테고리"
          name="category"
          value={product.category ?? ""}
          required
          onChange={handleChange}
        />
        <input
          className=""
          type="text"
          placeholder="제품 설명"
          name="description"
          value={product.description ?? ""}
          required
          onChange={handleChange}
        />
        <input
          className=""
          type="text"
          placeholder="옵션들(콤마(,)로 구분"
          name="options"
          value={product.options ?? ""}
          required
          onChange={handleChange}
        />
        <button>제품 등록하기</button>
      </form>
    </section>
  );
}
