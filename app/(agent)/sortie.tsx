import AvailableEnginCard from "@/components/app/AvalaibleEnginCard";
import Input from "@/components/core/Input";
import Pagination from "@/components/core/Pagination";
import SearchableDropdown from "@/components/core/SearchableDropdown";
import { useCreateDailyUsage } from "@/hooks/useDailyUsages";
import { useEnginDisponibles } from "@/hooks/useEngin";
import { useOperateur } from "@/hooks/useOperateur";
import { DailyUsage, Engin } from "@/types";
import { getCurrentDateTime } from "@/utils/date";
import { StatusBar } from "expo-status-bar";
import { FileText, MapPin, Search, User, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FiltersEngin = {
  numero_serie?: string;
  designation?: string;
  sort?: string;
};

export default function EnginsScreen() {
  const { mutate: createDailyUsage, isPending } = useCreateDailyUsage();

  const [filtersEngins, setFiltersEngins] = useState({
    numero_serie: "",
    designation: "",
  });

  const [pageEngins, setPageEngins] = useState(1);

  const {
    data: enginsData,
    isLoading: loadingEngins,
    error: enginsError,
  } = useEnginDisponibles(pageEngins, filtersEngins);

  // Hook pour récupérer tous les opérateurs (ou côté API limité si gros volume)
  const {
    data: operateursData,
    isLoading: loadingOperateur,
    error: operateursError,
  } = useOperateur(1, { matricule: "" });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEngin, setSelectedEngin] = useState<Engin | null>(null);
  const [formData, setFormData] = useState<DailyUsage>({
    id: 0,
    date_usage: "", // sera rempli automatiquement avec la date/heure actuelle
    site_destination: "", // à saisir
    observation_depart: "", // optionnel, à saisir
    heure_sortie: "", // sera rempli automatiquement ou via le smartphone
    heure_retour: "", // reste vide à la sortie
    is_returned: false, // toujours false à la sortie
    compteur_h_sortie: null, // rempli à la sortie
    compteur_km_sortie: null, // rempli à la sortie
    compteur_h_retour: null, // vide à la sortie
    compteur_km_retour: null, // vide à la sortie
    observation_retour: null, // vide à la sortie
    carburant_rempli_l: null, // vide à la sortie
    engin: undefined, // sera rempli avec l’engin sélectionné
    operateur: undefined, // facultatif ou choisi dans le select
    engin_id: 0,
    agent_suivi_id: 0,
    operateur_id: 0,
  });
  const [errors, setErrors] = useState<{
    site_destination?: string;
    observation_depart?: string;
    operateur_id?: string;
    engin_id?: string;
    date_usage?: string;
    heure_sortie?: string;
    compteur_h_sortie?: string;
    compteur_km_sortie?: string;
  }>({});

  // Met à jour un filtre
  const updateFilter = <K extends keyof FiltersEngin>(
    key: K,
    value: FiltersEngin[K]
  ) => {
    setFiltersEngins((prev) => ({ ...prev, [key]: value }));
    setPageEngins(1); // revenir à la première page à chaque filtre
  };

  const openModal = (engin: Engin) => {
    setSelectedEngin(engin);
    setFormData({
      ...formData, // garde les valeurs existantes
      engin_id: engin.id, // met à jour l’engin sélectionné
      compteur_h_sortie: engin.compteur_h, // récupère compteur horaire actuel
      compteur_km_sortie: engin.compteur_km, // récupère compteur km actuel
      date_usage: getCurrentDateTime(), // date/heure actuelle
      heure_sortie: getCurrentDateTime(),
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEngin(null);
    setFormData({
      id: 0,
      date_usage: "",
      site_destination: "",
      observation_depart: "",
      heure_sortie: "",
      heure_retour: "",
      is_returned: false,
      compteur_h_sortie: null,
      compteur_km_sortie: null,
      compteur_h_retour: null,
      compteur_km_retour: null,
      observation_retour: null,
      carburant_rempli_l: null,
      engin: undefined,
      operateur: undefined,
      engin_id: 0,
      agent_suivi_id: 0,
      operateur_id: 0,
    });
    setErrors({});
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const handleSubmit = () => {
    setErrors({});
    const submitData = {
      site_destination: formData.site_destination || "",
      observation_depart: formData.observation_depart || "",
      operateur_id: formData.operateur_id,
      engin_id: formData.engin_id,
      date_usage: formData.date_usage || "",
      heure_sortie: formData.heure_sortie || "",
      compteur_h_sortie: formData.compteur_h_sortie || 0,
      compteur_km_sortie: formData.compteur_km_sortie || 0,
    };

    createDailyUsage(submitData, {
      onError: (validationErrors: Record<string, string[]>) => {
        const fieldErrors: { [key: string]: string } = {};
        Object.keys(validationErrors).forEach((key) => {
          fieldErrors[key] = validationErrors[key][0];
        });
        setErrors(fieldErrors);
      },
      onSuccess: (data) => {
        console.log("DailyUsage créé:", data);
        closeModal();
        Alert.alert("Sortie enregistrer ");
      },
    });
  };

  if (loadingEngins)
    return <Text className="text-center mt-10">Chargement...</Text>;
  if (enginsError)
    return (
      <Text className="text-center mt-10">Erreur : {String(enginsError)}</Text>
    );

  const engins = enginsData?.data ?? [];
  const lastPageEngin = enginsData?.meta?.last_page ?? 1;

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
          <Text className="text-md font-bold text-gray-700 mb-2">
            Numéro de série
          </Text>
          <View className="relative">
            <View className="absolute left-4 top-4 z-10">
              <Search size={18} color="#9CA3AF" />
            </View>
            <TextInput
              placeholder="Rechercher un numéro de série..."
              placeholderTextColor="#9CA3AF"
              value={filtersEngins.numero_serie}
              onChangeText={(text) => updateFilter("numero_serie", text)}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-medium focus:border-green-500 focus:bg-white"
            />
          </View>
        </View>

        {/* Numéro de série */}
        <View className="mb-6">
          <Text className="text-md font-bold text-gray-700 mb-2">
            Designation
          </Text>
          <View className="relative">
            <View className="absolute left-4 top-4 z-10">
              <Search size={18} color="#9CA3AF" />
            </View>
            <TextInput
              placeholder="Rechercher..."
              placeholderTextColor="#9CA3AF"
              value={filtersEngins.designation}
              onChangeText={(text) => updateFilter("designation", text)}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-medium focus:border-green-500 focus:bg-white"
            />
          </View>
        </View>

        {engins.length > 0 ? (
          engins.map((engin) => (
            <AvailableEnginCard
              key={engin.id}
              engin={engin}
              openModal={openModal}
            />
          ))
        ) : (
          <Text>Aucun Engin disponibles</Text>
        )}

        {/* Pagination réutilisable */}
        <View className="mb-6">
          <Pagination
            currentPage={pageEngins}
            lastPage={lastPageEngin}
            onPageChange={(p) => setPageEngins(p)}
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
                Sortie d&apos;Engin
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
              {selectedEngin && (
                <View className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                  <Text className="font-bold text-gray-900 text-lg mb-1">
                    {selectedEngin.designation}
                  </Text>
                  <Text className="text-gray-600">
                    Type : {selectedEngin.type_engin?.nom}
                  </Text>
                </View>
              )}

              {/* Informations pré-remplies */}
              <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 mb-3">
                  Informations Engin
                </Text>

                <View className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">ID Engin :</Text>
                    <Text className="font-semibold text-gray-800">
                      {formData.engin_id}
                    </Text>
                  </View>
                  <View className="h-[1px] bg-gray-200" />
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">Compteur Heures :</Text>
                    <Text className="font-semibold text-gray-800">
                      {formData.compteur_h_sortie} h
                    </Text>
                  </View>
                  <View className="h-[1px] bg-gray-200" />
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">Compteur KM :</Text>
                    <Text className="font-semibold text-gray-800">
                      {formData.compteur_km_sortie?.toLocaleString()} km
                    </Text>
                  </View>
                  <View className="h-[1px] bg-gray-200" />
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">Date / Heure :</Text>
                    <Text className="font-semibold text-gray-800">
                      {formData.date_usage}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Formulaire */}
              <View className="space-y-5">
                <SearchableDropdown
                  label={
                    <>
                      <User size={16} color="#6b7280" /> Matricule Conducteur *
                    </>
                  }
                  items={
                    operateursData?.data.map((op) => ({
                      id: op.id,
                      label: `${op.matricule} - ${op.name}`,
                      value: op.id,
                    })) ?? []
                  }
                  selectedValue={formData.operateur_id}
                  loading={loadingOperateur}
                  error={operateursError ? String(operateursError) : null}
                  onSelect={(item) =>
                    setFormData({ ...formData, operateur_id: item.value })
                  }
                />

                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    <MapPin size={16} color="#6b7280" /> Destination *
                  </Text>
                  <Input
                    placeholder="Destination"
                    value={formData.site_destination || ""}
                    onChangeText={(value) =>
                      handleChange("site_destination", value)
                    }
                    error={errors.site_destination}
                  />
                </View>

                <View>
                  <Text className="text-gray-700 font-medium mb-2 mt-2">
                    <FileText size={16} color="#6b7280" /> Description
                    (optionnel)
                  </Text>
                  <Input
                    placeholder="Description ou remarques..."
                    value={formData.observation_depart ?? ""}
                    onChangeText={(value) =>
                      handleChange("observation_depart", value)
                    }
                    error={errors.observation_depart}
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
