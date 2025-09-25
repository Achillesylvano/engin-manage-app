import { useAuth } from "@/context/AuthContext";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AgentLayout = () => {
  const { user, isLoading } = useAuth();

  // Redirection si le rôle n'est pas agent_suivi
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
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#08CB00",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 70, // hauteur fixe
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

        {/* Profile */}
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
    </SafeAreaView>
  );
};

export default AgentLayout;
