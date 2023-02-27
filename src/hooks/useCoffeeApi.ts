import { useLocalStorage } from "@mantine/hooks";

import { Brew } from "../types/Brew";
import { Coffee } from "../types/Coffee";

export function useCoffeeApi() {
  const [coffeesById, setCoffeesById] = useLocalStorage<Record<string, Coffee>>(
    {
      defaultValue: {},
      key: "coffeesById",
    }
  );

  function getCoffees() {
    return Object.values(coffeesById);
  }

  function getCoffeeById(id: string): Coffee | undefined {
    return coffeesById[id];
  }

  function createCoffee(coffee: Coffee) {
    setCoffeesById((prev) => {
      return {
        ...prev,
        [coffee.id]: coffee,
      };
    });
  }

  function deleteCoffee(coffeeId: string) {
    setCoffeesById((prev) => {
      const copy = { ...prev };
      delete copy[coffeeId];
      return {
        ...copy,
      };
    });
  }

  function createBrew(coffeeId: string, brew: Brew) {
    const coffee = getCoffeeById(coffeeId);
    if (!coffee) {
      return;
    }
    setCoffeesById((prev) => {
      return {
        ...prev,
        [coffeeId]: {
          ...coffee,
          brewHistory: [brew, ...coffee.brewHistory],
        },
      };
    });
  }

  function deleteBrew(coffeeId: string, brewId: string) {
    const coffee = getCoffeeById(coffeeId);
    if (!coffee) {
      return;
    }
    setCoffeesById((prev) => {
      return {
        ...prev,
        [coffeeId]: {
          ...coffee,
          brewHistory: coffee.brewHistory.filter((brew) => brew.id !== brewId),
        },
      };
    });
  }

  return {
    getCoffees,
    getCoffeeById,
    createCoffee,
    deleteCoffee,
    createBrew,
    deleteBrew,
  };
}
