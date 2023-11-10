import { useQuery } from "react-query";

import { getCoffeeById } from "../utils/firebaseCoffeeApi";

export function getCoffeeQueryKey(coffeeId: string) {
  return ["coffees", coffeeId];
}

export function useCoffeeQuery(coffeeId: string) {
  return useQuery({
    queryKey: getCoffeeQueryKey(coffeeId),
    queryFn: () => {
      return getCoffeeById(coffeeId);
    },
  });
}
