import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Item = {
  id: number;
  label: string;
  value?: any;
};

type SearchableDropdownProps = {
  label: string | React.ReactElement;
  placeholder?: string;
  items: Item[];
  selectedValue?: any;
  onSelect: (item: Item) => void;
  loading?: boolean;
  error?: string | null;
};

export default function SearchableDropdown({
  label,
  placeholder = "Rechercher...",
  items,
  selectedValue,
  onSelect,
  loading = false,
  error = null,
}: SearchableDropdownProps) {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (!search) {
      setFilteredItems([]);
      return;
    }

    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [search, items]);

  const handleSelect = (item: Item) => {
    onSelect(item);
    setSearch(item.label); // affiche l’élément sélectionné
    setDropdownVisible(false); // ferme le dropdown
  };

  return (
    <View className="mb-4 relative">
      <Text className="text-gray-700 font-medium mb-2">{label}</Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 shadow-sm"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setDropdownVisible(true); // ouvre le dropdown dès qu’on tape
        }}
        onFocus={() => setDropdownVisible(true)} // ouvre le dropdown au focus
      />

      {isDropdownVisible && (
        <View className="absolute top-16 left-0 right-0 bg-white border border-gray-200 rounded-xl z-10 shadow-lg max-h-52">
          {loading ? (
            <Text className="p-4 text-gray-500">Chargement...</Text>
          ) : error ? (
            <Text className="p-4 text-red-500">Erreur : {error}</Text>
          ) : filteredItems.length === 0 ? (
            <Text className="p-4 text-gray-500">Aucun résultat</Text>
          ) : (
            <ScrollView>
              {filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="px-4 py-3 border-b border-gray-100"
                  onPress={() => handleSelect(item)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}
