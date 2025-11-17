import { DailyUsageEncoursCard } from "@/components/app/DailyUsageEncoursCard";
import Input from "@/components/core/Input";
import Pagination from "@/components/core/Pagination";
import {
  useDailyUsagesEncours,
  useUpdateDailyUsage,
} from "@/hooks/useDailyUsages";
import { DailyUsage, DailyUsageRetour } from "@/types";
import { getCurrentDateTime } from "@/utils/date";
import { StatusBar } from "expo-status-bar";
import { FileText, MapPin, Search, User, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Filters = {
  numero_serie?: string;
  operateur?: string;
  sort?: string;
};

export default function EnginSortie() {
  const { mutate: updateDailyUsage, isPending } = useUpdateDailyUsage();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    numero_serie: "",
    operateur: "",
  });

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // revenir à la première page à chaque filtre
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDailyUsage, setSelectedDailyUsage] =
    useState<DailyUsage | null>(null);

  const [formData, setFormData] = useState<DailyUsageRetour>({
    heure_retour: "", // rempli automatiquement ou saisi à la fin
    compteur_h_retour: 0, // obligatoire au retour
    compteur_km_retour: 0, // obligatoire au retour
    observation_retour: "", // optionnel
    carburant_rempli_l: 0, // optionnel
    is_returned: true, // toujours true au retour
  });
  const [errors, setErrors] = useState<{
    observation_retour?: string;
    heure_retour?: string;
    compteur_h_retour?: string;
    compteur_km_retour?: string;
    carburant_rempli_l?: string;
  }>({});

  const openModal = (dailyUsage: DailyUsage) => {
    setSelectedDailyUsage(dailyUsage);
    setFormData({
      ...formData, // garde les valeurs existantes
      heure_retour: getCurrentDateTime(),
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDailyUsage(null);
    setFormData({
      heure_retour: "",
      compteur_h_retour: 0,
      compteur_km_retour: 0,
      observation_retour: null,
      carburant_rempli_l: null,
      is_returned: true,
    });
    setErrors({});
  };

  const handleChange = (key: keyof DailyUsageRetour, value: string) => {
    setFormData({
      ...formData,
      [key]:
        key === "compteur_h_retour" || key === "compteur_km_retour"
          ? parseFloat(value) || 0
          : value,
    });
    setErrors({ ...errors, [key]: "" });
  };

  const { data, isLoading, error } = useDailyUsagesEncours(page, filters);
  if (isLoading)
    return <Text className="text-center mt-10">Chargement...</Text>;
  if (error)
    return <Text className="text-center mt-10">Erreur : {String(error)}</Text>;

  const dailyUsages = data?.data ?? [];
  const lastPage = data?.meta?.last_page ?? 1;

  const handleSubmit = () => {
    if (!selectedDailyUsage?.id) {
      Alert.alert("Aucune DailyUsage sélectionnée");
      return;
    }
    setErrors({});

    updateDailyUsage(
      { id: selectedDailyUsage?.id, payload: formData },
      {
        onError: (validationErrors: Record<string, string[]>) => {
          const fieldErrors: { [key: string]: string } = {};
          Object.keys(validationErrors).forEach((key) => {
            fieldErrors[key] = validationErrors[key][0];
          });
          setErrors(fieldErrors);
        },
        onSuccess: (data) => {
          console.log("Retour DailyUsage enregistré:", data);
          closeModal();
          Alert.alert("Retour enregistré avec succès");
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{ backgroundColor: "#08CB00" }}
        className="px-6 py-2 shadow-sm"
      >
        <Text className="text-3xl font-extrabold text-white">
          Parc d&apos;engins
        </Text>
        <Text className="text-base text-white/90">
          Liste des engins disponibles
        </Text>
      </View>

      {/* Liste des engins */}
      <ScrollView className="flex-1 px-4 py-4">
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

        {/* Mouvements récents */}
        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Mouvements récents
          </Text>

          {/* Liste des usages */}
          {dailyUsages.length > 0 ? (
            dailyUsages.map((usage) => (
              <DailyUsageEncoursCard
                key={usage.id}
                dailyUsage={usage}
                openModal={openModal}
              />
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

      {/* Modal de formulaire */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 max-h-[90%] shadow-lg">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-extrabold text-gray-900">
                Retour d&apos;Engin
              </Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-full p-2"
                onPress={closeModal}
              >
                <X size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                Informations sortie
              </Text>
              {selectedDailyUsage && (
                <View className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                  <Text className="font-bold text-gray-900 text-lg mb-1">
                    {selectedDailyUsage.engin?.designation}
                  </Text>
                  <Text className="text-gray-600">
                    Type : {selectedDailyUsage.engin?.type_engin?.nom}
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">
                      Compteur Heures (sortie):
                    </Text>
                    <Text className="font-semibold text-gray-800">
                      {selectedDailyUsage.compteur_h_sortie} h
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">Compteur Km (sortie):</Text>
                    <Text className="font-semibold text-gray-800">
                      {selectedDailyUsage.compteur_km_sortie} h
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">Heure (sortie):</Text>
                    <Text className="font-semibold text-gray-800">
                      {selectedDailyUsage.heure_sortie}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">Opérateur:</Text>
                    <Text className="font-semibold text-gray-800">
                      {selectedDailyUsage.operateur?.name}
                    </Text>
                  </View>
                </View>
              )}

              {/* Formulaire */}
              <View className="space-y-5">
                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    <MapPin size={16} color="#6b7280" /> Compteur heure (retour)
                  </Text>
                  <Input
                    placeholder="Compteur heures"
                    value={formData.compteur_h_retour?.toString() || ""}
                    onChangeText={(value) =>
                      handleChange("compteur_h_retour", value)
                    }
                    error={errors.compteur_h_retour}
                  />
                </View>

                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    <MapPin size={16} color="#6b7280" /> Compteur km (retour)
                  </Text>
                  <Input
                    placeholder="Compteur kilomètres"
                    value={formData.compteur_km_retour?.toString() || ""}
                    onChangeText={(value) =>
                      handleChange("compteur_km_retour", value)
                    }
                    error={errors.compteur_km_retour}
                  />
                </View>

                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    <MapPin size={16} color="#6b7280" /> Carburant (L)
                  </Text>
                  <Input
                    placeholder="Quantité de carburant"
                    value={formData.carburant_rempli_l?.toString() || ""}
                    onChangeText={(value) =>
                      handleChange("carburant_rempli_l", value)
                    }
                    error={errors.carburant_rempli_l}
                  />
                </View>

                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    <FileText size={16} color="#6b7280" /> Description
                    (optionnel)
                  </Text>
                  <Input
                    placeholder="Description ou remarques..."
                    value={formData.observation_retour ?? ""}
                    onChangeText={(value) =>
                      handleChange("observation_retour", value)
                    }
                    error={errors.observation_retour}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Boutons */}
              <View className="flex-row space-x-3 mt-8 gap-2">
                <TouchableOpacity
                  className="flex-1 bg-gray-100 rounded-xl py-3 shadow-sm"
                  onPress={closeModal}
                >
                  <Text className="text-gray-700 font-semibold text-center">
                    Annuler
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-green-500 rounded-xl py-3 shadow-sm"
                  onPress={handleSubmit}
                  disabled={isPending}
                >
                  <View className="flex-row justify-center items-center">
                    {isPending && (
                      <ActivityIndicator
                        size="small"
                        color="#ffffff"
                        className="mr-3"
                      />
                    )}
                    <Text className="text-white text-center font-semibold">
                      Enregistrer
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
