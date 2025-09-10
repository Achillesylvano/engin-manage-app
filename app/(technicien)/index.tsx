import { useAuth } from "@/context/AuthContext";
import { Button, Text, View } from "react-native";

export default function TechnicienDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Dashboard Technicien
      </Text>
      <Text style={{ marginBottom: 5 }}>Nom: {user?.name}</Text>
      <Text style={{ marginBottom: 20 }}>Rôle: {user?.role}</Text>

      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
}
