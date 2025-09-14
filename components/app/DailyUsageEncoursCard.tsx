import { DailyUsage } from "@/types/index";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Fuel,
  Gauge,
  MapPin,
  User,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DailyUsageCardProps {
  dailyUsage: DailyUsage;
  openModal: (dailyUsage: DailyUsage) => void;
}

export function DailyUsageEncoursCard({
  dailyUsage,
  openModal,
}: DailyUsageCardProps) {
  const isRetour = dailyUsage.is_returned;

  // Fonction pour formatter en date/heure français
  const formatDateTime = (datetime?: string) => {
    if (!datetime) return "-";
    return new Date(datetime).toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <View className="bg-white p-4 rounded-3xl border border-gray-100 shadow-lg mb-4">
      {/* Header : Engin + Badge */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View
            className={`p-3 rounded-full mr-3 ${
              isRetour ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {isRetour ? (
              <ArrowDown size={18} className="text-green-600" />
            ) : (
              <ArrowUp size={18} className="text-red-500" />
            )}
          </View>

          <View>
            <Text className="font-semibold text-gray-900 text-base">
              {dailyUsage.engin?.designation}
            </Text>

            {/* Badge Sortie / Retour */}
            <View
              className={`mt-1 px-2 py-1 rounded-full self-start ${
                isRetour ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  isRetour ? "text-green-700" : "text-red-600"
                }`}
              >
                {isRetour ? "RETOUR" : "SORTIE"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Site */}
      <View className="flex-row items-center mb-3">
        <MapPin size={14} className="text-gray-400 mr-2" />
        <Text className="text-sm text-gray-700 flex-1">
          {dailyUsage.site_destination}
        </Text>
      </View>

      {/* Opérateur */}
      <View className="flex-row items-center mb-3">
        <User size={14} className="text-gray-400 mr-2" />
        <Text className="text-sm text-gray-700 flex-1">
          {dailyUsage.operateur?.name ?? "N/A"}
        </Text>
      </View>

      {/* Heure sortie ou retour en bas, formatée */}
      <View className="flex-row items-center mb-3">
        <Clock size={14} className="text-gray-400 mr-1" />
        <Text className="text-sm text-gray-600 font-medium">
          {isRetour
            ? formatDateTime(dailyUsage.heure_retour ?? undefined)
            : formatDateTime(dailyUsage.heure_sortie ?? undefined)}
        </Text>
      </View>

      {/* Statistiques */}
      <View className="flex-row justify-between mb-3">
        {isRetour && dailyUsage.compteur_h_retour !== undefined ? (
          <View className="flex-row items-center">
            <Gauge size={14} className="text-gray-400 mr-1" />
            <Text className="text-xs text-gray-600">
              {dailyUsage.compteur_h_retour}h
            </Text>
          </View>
        ) : !isRetour && dailyUsage.compteur_h_sortie !== undefined ? (
          <View className="flex-row items-center">
            <Gauge size={14} className="text-gray-400 mr-1" />
            <Text className="text-xs text-gray-600">
              {dailyUsage.compteur_h_sortie}h
            </Text>
          </View>
        ) : null}

        {isRetour && dailyUsage.compteur_km_retour !== undefined ? (
          <View className="flex-row items-center">
            <Gauge size={14} className="text-gray-400 mr-1" />
            <Text className="text-xs text-gray-600">
              {dailyUsage.compteur_km_retour?.toLocaleString()}km
            </Text>
          </View>
        ) : !isRetour && dailyUsage.compteur_km_sortie !== undefined ? (
          <View className="flex-row items-center">
            <Gauge size={14} className="text-gray-400 mr-1" />
            <Text className="text-xs text-gray-600">
              {dailyUsage.compteur_km_sortie?.toLocaleString()}km
            </Text>
          </View>
        ) : null}

        {dailyUsage.carburant_rempli_l !== undefined && (
          <View className="flex-row items-center">
            <Fuel size={14} className="text-gray-400 mr-1" />
            <Text className="text-xs text-gray-600">
              {dailyUsage.carburant_rempli_l} L
            </Text>
          </View>
        )}
      </View>
      {/* Bouton */}
      <TouchableOpacity
        className="bg-green-600 active:bg-green-700 rounded-xl py-3 flex-row items-center justify-center shadow-sm"
        onPress={() => openModal(dailyUsage)}
      >
        <MapPin size={18} color="white" />
        <Text className="text-white font-semibold ml-2">
          Enregistrer Sortie
        </Text>
      </TouchableOpacity>
    </View>
  );
}
