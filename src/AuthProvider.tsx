import { useContext, createContext, useState, ReactNode } from "react";
import { user } from "./types/todo";

export type AuthContextType = {
  User: user | null;
  userInfo: string;
  loginAction: (data: { name: string; password: string }) => void;
};

// sets the default value of the context to undefined initially.
const AuthContext = createContext<AuthContextType | undefined>(undefined); //creates a context object using the createContext function
//  is used node to representing any React node.
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [User, setUser] = useState<user | null>(null);
  const [userInfo, setUserInfo] = useState<string>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "").name
      : ""
  );

  const loginAction = async (data: user) => {
    //fun to takes user data as an object then  performs the login action (sending a request to the server)
    setUser(data);
    setUserInfo(data.name);
  };

  return (
    <AuthContext.Provider value={{ userInfo, User, loginAction }}>
      {children}
    </AuthContext.Provider>
  );
};
//==
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
