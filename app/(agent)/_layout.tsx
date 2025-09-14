import { useAuth } from "@/context/AuthContext";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AgentLayout = () => {
  const { user, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  // Redirection si le rôle n'est pas technicien
  if (!isLoading && user?.role !== "agent_suivi") {
    switch (user?.role) {
      case "operateur":
        return <Redirect href="/(operateur)" />;
      case "technicien":
        return <Redirect href="/(technicien)" />;
      default:
        return <Redirect href="/login" />;
    }
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#08CB00",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 80,
          paddingBottom: insets.bottom + 10, // important pour ne pas cacher la tab bar
        },
      }}
    >
      {/* Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="dashboard" size={size} color={color} />
          ),
        }}
      />

      {/* Sortie */}
      <Tabs.Screen
        name="sortie"
        options={{
          title: "Sortie",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="exit-to-app" size={size} color={color} />
          ),
        }}
      />

      {/* Retour */}
      <Tabs.Screen
        name="retour"
        options={{
          title: "Retour",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="open-in-app"
              size={size}
              color={color}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          ),
        }}
      />

      {/* Incident */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AgentLayout;
