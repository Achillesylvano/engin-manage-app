import React from "react";
import { Text, View } from "react-native";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "primary" | "success" | "warning" | "info";
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  // Classes de fond et bordure améliorées
  const colorClasses = {
    primary: "bg-green-100 border-green-300",
    success: "bg-green-200 border-green-400",
    warning: "bg-yellow-100 border-yellow-300",
    info: "bg-teal-100 border-teal-300",
  };

  // Classes pour la couleur de l'icône
  const iconColorClasses = {
    primary: "text-green-700",
    success: "text-green-800",
    warning: "text-yellow-700",
    info: "text-teal-700",
  };

  return (
    <View
      className={`p-5 rounded-3xl border ${colorClasses[color]} shadow-lg`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8, // pour Android
      }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className={iconColorClasses[color]}>{icon}</View>
        <Text className="text-3xl font-extrabold text-gray-900">{value}</Text>
      </View>
      <Text className="text-sm text-gray-700 font-medium">{title}</Text>
    </View>
  );
}
