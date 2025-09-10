import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import axiosInstance from "@/config/axiosConfig";
import { useAuth } from "@/context/AuthContext";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DEVICE_NAME } from "../config/env";

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    matricule: "",
    password: "",
    device_name: DEVICE_NAME,
  });

  const [errors, setErrors] = useState({
    matricule: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrors({ matricule: "", password: "" });

    try {
      const response = await axiosInstance.post("/api/auth/login", data);
      await login(response.data.token, response.data.user);
      router.replace("/(agent)");
    } catch (error) {
      if (isAxiosError(error)) {
        const responseData = error.response?.data;
        if (responseData?.errors) {
          setErrors(responseData.errors);
        } else if (responseData?.message) {
          Alert.alert("Error", responseData.message);
        } else {
          Alert.alert("Error", "An unexpected error occurred");
        }
      } else {
        console.error("Error", error);
        Alert.alert("Error", "Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Logo Section */}
        <View className="p-6 items-center">
          <Image
            source={require("../assets/images/SMMC_Logo_POSO_GY-300x75.png")}
            className="w-[120px] h-[120px]"
            resizeMode="contain"
          />
        </View>

        {/* Login Form */}
        <View className="flex-1 justify-center px-6">
          <View className="bg-white rounded-2xl shadow-lg p-8 mx-4">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
                Log in to your account
              </Text>
              <Text className="text-gray-600 text-center">
                Enter your matricule and password below to log in
              </Text>
            </View>

            {/* Matricule Field */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">
                Matricule
              </Text>
              <Input
                placeholder="Matricule"
                value={data.matricule}
                onChangeText={(value) => handleChange("matricule", value)}
                error={errors.matricule}
              />
            </View>

            {/* Password Field */}
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-700 font-semibold">Password</Text>
                <TouchableOpacity>
                  <Text className="text-primary-600 text-sm">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="relative">
                <Input
                  placeholder="Password"
                  secureTextEntry
                  value={data.password}
                  onChangeText={(value) => handleChange("password", value)}
                  error={errors.password}
                />
              </View>
            </View>

            {/* Remember Me Checkbox */}
            {/* <View className="flex-row items-center mb-8">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                  rememberMe
                    ? "bg-primary-500 border-primary-500"
                    : "border-gray-300"
                }`}
              >
                {rememberMe && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </TouchableOpacity>
              <Text className="text-gray-700">Remember me</Text>
            </View> */}

            {/* Login Button */}
            <Button
              className="w-full bg-primary mb-4"
              onPress={handleLogin}
              disabled={loading}
            >
              <View className="flex-row justify-center items-center">
                {loading && (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    className="mr-3"
                  />
                )}
                <Text className="text-white text-center">Login</Text>
              </View>
            </Button>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
