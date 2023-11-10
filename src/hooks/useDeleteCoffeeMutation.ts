import { useMutation, useQueryClient } from "react-query";

import { deleteCoffee } from "../utils/firebaseCoffeeApi";
import { getCoffeesQueryKey } from "./useCoffeesQuery";
import { useAuth } from "../components/AuthProvider";
import { Coffee } from "../types/Coffee";
import { getSettingsQueryKey } from "./useSettingsQuery";

export function useDeleteCoffeeMutation() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  return useMutation({
    mutationFn: async ({ coffeeId }: { coffeeId: string }) => {
      if (!userId) {
        return;
      }
      await deleteCoffee(userId, coffeeId);
    },
    onMutate: ({ coffeeId }) => {
      const existingCoffees =
        queryClient.getQueryData<Coffee[]>(getCoffeesQueryKey(userId)) ?? [];
      const optimisticCoffees = existingCoffees.filter((prevCoffee) => {
        return prevCoffee.id !== coffeeId;
      });
      queryClient.setQueryData(getCoffeesQueryKey(userId), optimisticCoffees);
    },
    onSettled: () => {
      queryClient.invalidateQueries(getCoffeesQueryKey(userId));
      queryClient.invalidateQueries(getSettingsQueryKey(userId));
    },
  });
}
