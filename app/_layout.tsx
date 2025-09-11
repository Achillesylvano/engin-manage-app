import { AuthProvider, useAuth } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import "../global.css";

const roleRoutes = {
  agent_suivi: "/(agent)" as const,
  operateur: "/(operateur)" as const,
  technicien: "/(technicien)" as const,
};

const queryClient = new QueryClient();

function Header() {
  const { authToken, isLoading, user } = useAuth();
  const insets = useSafeAreaInsets();
  const href = roleRoutes[user?.role as keyof typeof roleRoutes] ?? "/login";

  if (authToken && !isLoading) {
    return (
      <>
        <SafeAreaView
          style={{ backgroundColor: "#FFFFFF", height: insets.top }}
        />
        <StatusBar style="dark" translucent />
        <Redirect href={href} />
      </>
    );
  }

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "#FFFFFF", height: insets.top }}
      />
      <StatusBar style="dark" translucent />
    </>
  );
}

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Slot />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
