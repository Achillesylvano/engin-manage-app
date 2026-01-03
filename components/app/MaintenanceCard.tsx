import { Maintenance } from "@/types";
import { Calendar, User } from "lucide-react-native";
import { JSX } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  maintenance: Maintenance;
  onPress?: () => void;
  getPriorityColor: (type: string) => string;
  getPriorityTextColor: (type: string) => string;
  getPriorityIcon: (type: string) => JSX.Element;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
};

export default function MaintenanceCard({
  maintenance,
  onPress,
  getPriorityColor,
  getPriorityTextColor,
  getPriorityIcon,
  getStatusColor,
  getStatusIcon,
}: Props) {
  return (
    <TouchableOpacity
      className={`mb-4 bg-white rounded-lg border-l-4 ${getPriorityColor(
        maintenance.type
      )} shadow-sm`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            {getPriorityIcon(maintenance.type)}
            <Text
              className={`ml-2 text-xs font-semibold uppercase tracking-wide ${getPriorityTextColor(
                maintenance.type
              )}`}
            >
              {maintenance.type === "corrective" ? "Urgent" : "Normal"}
            </Text>
          </View>

          <View
            className={`px-3 py-1 rounded-full flex-row items-center ${getStatusColor(
              maintenance.statut
            )}`}
          >
            {getStatusIcon(maintenance.statut)}
            <Text className="ml-1 text-xs font-medium">
              {maintenance.statut}
            </Text>
          </View>
        </View>

        {/* Engin */}
        <View className="mb-3">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {maintenance.engin?.designation}
          </Text>
          <Text className="text-sm text-gray-600">
            N° Série: {maintenance.engin?.numero_serie}
          </Text>
        </View>

        {/* Détails */}
        <View className="border-t border-gray-100 pt-3">
          <Text className="text-sm font-medium text-gray-900 mb-1">
            {maintenance.type}
          </Text>
          <Text className="text-sm text-gray-600 mb-3">
            {maintenance.description}
          </Text>

          <View className="space-y-2">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Calendar size={16} color="#6b7280" />
                <Text className="ml-2 text-sm text-gray-600">
                  {maintenance.date_planifiee}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <User size={16} color="#6b7280" />
              <Text className="ml-2 text-sm text-gray-600">
                {maintenance.technicien?.name || "Non assigné"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
