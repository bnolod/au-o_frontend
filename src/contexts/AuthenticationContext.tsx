import { createContext, ReactNode, useContext, useState } from "react";
import { LoginRequest, RegisterRequest, User } from "../lib/types";
import { apiFetch, getUserByToken } from "../lib/apiClient";

interface AuthenticationContextType {
  user: User | null | undefined; //defined ha talált, null ha nem és visszadobja login screenre, undefined ha tölt
  login: (request: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
}
const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);
export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  async function login() {
   
  }

  async function logout() {}

  async function register() {}

  return (
    <AuthenticationContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
    const context = useContext(AuthenticationContext)
    if (!context) {
        throw new Error("Context used outside provider")
    }
    return context
}
export default AuthenticationContext