import { useAuth } from "@/context/AuthContext";
import { Button, Text, View } from "react-native";

export default function OperateurIncident() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Incidents ici Technicien
      </Text>
      <Text style={{ marginBottom: 5 }}>Nom: {user?.name}</Text>
      <Text style={{ marginBottom: 20 }}>Rôle: {user?.role}</Text>

      <Button title="Se déconnecter" onPress={logout} />
    </View>
  );
}
