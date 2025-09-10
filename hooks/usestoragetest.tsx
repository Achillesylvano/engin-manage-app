import axiosInstance from "@/config/axiosConfig";
import { useStorageState } from "@/hooks/useStorageState";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  matricule?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  login: (token: string, user: User) => void;
  logout: () => void;
  authToken?: string | null;
  user?: User | null;
  isLoading: boolean;
  setUserData: (userData: User) => void;
}

// -----------------------------
// Contexte
// -----------------------------
const AuthContext = createContext<AuthContextType>({
  login: () => null,
  logout: () => null,
  authToken: null,
  user: null,
  isLoading: false,
  setUserData: async () => {},
});

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within <AuthProvider/>");
  }
  return value;
}

// -----------------------------
// Provider
// -----------------------------
export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, authToken], setAuthToken] = useStorageState("auth_token");
  const [[, storedUser], setStoredUser] = useStorageState("auth_user");

  // Définir / mettre à jour les infos utilisateur
  const setUserData = async (userData: User) => {
    try {
      await setStoredUser(JSON.stringify(userData));
    } catch (e) {
      console.error("❌ Failed to update user:", e);
      throw e;
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      if (authToken) {
        await axiosInstance.post(
          "/api/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      }
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      setAuthToken(null);
      setStoredUser(null);
      router.replace("/login");
    }
  };

  // Récupération utilisateur depuis API
  const fetchUser = useCallback(
    async (token: string) => {
      try {
        const response = await axiosInstance.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStoredUser(JSON.stringify(response.data));
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          console.warn("⚠️ Token expiré → logout auto");
          setAuthToken(null);
          setStoredUser(null);
          router.replace("/login");
        } else {
          console.error("❌ Error fetching user info:", error);
        }
      }
    },
    [setStoredUser, setAuthToken]
  );

  // Parse user data from storage if available
  const parsedUser = storedUser
    ? (() => {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error("Failed to parse user data:", e);
          return null;
        }
      })()
    : null;

  // Auto-fetch si token existe
  useEffect(() => {
    if (authToken) {
      fetchUser(authToken);
    }
  }, [authToken, fetchUser]);

  // Connexion (sauvegarde token + user)
  const login = async (token: string, userData: User) => {
    try {
      await setAuthToken(token);
      await setStoredUser(JSON.stringify(userData));
    } catch (error) {
      console.error("❌ Error during login:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        authToken,
        user: parsedUser,
        isLoading,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
