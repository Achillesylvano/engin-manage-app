import MaintenanceCard from "@/components/app/MaintenanceCard";
import Pagination from "@/components/core/Pagination";
import { useMaintenance } from "@/hooks/useMaintenance";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  XCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Filters = {
  type?: string;
  statut?: string;
  numero_serie?: string;
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "corrective":
      return "bg-red-100 border-red-500";
    case "préventive":
      return "bg-orange-100 border-orange-500";
    default:
      return "bg-blue-100 border-blue-500";
  }
};

const getPriorityTextColor = (priority: string) => {
  switch (priority) {
    case "corrective":
      return "text-red-700";
    case "préventive":
      return "text-orange-700";
    default:
      return "text-blue-700";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "corrective":
      return <AlertTriangle size={16} color="#dc2626" />;
    case "préventive":
      return <Clock size={16} color="#ea580c" />;
    default:
      return <Calendar size={16} color="#2563eb" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Planifiée":
      return "bg-blue-100 text-blue-800";

    case "En cours":
      return "bg-yellow-100 text-yellow-800";

    case "Terminée":
      return "bg-green-100 text-green-800";

    case "Annulée":
      return "bg-red-100 text-red-800";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Planifiée":
      return <Calendar size={16} color="#2563eb" />;

    case "En cours":
      return <Clock size={16} color="#d97706" />;

    case "Terminée":
      return <CheckCircle2 size={16} color="#059669" />;

    case "Annulée":
      return <XCircle size={16} color="#dc2626" />;

    default:
      return <Calendar size={16} color="#6b7280" />;
  }
};

export default function MissionsScreen() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    type: "",
    statut: "",
    numero_serie: "",
  });

  // Met à jour filtre
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    console.log("FILTER UPDATE →", key, value);
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const { data, isLoading, error } = useMaintenance(page, filters);

  if (isLoading)
    return <Text className="text-center mt-10">Chargement...</Text>;
  if (error)
    return <Text className="text-center mt-10">Erreur : {String(error)}</Text>;

  const maintenances = data?.data ?? [];
  const lastPage = data?.meta?.last_page ?? 1;

  const STATUTS = [
    { label: "Tous", value: "" },
    { label: "Annulée", value: "annulee" },
    { label: "En cours", value: "en cours" },
    { label: "Terminée", value: "terminee" },
    { label: "Planifiée", value: "planifiee" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-6 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Missions de maintenance
        </Text>

        {/* Filtres */}
        {/* Numéro de série */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Numéro de série
          </Text>
          <View className="relative">
            <View className="absolute left-4 top-4 z-10">
              <Search size={18} color="#9CA3AF" />
            </View>
            <TextInput
              placeholder="Rechercher un numéro de série..."
              placeholderTextColor="#9CA3AF"
              value={filters.numero_serie}
              onChangeText={(text) => updateFilter("numero_serie", text)}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-medium focus:border-green-500 focus:bg-white"
            />
          </View>
        </View>
      </View>

      {/* Filter Buttons statut*/}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View className="flex-row flex-wrap gap-2">
              {STATUTS.map((statut) => (
                <Pressable
                  key={statut.value}
                  onPress={() => updateFilter("statut", statut.value)}
                  className={`px-4 py-2 rounded-xl border
          ${
            filters.statut === statut.value
              ? "bg-green-600 border-green-600"
              : "bg-gray-50 border-gray-200"
          }
        `}
                >
                  <Text
                    className={`font-medium
            ${filters.statut === statut.value ? "text-white" : "text-gray-700"}
          `}
                  >
                    {statut.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Mission List */}
      <ScrollView className="flex-1 px-6 py-4">
        {maintenances.map((maintenance) => (
          <MaintenanceCard
            key={maintenance.id}
            maintenance={maintenance}
            getPriorityColor={getPriorityColor}
            getPriorityTextColor={getPriorityTextColor}
            getPriorityIcon={getPriorityIcon}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        ))}

        {maintenances.length === 0 && (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-center">
              Aucune mission trouvée pour les critères sélectionnés
            </Text>
          </View>
        )}

        <View className="mb-6">
          <Pagination
            currentPage={page}
            lastPage={lastPage}
            onPageChange={(p) => setPage(p)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
