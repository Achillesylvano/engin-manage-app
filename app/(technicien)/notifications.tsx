import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Notification {
  id: string;
  type: "urgent" | "reminder" | "update" | "completed";
  title: string;
  message: string;
  timestamp: string;
  missionId?: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    title: "Mission critique assignée",
    message:
      "Excavatrice CAT 320 (EXC-2023-001) nécessite une révision générale urgente",
    timestamp: "2024-01-15T08:30:00Z",
    missionId: "1",
    isRead: false,
  },
  {
    id: "2",
    type: "reminder",
    title: "Rappel de maintenance",
    message:
      "Bulldozer Komatsu D65 (BLD-2023-007) - maintenance préventive prévue demain",
    timestamp: "2024-01-15T10:15:00Z",
    missionId: "2",
    isRead: false,
  },
  {
    id: "3",
    type: "update",
    title: "Mise à jour de mission",
    message:
      "Grue mobile Liebherr (GRU-2023-003) - inspection en cours, délai prolongé de 1h",
    timestamp: "2024-01-15T14:20:00Z",
    missionId: "3",
    isRead: true,
  },
  {
    id: "4",
    type: "completed",
    title: "Mission terminée",
    message:
      "Tracteur John Deere (TRA-2023-005) - maintenance préventive achevée avec succès",
    timestamp: "2024-01-15T16:45:00Z",
    missionId: "5",
    isRead: false,
  },
  {
    id: "5",
    type: "urgent",
    title: "Nouvelle mission critique",
    message: "Chargeuse Volvo L120 (CHG-2023-012) - panne hydraulique signalée",
    timestamp: "2024-01-15T17:30:00Z",
    missionId: "4",
    isRead: false,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "urgent":
      return <AlertTriangle size={20} color="#dc2626" />;
    case "reminder":
      return <Clock size={20} color="#ea580c" />;
    case "update":
      return <Bell size={20} color="#2563eb" />;
    case "completed":
      return <CheckCircle2 size={20} color="#059669" />;
    default:
      return <Bell size={20} color="#6b7280" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "urgent":
      return "bg-red-50 border-red-200";
    case "reminder":
      return "bg-orange-50 border-orange-200";
    case "update":
      return "bg-blue-50 border-blue-200";
    case "completed":
      return "bg-green-50 border-green-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

const getNotificationTypeLabel = (type: string) => {
  switch (type) {
    case "urgent":
      return "Urgent";
    case "reminder":
      return "Rappel";
    case "update":
      return "Mise à jour";
    case "completed":
      return "Terminé";
    default:
      return "Information";
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );
    return `il y a ${diffInMinutes} min`;
  } else if (diffInHours < 24) {
    return `il y a ${Math.floor(diffInHours)} h`;
  } else {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") {
      return !notification.isRead;
    }
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-6 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-gray-900">
            Notifications
          </Text>
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={markAllAsRead}
              className="px-3 py-2 bg-blue-50 rounded-lg"
            >
              <Text className="text-blue-600 text-sm font-medium">
                Tout marquer lu
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Buttons */}
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={() => setFilter("all")}
            className={`px-4 py-2 rounded-full flex-row items-center ${
              filter === "all" ? "bg-blue-600" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                filter === "all" ? "text-white" : "text-gray-700"
              }`}
            >
              Toutes
            </Text>
            <View
              className={`ml-2 px-2 py-1 rounded-full ${
                filter === "all" ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  filter === "all" ? "text-white" : "text-gray-600"
                }`}
              >
                {notifications.length}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilter("unread")}
            className={`px-4 py-2 rounded-full flex-row items-center ${
              filter === "unread" ? "bg-blue-600" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                filter === "unread" ? "text-white" : "text-gray-700"
              }`}
            >
              Non lues
            </Text>
            {unreadCount > 0 && (
              <View
                className={`ml-2 px-2 py-1 rounded-full ${
                  filter === "unread" ? "bg-blue-500" : "bg-red-500"
                }`}
              >
                <Text className="text-xs font-bold text-white">
                  {unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1 px-6 py-4">
        {filteredNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            className={`mb-3 rounded-lg border ${getNotificationColor(notification.type)} ${
              !notification.isRead ? "shadow-sm" : ""
            }`}
            activeOpacity={0.7}
            onPress={() => markAsRead(notification.id)}
          >
            <View className="p-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 flex-row items-start">
                  {/* Icon */}
                  <View className="mr-3 mt-1">
                    {getNotificationIcon(notification.type)}
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <Text
                        className={`text-xs font-semibold uppercase tracking-wide ${
                          notification.type === "urgent"
                            ? "text-red-700"
                            : notification.type === "reminder"
                              ? "text-orange-700"
                              : notification.type === "update"
                                ? "text-blue-700"
                                : notification.type === "completed"
                                  ? "text-green-700"
                                  : "text-gray-700"
                        }`}
                      >
                        {getNotificationTypeLabel(notification.type)}
                      </Text>

                      {!notification.isRead && (
                        <View className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></View>
                      )}
                    </View>

                    <Text
                      className={`text-sm font-medium mb-1 ${
                        !notification.isRead ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {notification.title}
                    </Text>

                    <Text className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </Text>

                    <Text className="text-xs text-gray-500">
                      {formatTimestamp(notification.timestamp)}
                    </Text>
                  </View>
                </View>

                {/* Dismiss Button */}
                <TouchableOpacity
                  onPress={() => dismissNotification(notification.id)}
                  className="ml-2 p-1"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={16} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredNotifications.length === 0 && (
          <View className="items-center justify-center py-12">
            <Bell size={48} color="#d1d5db" />
            <Text className="text-gray-500 text-center mt-4 text-lg">
              {filter === "unread"
                ? "Aucune notification non lue"
                : "Aucune notification"}
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              {filter === "unread"
                ? "Vous êtes à jour !"
                : "Les nouvelles notifications apparaîtront ici"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
