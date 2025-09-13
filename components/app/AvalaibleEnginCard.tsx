import { Engin } from "@/types";
import { MapPin, Truck } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type AvailableEnginCardProps = {
  engin: Engin;
  openModal: (engin: Engin) => void;
};

const AvailableEnginCard = ({ engin, openModal }: AvailableEnginCardProps) => (
  <View className="bg-white rounded-2xl p-5 mb-4 shadow-md border border-gray-100">
    {/* Header */}
    <View className="flex-row items-center mb-4">
      <View className="bg-blue-100 p-2 rounded-full">
        <Truck size={22} color="#2563eb" />
      </View>
      <Text className="text-lg font-bold text-gray-800 ml-3 flex-1">
        {engin.designation}
      </Text>
    </View>

    {/* Infos */}
    <View className="mb-4 space-y-1">
      <Text className="text-gray-500">
        <Text className="font-medium text-gray-700">Type :</Text>{" "}
        {engin.type_engin?.nom}
      </Text>
      <Text className="text-gray-500">
        <Text className="font-medium text-gray-700">ID :</Text> #{engin.id}
      </Text>
      <Text className="text-gray-500">
        <Text className="font-medium text-gray-700">Numéro de série :</Text>
        {engin.numero_serie}
      </Text>

      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-500">
          <Text className="font-medium text-gray-700">Heures :</Text>{" "}
          {engin.compteur_h}h
        </Text>
        <Text className="text-gray-500">
          <Text className="font-medium text-gray-700">Km :</Text>{" "}
          {engin.compteur_km.toLocaleString()}
        </Text>
      </View>
    </View>

    {/* Bouton */}
    <TouchableOpacity
      className="bg-green-600 active:bg-green-700 rounded-xl py-3 flex-row items-center justify-center shadow-sm"
      onPress={() => openModal(engin)}
    >
      <MapPin size={18} color="white" />
      <Text className="text-white font-semibold ml-2">Enregistrer Sortie</Text>
    </TouchableOpacity>
  </View>
);

export default AvailableEnginCard;
