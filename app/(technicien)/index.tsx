import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Mission {
  id: string;
  equipmentSerial: string;
  equipmentType: string;
  maintenanceType: string;
  scheduledDate: string;
  priority: "critical" | "urgent" | "normal";
  status: "pending" | "in_progress" | "completed";
  description: string;
  estimatedDuration: string;
  technician: string;
  location: string;
}

const allMissions: Mission[] = [
  {
    id: "1",
    equipmentSerial: "EXC-2023-001",
    equipmentType: "Excavatrice CAT 320",
    maintenanceType: "Révision générale",
    scheduledDate: "2024-01-15",
    priority: "critical",
    status: "pending",
    description: "Révision complète du moteur et vérification hydraulique",
    estimatedDuration: "4h",
    technician: "Jean Dupont",
    location: "Chantier A - Zone 1",
  },
  {
    id: "2",
    equipmentSerial: "BLD-2023-007",
    equipmentType: "Bulldozer Komatsu D65",
    maintenanceType: "Maintenance préventive",
    scheduledDate: "2024-01-16",
    priority: "urgent",
    status: "pending",
    description: "Changement huile moteur et filtres",
    estimatedDuration: "2h",
    technician: "Marie Martin",
    location: "Atelier principal",
  },
  {
    id: "3",
    equipmentSerial: "GRU-2023-003",
    equipmentType: "Grue mobile Liebherr",
    maintenanceType: "Inspection sécurité",
    scheduledDate: "2024-01-17",
    priority: "normal",
    status: "in_progress",
    description: "Contrôle des câbles et systèmes de sécurité",
    estimatedDuration: "3h",
    technician: "Pierre Leroy",
    location: "Chantier B - Zone 2",
  },
  {
    id: "4",
    equipmentSerial: "CHG-2023-012",
    equipmentType: "Chargeuse Volvo L120",
    maintenanceType: "Réparation",
    scheduledDate: "2024-01-18",
    priority: "critical",
    status: "pending",
    description: "Remplacement pompe hydraulique défaillante",
    estimatedDuration: "6h",
    technician: "Jean Dupont",
    location: "Atelier principal",
  },
  {
    id: "5",
    equipmentSerial: "TRA-2023-005",
    equipmentType: "Tracteur John Deere",
    maintenanceType: "Maintenance préventive",
    scheduledDate: "2024-01-19",
    priority: "normal",
    status: "completed",
    description: "Vidange complète et vérification générale",
    estimatedDuration: "2h",
    technician: "Marie Martin",
    location: "Chantier C - Zone 1",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-100 border-red-500";
    case "urgent":
      return "bg-orange-100 border-orange-500";
    default:
      return "bg-blue-100 border-blue-500";
  }
};

const getPriorityTextColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "text-red-700";
    case "urgent":
      return "text-orange-700";
    default:
      return "text-blue-700";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "critical":
      return <AlertTriangle size={16} color="#dc2626" />;
    case "urgent":
      return <Clock size={16} color="#ea580c" />;
    default:
      return <Calendar size={16} color="#2563eb" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in_progress":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 size={16} color="#059669" />;
    case "in_progress":
      return <Clock size={16} color="#d97706" />;
    default:
      return <Calendar size={16} color="#6b7280" />;
  }
};

export default function MissionsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "pending" | "in_progress" | "completed"
  >("all");

  const filteredMissions = allMissions.filter((mission) => {
    const matchesSearch =
      mission.equipmentSerial
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      mission.equipmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.maintenanceType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" || mission.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const filterButtons = [
    { key: "all", label: "Toutes", count: allMissions.length },
    {
      key: "pending",
      label: "En attente",
      count: allMissions.filter((m) => m.status === "pending").length,
    },
    {
      key: "in_progress",
      label: "En cours",
      count: allMissions.filter((m) => m.status === "in_progress").length,
    },
    {
      key: "completed",
      label: "Terminées",
      count: allMissions.filter((m) => m.status === "completed").length,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-6 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Missions de maintenance
        </Text>

        {/* Search Bar */}
        <View className="relative">
          <Search
            size={20}
            color="#6b7280"
            className="absolute left-3 top-3 z-10"
          />
          <TextInput
            className="bg-gray-100 rounded-lg py-3 px-10 text-gray-900"
            placeholder="Rechercher par série, type d'engin..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6b7280"
          />
        </View>
      </View>

      {/* Filter Buttons */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {filterButtons.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setSelectedFilter(filter.key as any)}
                className={`px-4 py-2 rounded-full flex-row items-center ${
                  selectedFilter === filter.key ? "bg-blue-600" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-medium ${
                    selectedFilter === filter.key
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {filter.label}
                </Text>
                <View
                  className={`ml-2 px-2 py-1 rounded-full ${
                    selectedFilter === filter.key
                      ? "bg-blue-500"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      selectedFilter === filter.key
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {filter.count}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Mission List */}
      <ScrollView className="flex-1 px-6 py-4">
        {filteredMissions.map((mission) => (
          <TouchableOpacity
            key={mission.id}
            className={`mb-4 bg-white rounded-lg border-l-4 ${getPriorityColor(mission.priority)} shadow-sm`}
            activeOpacity={0.7}
          >
            <View className="p-4">
              {/* Header with Priority and Status */}
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  {getPriorityIcon(mission.priority)}
                  <Text
                    className={`ml-2 text-xs font-semibold uppercase tracking-wide ${getPriorityTextColor(mission.priority)}`}
                  >
                    {mission.priority === "critical"
                      ? "Critique"
                      : mission.priority === "urgent"
                        ? "Urgent"
                        : "Normal"}
                  </Text>
                </View>

                <View
                  className={`px-3 py-1 rounded-full flex-row items-center ${getStatusColor(mission.status)}`}
                >
                  {getStatusIcon(mission.status)}
                  <Text className="ml-1 text-xs font-medium">
                    {mission.status === "pending"
                      ? "En attente"
                      : mission.status === "in_progress"
                        ? "En cours"
                        : "Terminé"}
                  </Text>
                </View>
              </View>

              {/* Equipment Info */}
              <View className="mb-3">
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  {mission.equipmentType}
                </Text>
                <Text className="text-sm text-gray-600">
                  N° Série: {mission.equipmentSerial}
                </Text>
              </View>

              {/* Maintenance Details */}
              <View className="border-t border-gray-100 pt-3">
                <Text className="text-sm font-medium text-gray-900 mb-1">
                  {mission.maintenanceType}
                </Text>
                <Text className="text-sm text-gray-600 mb-3">
                  {mission.description}
                </Text>

                {/* Additional Info Grid */}
                <View className="space-y-2">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <Calendar size={16} color="#6b7280" />
                      <Text className="ml-2 text-sm text-gray-600">
                        {new Date(mission.scheduledDate).toLocaleDateString(
                          "fr-FR"
                        )}
                      </Text>
                    </View>

                    <View className="flex-row items-center flex-1">
                      <Clock size={16} color="#6b7280" />
                      <Text className="ml-2 text-sm text-gray-600">
                        {mission.estimatedDuration}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="text-sm text-gray-500">Technicien: </Text>
                    <Text className="text-sm text-gray-700 font-medium">
                      {mission.technician}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="text-sm text-gray-500">Lieu: </Text>
                    <Text className="text-sm text-gray-700 font-medium">
                      {mission.location}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredMissions.length === 0 && (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-center">
              Aucune mission trouvée pour les critères sélectionnés
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
