import { useQuery, useQueryClient } from "react-query";

import { getCoffees } from "../utils/firebaseCoffeeApi";
import { useAuth } from "../components/AuthProvider";
import { getCoffeeQueryKey } from "./useCoffeeQuery";

export function getCoffeesQueryKey(userId: string | null) {
  return [userId, "coffees"];
}

export function useCoffeesQuery() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: getCoffeesQueryKey(userId),
    queryFn: () => {
      if (!userId) {
        return [];
      }
      return getCoffees(userId);
    },
    onSuccess: (data) => {
      data.forEach((coffee) => {
        queryClient.setQueryData(getCoffeeQueryKey(coffee.id), coffee);
      });
    },
  });
}
