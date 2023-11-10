import { useMutation, useQueryClient } from "react-query";

import { useAuth } from "../components/AuthProvider";
import { Coffee } from "../types/Coffee";
import { updateCoffee } from "../utils/firebaseCoffeeApi";
import { getCoffeesQueryKey } from "./useCoffeesQuery";
import { getCoffeeQueryKey } from "./useCoffeeQuery";

export function useUpdateCoffeeMutation() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation({
    mutationFn: async ({ coffee }: { coffee: Coffee }) => {
      if (!userId) {
        return;
      }
      await updateCoffee(coffee);
    },
    onMutate: ({ coffee }) => {
      const existingCoffees =
        queryClient.getQueryData<Coffee[]>(getCoffeesQueryKey(userId)) ?? [];
      const optimisticCoffees = existingCoffees.map((prevCoffee) => {
        return prevCoffee.id === coffee.id ? coffee : prevCoffee;
      });
      queryClient.setQueryData(getCoffeesQueryKey(userId), optimisticCoffees);
      queryClient.setQueryData(getCoffeeQueryKey(coffee.id), coffee);
    },
    onSettled: (data, error, { coffee }) => {
      queryClient.invalidateQueries(getCoffeesQueryKey(userId));
      queryClient.invalidateQueries(getCoffeeQueryKey(coffee.id));
    },
  });
}
