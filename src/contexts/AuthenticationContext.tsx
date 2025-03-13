import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { LoginRequest, RegisterRequest, User } from '../lib/types';
import { apiLogin, apiRegister, getUserByToken } from '../lib/apiClient';
import { replace } from 'react-router';

interface AuthenticationContextType {
  user: User | null | undefined; //defined ha talált, null ha nem és visszadobja login screenre, undefined ha tölt
  login: (request: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (request: RegisterRequest) => Promise<boolean>;
}
const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);
export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    //ha van jwt token, akkor lekéri a user adatait
    getUserByToken().then((res) => {
      setUser(res);
    });
    setLoading(false);
  }, []);

  async function login(request: LoginRequest) {
    const res = await apiLogin(request);
    if (res) {
      localStorage.setItem('jwtToken', res);
      const tokenUser = await getUserByToken();
      setUser(tokenUser);
      return true;
    }
    return false;
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem('jwtToken');
    replace('/');
  }

  async function register(request: RegisterRequest) {
    const res = await apiRegister(request);
    if (res) {
      localStorage.setItem('jwtToken', res);
      const tokenUser = await getUserByToken();
      setUser(tokenUser);
      return true;
    }
    return false;
  }

  return (
    <AuthenticationContext.Provider value={{ user, login, register, logout }}>
      {loading ? <div className='w-screen h-screen text-textColor bg-background'>Loading...</div> : children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('Context used outside provider');
  }
  return context;
};
export default AuthenticationContext;
