import { atom } from "recoil";
import { User } from "firebase/auth";

interface AdminUser extends User {
  isAdmin: boolean;
}

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string[];
}

export const userState = atom<AdminUser | null>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem("userState");
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (newValue != null) {
          localStorage.setItem("userState", JSON.stringify(newValue));
        } else {
          localStorage.removeItem("userState");
        }
      });
    },
  ],
});

export const wishlistState = atom<Product[]>({
  key: "wishlistState",
  default: [],
});
