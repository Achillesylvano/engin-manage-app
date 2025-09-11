import { StatCard } from "@/components/app/StatCard";

import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import {
  Activity,
  RotateCcw,
  Search,
  TrendingUp,
  Truck,
  User,
  Users,
} from "lucide-react-native";

import { DailyUsageCard } from "@/components/app/DailyUsageCard";
import Pagination from "@/components/core/Pagination";
import { useDailyUsages } from "@/hooks/useDailyUsages";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";

type IsReturned = "0" | "1" | undefined;

type Filters = {
  numero_serie?: string;
  operateur?: string;
  is_returned?: IsReturned;
  sort?: string;
};
export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    numero_serie: "",
    operateur: "",
    is_returned: undefined,
  });

  // Met à jour un filtre
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // revenir à la première page à chaque filtre
  };

  const { data, isLoading, error } = useDailyUsages(page, filters);

  if (isLoading)
    return <Text className="text-center mt-10">Chargement...</Text>;
  if (error)
    return <Text className="text-center mt-10">Erreur : {String(error)}</Text>;

  const dailyUsages = data?.data ?? [];
  const lastPage = data?.meta?.last_page ?? 1;

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{ backgroundColor: "#08CB00" }}
        className="px-6 py-2 shadow-sm"
      >
        <Text className="text-3xl font-extrabold text-white">
          Dashboard Agent
        </Text>
        <Text className="text-base text-white/90">
          Suivi des engins en temps réel
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Statistiques */}
        <View className="py-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Statistiques
          </Text>

          <View className="grid grid-cols-2 gap-3 mb-4">
            <StatCard
              title="Engins dans le parc"
              value={12}
              icon={<Truck size={24} />}
              color="primary"
            />
            <StatCard
              title="Sortis aujourd'hui"
              value={45}
              icon={<TrendingUp size={24} />}
              color="warning"
            />
          </View>

          <View className="grid grid-cols-2 gap-3 mb-4">
            <StatCard
              title="Actuellement sortis"
              value={65}
              icon={<Users size={24} />}
              color="info"
            />
            <StatCard
              title="Déjà retournés"
              value={57}
              icon={<RotateCcw size={24} />}
              color="success"
            />
          </View>

          <StatCard
            title="Mes mouvements enregistrés"
            value={5}
            icon={<Activity size={24} />}
            color="primary"
          />
        </View>

        {/* Filtres */}
        {/* Numéro de série */}
        <View className="mb-6">
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

        {/* Nom opérateur */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Opérateur
          </Text>
          <View className="relative">
            <View className="absolute left-4 top-4 z-10">
              <User size={18} color="#9CA3AF" />
            </View>
            <TextInput
              placeholder="Nom de l'opérateur..."
              placeholderTextColor="#9CA3AF"
              value={filters.operateur}
              onChangeText={(text) => updateFilter("operateur", text)}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-medium focus:border-green-500 focus:bg-white"
            />
          </View>
        </View>

        {/* Statut */}
        <View className="mb-2">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Statut
          </Text>
          <View className="bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden">
            <Picker
              selectedValue={filters.is_returned ?? ""}
              onValueChange={(value: string) =>
                updateFilter(
                  "is_returned",
                  (value === "" ? undefined : value) as Filters["is_returned"]
                )
              }
              className="h-14 text-gray-900"
            >
              <Picker.Item
                label="🔄 Tous les statuts"
                value=""
                color="#374151"
              />
              <Picker.Item label="📤 Sortie" value="0" color="#EF4444" />
              <Picker.Item label="📥 Retour" value="1" color="#10B981" />
            </Picker>
          </View>
        </View>

        {/* Mouvements récents */}
        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Mouvements récents
          </Text>

          {/* Liste des usages */}
          {dailyUsages.length > 0 ? (
            dailyUsages.map((usage) => (
              <DailyUsageCard key={usage.id} dailyUsage={usage} />
            ))
          ) : (
            <Text>Aucun DailyUsage reçu</Text>
          )}
        </View>

        {/* Pagination réutilisable */}
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
