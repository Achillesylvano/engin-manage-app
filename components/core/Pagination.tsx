// src/components/Pagination.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  delta?: number; // nombre de pages autour de la page courante
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
  delta = 2,
}) => {
  // Génère un tableau de numéros avec ellipses
  const getPagination = (): (number | string)[] => {
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    let l: number | null = null; // initialisation correcte

    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 ||
        i === lastPage ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l !== null) {
        const diff = i - l;
        if (diff === 2) {
          rangeWithDots.push(l + 1);
        } else if (diff > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i; // assignment sûr
    }

    return rangeWithDots;
  };

  const pagination = getPagination();

  return (
    <View className="flex-row justify-center items-center mt-4 flex-wrap gap-2">
      {/* Précédent */}
      <TouchableOpacity
        onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200"}`}
      >
        <Text>{"<"}</Text>
      </TouchableOpacity>

      {/* Numéros de page */}
      {pagination.map((num, index) =>
        num === "..." ? (
          <Text key={index} className="px-2">
            ...
          </Text>
        ) : (
          <TouchableOpacity
            key={index}
            onPress={() => onPageChange(num as number)}
            className={`px-3 py-1 rounded ${num === currentPage ? "bg-green-500" : "bg-gray-200"}`}
          >
            <Text
              className={`${num === currentPage ? "text-white" : "text-black"}`}
            >
              {num}
            </Text>
          </TouchableOpacity>
        )
      )}

      {/* Suivant */}
      <TouchableOpacity
        onPress={() => onPageChange(Math.min(currentPage + 1, lastPage))}
        disabled={currentPage === lastPage}
        className={`px-3 py-1 rounded ${currentPage === lastPage ? "bg-gray-300" : "bg-gray-200"}`}
      >
        <Text>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
