import { atom } from "recoil";
import { User } from "firebase/auth";

interface AdminUser extends User {
  isAdmin: boolean;
}

export const userState = atom<AdminUser | null>({
  key: "userState",
  default: null,
});
