import { useEffect, useState, createContext } from "react";
import { getToken, setToken, removeToken } from "../api/token";
import { validateApi, meApi } from "../api/auth";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  loginout: () => null,
  customer: undefined,
});

export function AuthProvider(props) {
  const { children } = props;

  const [auth, setAuth] = useState(undefined);
  const [customer, setCustomer] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        try {
          const { data: me } = await meApi();
          setAuth({ token, me });
        } catch (error) {
          // removeToken();
          setAuth(null);
          setCustomer(null);
        }
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = async (data) => {
    const { jwt } = data;
    setToken(jwt);
    const { data: me } = await meApi();
    setAuth({ token: jwt, me });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      setCustomer(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
