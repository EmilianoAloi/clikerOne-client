import { useContext } from "react";
import { LoginContext } from "./LoginProvider"; // ajustá el path si es necesario

export const useLogin = () => useContext(LoginContext);
