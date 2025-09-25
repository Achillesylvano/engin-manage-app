import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import {
  ArrowLeft,
  Briefcase,
  Globe,
  IdCard,
  LogOut,
  Mail,
  Settings,
  Smartphone,
  User,
} from "lucide-react-native";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AgentProfile() {
  const { user, logout, isLoading } = useAuth();
  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnecter",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };
  if (isLoading)
    return <Text className="text-center mt-10">Chargement...</Text>;

  const handleParameterPress = (parameter: string) => {
    Alert.alert("Paramètre", `Configuration de: ${parameter}`);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 pt-12 pb-8 px-6">
        <Link href="/" asChild>
          <TouchableOpacity className="mb-6">
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
        </Link>

        <View className="items-center">
          <View className="relative mb-4">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
              }}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <View className="absolute -bottom-1 -right-1 bg-green-400 w-6 h-6 rounded-full border-2 border-white" />
          </View>

          <Text className="text-black text-2xl font-bold mb-1">
            {user?.name}
          </Text>
          <Text className="text-primary-100 text-base">En ligne</Text>
        </View>
      </View>

      <View className="px-6 -mt-4">
        {/* Informations principales */}
        <View className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Informations personnelles
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <View className="bg-primary-100 p-2 rounded-lg mr-4">
                <User size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-500">Nom complet</Text>
                <Text className="text-base font-medium text-gray-800">
                  {user?.name}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="bg-primary-100 p-2 rounded-lg mr-4">
                <Briefcase size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-500">Rôle</Text>
                <Text className="text-base font-medium text-gray-800">
                  {user?.role_label}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="bg-primary-100 p-2 rounded-lg mr-4">
                <IdCard size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-500">Matricule</Text>
                <Text className="text-base font-medium text-gray-800">
                  {user?.matricule}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="bg-primary-100 p-2 rounded-lg mr-4">
                <Mail size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-500">Email</Text>
                <Text className="text-base font-medium text-gray-800">
                  {user?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Paramètres */}
        <View className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Paramètres
          </Text>

          <View className="space-y-3">
            <TouchableOpacity
              className="flex-row items-center py-3 px-2 active:bg-gray-50 rounded-lg"
              onPress={() => handleParameterPress("Langue")}
            >
              <View className="bg-purple-100 p-2 rounded-lg mr-4">
                <Globe size={18} color="#8b5cf6" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-800">
                  Langue et région
                </Text>
                <Text className="text-sm text-gray-500">Français (France)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center py-3 px-2 active:bg-gray-50 rounded-lg"
              onPress={() => handleParameterPress("Préférences d'affichage")}
            >
              <View className="bg-yellow-100 p-2 rounded-lg mr-4">
                <Smartphone size={18} color="#f59e0b" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-800">
                  Préférences d&apos;affichage
                </Text>
                <Text className="text-sm text-gray-500">
                  Thème et interface
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center py-3 px-2 active:bg-gray-50 rounded-lg"
              onPress={() => handleParameterPress("Paramètres avancés")}
            >
              <View className="bg-gray-100 p-2 rounded-lg mr-4">
                <Settings size={18} color="#6b7280" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-800">
                  Paramètres avancés
                </Text>
                <Text className="text-sm text-gray-500">
                  Configuration système
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity
          className="bg-red-500 p-4 rounded-2xl active:bg-red-600 mb-8"
          onPress={handleLogout}
        >
          <View className="flex-row items-center justify-center">
            <LogOut size={20} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">
              Se déconnecter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
