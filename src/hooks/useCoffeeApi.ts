import { useLocalStorage } from "@mantine/hooks";
import { v4 as uuidV4 } from "uuid";

import { Brew } from "../types/Brew";
import { Coffee } from "../types/Coffee";
import { EspressoBrew } from "../types/EspressoBrew";
import { PourOverBrew } from "../types/PourOverBrew";

export function useCoffeeApi() {
  const [coffeesById, setCoffeesById] = useLocalStorage<{
    [coffeeId: string]: Coffee;
  }>({
    defaultValue: {},
    key: "coffeesById",
    getInitialValueInEffect: false,
  });

  const [coffeeOrder, setCoffeeOrder] = useLocalStorage<string[]>({
    defaultValue: Object.keys(coffeesById),
    key: "coffeeOrder",
    getInitialValueInEffect: false,
  });

  function getCoffees() {
    return Object.values(coffeesById).sort((a, b) => {
      return coffeeOrder.indexOf(a.id) - coffeeOrder.indexOf(b.id);
    });
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
    setCoffeeOrder((prev) => [id, ...prev]);
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
    setCoffeeOrder((prev) => prev.filter((id) => id !== coffeeId));
  }

  function createBrew(
    coffeeId: string,
    brewValues:
      | Omit<EspressoBrew, "id" | "timestamp">
      | Omit<PourOverBrew, "id" | "timestamp">
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

  function moveCoffeeUp(coffeeId: string) {
    setCoffeeOrder((prev) => {
      const currentIndex = prev.indexOf(coffeeId);
      if (currentIndex === -1 || currentIndex === 0) {
        return prev;
      }
      return arraySwap(prev, currentIndex, currentIndex - 1);
    });
  }

  function moveCoffeeDown(coffeeId: string) {
    setCoffeeOrder((prev) => {
      const currentIndex = prev.indexOf(coffeeId);
      if (currentIndex === -1 || currentIndex === prev.length - 1) {
        return prev;
      }
      return arraySwap(prev, currentIndex, currentIndex + 1);
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
    moveCoffeeUp,
    moveCoffeeDown,
  };
}

function arraySwap<T>(array: T[], i: number, j: number) {
  const copy = [...array];
  const temp = copy[i];
  copy[i] = copy[j];
  copy[j] = temp;
  return copy;
}
