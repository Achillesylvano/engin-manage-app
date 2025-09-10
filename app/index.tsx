import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChartBar as BarChart3, Settings, Truck } from "lucide-react-native";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomePage() {
  return (
    <LinearGradient
      colors={["#ecfdf5", "#d1fae5", "#a7f3d0"]}
      className="flex-1"
    >
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo Section */}
        <View className="items-center mb-12">
          <View className="p-6">
            <Image
              source={require("../assets/images/SMMC_Logo_POSO_GY-300x75.png")}
              className="w-[120px] h-[120px]"
              resizeMode="contain"
            />
          </View>

          {/* Titre principal */}
          <Text className="text-4xl font-bold text-emerald-800 text-center mb-4">
            SMMC Engin
          </Text>

          {/* Sous-titre */}
          <Text className="text-lg text-emerald-700 text-center font-medium">
            Gestion et suivi des engins portuaires
          </Text>
        </View>

        {/* Features Icons */}
        <View className="flex-row justify-around w-full mb-12 px-4">
          <View className="items-center">
            <View className="bg-emerald-500 rounded-full p-4 mb-2 shadow-md">
              <Settings size={32} color="#ffffff" />
            </View>
            <Text className="text-emerald-700 font-medium text-sm">
              Maintenance
            </Text>
          </View>

          <View className="items-center">
            <View className="bg-emerald-500 rounded-full p-4 mb-2 shadow-md">
              <BarChart3 size={32} color="#ffffff" />
            </View>
            <Text className="text-emerald-700 font-medium text-sm">Suivi</Text>
          </View>

          <View className="items-center">
            <View className="bg-emerald-500 rounded-full p-4 mb-2 shadow-md">
              <Truck size={32} color="#ffffff" />
            </View>
            <Text className="text-emerald-700 font-medium text-sm">Engins</Text>
          </View>
        </View>
        <TouchableOpacity
          className="h-14 w-full max-w-sm mx-auto rounded-2xl border-[1.5px] border-emerald-300 justify-center items-center mb-6 bg-emerald-500 shadow-sm active:bg-emerald-500"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white text-lg font-semibold text-center tracking-wide">
            Se connecter
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-8">
          <Text className="text-emerald-600 text-sm text-center">
            Version 1.0.0
          </Text>
        </View>
      </View>

      {/* Decorative Elements */}
      <View className="absolute top-20 left-4 opacity-20">
        <View className="bg-emerald-300 rounded-full w-16 h-16" />
      </View>
      <View className="absolute top-32 right-8 opacity-20">
        <View className="bg-emerald-400 rounded-full w-12 h-12" />
      </View>
      <View className="absolute bottom-32 left-8 opacity-20">
        <View className="bg-emerald-300 rounded-full w-20 h-20" />
      </View>
    </LinearGradient>
  );
}
