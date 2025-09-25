import { useAuth } from "@/context/AuthContext";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AgentLayout = () => {
  const { user, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  // Redirection si le rôle n'est pas technicien
  if (!isLoading && user?.role !== "technicien") {
    switch (user?.role) {
      case "operateur":
        return <Redirect href="/(operateur)" />;
      case "agent_suivi":
        return <Redirect href="/(agent)" />;
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
