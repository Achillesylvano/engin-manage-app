import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  error?: string;
}

const Input = ({
  value,
  placeholder,
  keyboardType,
  secureTextEntry,
  onChangeText,
  error = "",
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full mb-4">
      <TextInput
        className={`w-full h-12 border rounded-md px-3 mb-1
    bg-white text-black
    ${isFocused ? "border-green-500" : error ? "border-red-500" : "border-gray-300"}
  `}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {!!error && <Text className="text-left text-red-500 mt-1">{error}</Text>}
    </View>
  );
};

export default Input;
