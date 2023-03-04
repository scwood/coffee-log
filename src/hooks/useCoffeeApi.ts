import { useLocalStorage } from "@mantine/hooks";
import { v4 as uuidV4 } from "uuid";

import { Brew } from "../types/Brew";
import { Coffee } from "../types/Coffee";

export function useCoffeeApi() {
  const [coffeesById, setCoffeesById] = useLocalStorage<Record<string, Coffee>>(
    {
      defaultValue: {},
      key: "coffeesById",
      getInitialValueInEffect: false,
    }
  );

  function getCoffees() {
    return Object.values(coffeesById);
  }

  function getCoffeeById(id: string): Coffee | undefined {
    return coffeesById[id];
  }

  function createCoffee(name: string) {
    const id = uuidV4();
    setCoffeesById((prev) => {
      return {
        ...prev,
        [id]: { id, name, brewHistory: [] },
      };
    });
  }

  function updateCoffee(coffee: Coffee) {
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
      return copy;
    });
  }

  function createBrew(
    coffeeId: string,
    brewValues: Omit<Brew, "id" | "timestamp">
  ) {
    const coffee = getCoffeeById(coffeeId);
    if (!coffee) {
      return;
    }
    setCoffeesById((prev) => {
      return {
        ...prev,
        [coffeeId]: {
          ...coffee,
          brewHistory: [
            { id: uuidV4(), timestamp: Date.now(), ...brewValues },
            ...coffee.brewHistory,
          ],
        },
      };
    });
  }

  function updateBrew(coffeeId: string, brew: Brew) {
    const coffee = getCoffeeById(coffeeId);
    if (!coffee) {
      return;
    }
    setCoffeesById((prev) => {
      return {
        ...prev,
        [coffeeId]: {
          ...coffee,
          brewHistory: coffee.brewHistory.map((prevBrew) => {
            return prevBrew.id === brew.id ? brew : prevBrew;
          }),
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
    updateCoffee,
    deleteCoffee,
    createBrew,
    updateBrew,
    deleteBrew,
  };
}
