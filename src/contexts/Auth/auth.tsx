import React, { createContext } from "react";
import * as auth from "../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(): Promise<void>;
  signOut(): void;
  loading: boolean;
  componentLoading: boolean;
  darkMode: boolean;
  setDarkModeToggler(): void;
  setLightModeToggler(): void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = React.useState<object | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [componentLoading, setComponentLoading] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@Auth:User");
      const storagedToken = await AsyncStorage.getItem("@Auth:Token");

      if (storagedToken && storagedUser) {
        setUser(JSON.parse(storagedUser));
        setComponentLoading(false);
      }
    }
    loadStoragedData();
  }, []);

  React.useEffect(() => {
    async function setDarkModeOnLoad() {
      const response = await AsyncStorage.getItem("@Theme");

      if (response != null) {
        setDarkMode(true);
      } else if (response == null) {
        setDarkMode(false);
      }
    }
    setDarkModeOnLoad();
  }, []);

  async function setDarkModeToggler() {
    await AsyncStorage.setItem("@Theme", "dark");
    setDarkMode(true);
  }

  async function setLightModeToggler() {
    await AsyncStorage.removeItem("@Theme");
    setDarkMode(false);
  }

  async function signIn() {
    setLoading(true);
    const response = await auth.signIn();

    setUser(response.user);

    await AsyncStorage.multiSet([
      ["@Auth:User", JSON.stringify(response.user)],
      ["@Auth:Token", response.token],
    ]);
    setLoading(false);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        loading,
        signOut,
        componentLoading,
        darkMode,
        setDarkModeToggler,
        setLightModeToggler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
